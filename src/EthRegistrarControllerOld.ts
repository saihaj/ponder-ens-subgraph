import { ponder } from "@/generated";

ponder.on(
  "EthRegistrarControllerOld:NameRegistered",
  async ({ event, context }) => {
    console.log(event.args);
  },
);

ponder.on(
  "EthRegistrarControllerOld:NameRenewed",
  async ({ event, context }) => {
    console.log(event.args);
  },
);

ponder.on(
  "EthRegistrarControllerOld:NewPriceOracle",
  async ({ event, context }) => {
    console.log(event.args);
  },
);

ponder.on(
  "EthRegistrarControllerOld:OwnershipTransferred",
  async ({ event, context }) => {
    console.log(event.args);
  },
);
