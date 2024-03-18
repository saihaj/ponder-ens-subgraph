import { ponder } from "@/generated";

ponder.on("BaseRegistrar:ControllerAdded", async ({ event, context }) => {
  console.log(event.args);
});

ponder.on("BaseRegistrar:ControllerRemoved", async ({ event, context }) => {
  console.log(event.args);
});

ponder.on("BaseRegistrar:NameMigrated", async ({ event, context }) => {
  console.log(event.args);
});

ponder.on("BaseRegistrar:NameRegistered", async ({ event, context }) => {
  console.log(event.args);
});
