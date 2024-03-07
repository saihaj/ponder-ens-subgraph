import { ponder } from "@/generated";
import { EMPTY_ADDRESS, ROOT_NODE } from "./constants";

ponder.on("ENSRegistryOld:Transfer", async ({ event, context }) => {
  const node = event.args.node;

  const [account, emptyAddress] = await Promise.all([
    context.db.Account.upsert({
      id: event.args.owner,
    }),
    context.db.Account.upsert({
      id: EMPTY_ADDRESS,
    }),
  ]);

  const domain = await context.db.Domain.findUnique({
    id: node,
  });

  // If the domain is not migrated, then we create the transfer event
  if (domain?.isMigrated == false) {
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
  }
});

ponder.on("ENSRegistryOld:NewOwner", async ({ event, context }) => {
  console.log(event.args);
});

ponder.on("ENSRegistryOld:NewResolver", async ({ event, context }) => {
  console.log(event.args);
});

ponder.on("ENSRegistryOld:NewTTL", async ({ event, context }) => {
  console.log(event.args);
});
