import { ponder } from "@/generated";

ponder.on("ENSRegistry:Transfer", async ({ event, context }) => {
  console.log(event.args);
});

ponder.on("ENSRegistry:NewOwner", async ({ event, context }) => {
  console.log(event.args);
});

ponder.on("ENSRegistry:NewResolver", async ({ event, context }) => {
  console.log(event.args);
});

ponder.on("ENSRegistry:NewTTL", async ({ event, context }) => {
  console.log(event.args);
});
