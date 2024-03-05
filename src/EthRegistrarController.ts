import { ponder } from "@/generated";

ponder.on(
  "EthRegistrarController:NameRegistered",
  async ({ event, context }) => {
    console.log(event.args);
  },
);

ponder.on("EthRegistrarController:NameRenewed", async ({ event, context }) => {
  console.log(event.args);
});

ponder.on(
  "EthRegistrarController:OwnershipTransferred",
  async ({ event, context }) => {
    console.log(event.args);
  },
);
