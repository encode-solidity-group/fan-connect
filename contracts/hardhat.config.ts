import { HardhatUserConfig } from "hardhat/config";
require('dotenv').config();
import "@nomicfoundation/hardhat-toolbox";

const PRIVATE_KEY = process.env.PRIVATE_KEY || "";
const ALCHEMY_API_KEY = process.env.SEPOLIA_API_KEY || "";
const INFURA_API_KEY = process.env.INFURA_API_KEY || "";

const config: HardhatUserConfig = {
  solidity: "0.8.18",
  networks: {
    testnet_aurora: {
      url: `https://aurora-testnet.infura.io/v3/${INFURA_API_KEY}`,
      chainId: 1313161555,
      accounts: [PRIVATE_KEY],
    },
    sepolia: {
      url: `https://eth-sepolia.g.alchemy.com/v2/${ALCHEMY_API_KEY}`,
      accounts: [PRIVATE_KEY],
    }
  }
};

export default config;
