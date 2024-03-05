import { ponder } from "@/generated";

ponder.on("NameWrapper:ApprovalForAll", async ({ event, context }) => {
  console.log(event.args);
});

ponder.on("NameWrapper:ControllerChanged", async ({ event, context }) => {
  console.log(event.args);
});

ponder.on("NameWrapper:ExpiryExtended", async ({ event, context }) => {
  console.log(event.args);
});

ponder.on("NameWrapper:FusesSet", async ({ event, context }) => {
  console.log(event.args);
});
