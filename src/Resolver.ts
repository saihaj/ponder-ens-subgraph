import { ponder } from "@/generated";

ponder.on("Resolver:AuthorisationChanged", async ({ event, context }) => {
  console.log(event.args);
});

ponder.on("Resolver:TextChanged", async ({ event, context }) => {
  console.log(event.args);
});

ponder.on("Resolver:TextChanged", async ({ event, context }) => {
  console.log(event.args);
});

ponder.on("Resolver:PubkeyChanged", async ({ event, context }) => {
  console.log(event.args);
});
