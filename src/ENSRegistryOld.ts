import { ponder } from "@/generated";

ponder.on("ENSRegistryOld:Transfer", async ({ event, context }) => {
  console.log(event.args);
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
