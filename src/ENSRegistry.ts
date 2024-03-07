import { ponder } from "@/generated";
import { EMPTY_ADDRESS, ROOT_NODE } from "./constants";
import { concat, keccak256 } from "viem";

ponder.on("ENSRegistry:Transfer", async ({ event, context }) => {
  const node = event.args.node;

  const [account, emptyAddress] = await Promise.all([
    context.db.Account.upsert({
      id: event.args.owner,
    }),
    context.db.Account.upsert({
      id: EMPTY_ADDRESS,
    }),
  ]);

  const domain = await context.db.Domain.upsert({
    id: node,
    create: {
      ownerId: ROOT_NODE === node ? emptyAddress.id : account.id,
      isMigrated: true,
      createdAt: event.block.timestamp,
      subdomainCount: 0,
    },
    update: {
      ownerId: account.id,
    },
  });

  const eventId = `${event.log.blockNumber}-${event.log.logIndex}`;

  const domainEvent = await context.db.DomainEvent.create({
    id: eventId,
    data: {
      blockNumber: event.block.number,
      transactionID: event.transaction.hash,
      domainId: domain.id,
    },
  });

  await context.db.Transfer.create({
    id: eventId,
    data: {
      domainEventId: domainEvent.id,
      ownerId: account.id,
    },
  });
});

ponder.on("ENSRegistry:NewOwner", async ({ event, context }) => {
  const [account, emptyAddress] = await Promise.all([
    context.db.Account.upsert({
      id: event.args.owner,
    }),
    context.db.Account.upsert({
      id: EMPTY_ADDRESS,
    }),
  ]);

  const subnode = keccak256(concat([event.args.node, event.args.label]));
  const parentDomain = await context.db.Domain.findUnique({
    id: event.args.node,
  });

  if (!parentDomain) {
    throw new Error(`Domain with id ${event.args.node} not found`);
  }

  const [subDomain] = await Promise.all([
    context.db.Domain.upsert({
      id: subnode,
      create: {
        ownerId: subnode === ROOT_NODE ? emptyAddress.id : account.id,
        isMigrated: true,
        createdAt: event.block.timestamp,
        subdomainCount: 0,
        labelhash: event.args.label,
        parentId: parentDomain.id,
      },
      update: {
        ownerId: account.id,
      },
    }),
    context.db.Domain.update({
      id: parentDomain.id,
      data: {
        subdomainCount: parentDomain.subdomainCount + 1,
      },
    }),
  ]);

  if (subDomain.name == null) {
    const label = event.args.label;
    await context.db.Domain.update({
      id: subDomain.id,
      data: {
        labelName: label,
        name: parentDomain?.name ? `${parentDomain.name}.${label}` : label,
      },
    });
  }

  const eventId = `${event.log.blockNumber}-${event.log.logIndex}`;

  const domainEvent = await context.db.DomainEvent.create({
    id: eventId,
    data: {
      blockNumber: event.block.number,
      transactionID: event.transaction.hash,
      domainId: subDomain.id,
    },
  });

  await context.db.NewOwner.create({
    id: eventId,
    data: {
      domainEventId: domainEvent.id,
      ownerId: account.id,
      parentDomainId: parentDomain.id,
    },
  });
});

ponder.on("ENSRegistry:NewResolver", async ({ event, context }) => {
  console.log(event.args);
});

ponder.on("ENSRegistry:NewTTL", async ({ event, context }) => {
  console.log(event.args);
});
