import { createConfig } from "@ponder/core";
import { http } from "viem";
import { EnsRegistryAbi } from "./abis/EnsRegistryAbi";
import { ResolverAbi } from "./abis/ResolverAbi";
import { BaseRegistrarAbi } from "./abis/BaseRegistrarAbi";
import { EthRegistrarControllerOldAbi } from "./abis/EthRegistrarControllerOldAbi";
import { EthRegistrarControllerAbi } from "./abis/EthRegistrarControllerAbi";
import { NameWrapperAbi } from "./abis/NameWrapperAbi";

export default createConfig({
  networks: {
    mainnet: {
      chainId: 1,
      transport: http(process.env.PONDER_RPC_URL_1),
      maxRequestsPerSecond: 100,
    },
  },
  contracts: {
    ENSRegistry: {
      network: "mainnet",
      address: "0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e",
      abi: EnsRegistryAbi,
      startBlock: 9380380,
    },
    ENSRegistryOld: {
      network: "mainnet",
      address: "0x314159265dd8dbb310642f98f50c066173c1259b",
      abi: EnsRegistryAbi,
      startBlock: 3327417,
    },
    Resolver: {
      network: "mainnet",
      abi: ResolverAbi,
      startBlock: 3327417,
      filter: {
        event: [
          "ABIChanged",
          "AddrChanged",
          "AddressChanged",
          "AuthorisationChanged",
          "ContenthashChanged",
          "InterfaceChanged",
          "NameChanged",
          "PubkeyChanged",
          "TextChanged(bytes32 indexed node, string indexed indexedKey, string key)",
          "TextChanged(bytes32 indexed node, string indexed indexedKey, string key, string value)",
          "VersionChanged",
        ],
      },
    },
    // BaseRegistrar: {
    //   network: "mainnet",
    //   address: "0x57f1887a8BF19b14fC0dF6Fd9B2acc9Af147eA85",
    //   abi: BaseRegistrarAbi,
    //   startBlock: 9380410,
    // },
    // EthRegistrarControllerOld: {
    //   network: "mainnet",
    //   address: "0x283Af0B28c62C092C9727F1Ee09c02CA627EB7F5",
    //   abi: EthRegistrarControllerOldAbi,
    //   startBlock: 9380471,
    // },
    // EthRegistrarController: {
    //   network: "mainnet",
    //   address: "0x253553366Da8546fC250F225fe3d25d0C782303b",
    //   abi: EthRegistrarControllerAbi,
    //   startBlock: 16925618,
    // },
    // NameWrapper: {
    //   network: "mainnet",
    //   address: "0xD4416b13d2b3a9aBae7AcD5D6C2BbDBE25686401",
    //   abi: NameWrapperAbi,
    //   startBlock: 16925608,
    // },
  },
});
