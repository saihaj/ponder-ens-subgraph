import { ponder } from "@/generated";

ponder.on("Resolver:AddrChanged", async ({ event, context }) => {
  const account = await context.db.Account.upsert({
    id: event.args.a.toLowerCase(),
  });

  const domain = await context.db.Domain.upsert({
    id: event.args.node.toLowerCase(),
    create: {
      ownerId: account.id,
      subdomainCount: 0,
    },
  });

  const resolver = await context.db.Resolver.upsert({
    id: event.args.node.toLowerCase(),
    create: {},
  });
});

ponder.on(
  "Resolver:TextChanged(bytes32 indexed node, string indexed indexedKey, string key, string value)",
  async ({ event, context }) => {
    console.log(event.args);
  },
);

ponder.on(
  "Resolver:TextChanged(bytes32 indexed node, string indexed indexedKey, string key)",
  async ({ event, context }) => {
    console.log(event.args);
  },
);

ponder.on("Resolver:PubkeyChanged", async ({ event, context }) => {
  console.log(event.args);
});
