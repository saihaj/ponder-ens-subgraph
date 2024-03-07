import { ponder } from "@/generated";

ponder.on("Resolver:AddrChanged", async ({ event, context }) => {});

ponder.on(
  "Resolver:TextChanged(bytes32 indexed node, string indexed indexedKey, string key, string value)",
  async ({ event, context }) => {
    console.log(event.args);
  }
);

ponder.on(
  "Resolver:TextChanged(bytes32 indexed node, string indexed indexedKey, string key)",
  async ({ event, context }) => {
    console.log(event.args);
  }
);

ponder.on("Resolver:PubkeyChanged", async ({ event, context }) => {
  console.log(event.args);
});
