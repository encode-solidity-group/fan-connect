import { ethers } from "hardhat";

async function main() {
  const contractFee = 5;

  const [deployer] = await ethers.getSigners();
  console.log("Deploying contracts with the account:", deployer.address);

  const contract = await ethers.deployContract("SubscriptionService", [contractFee]);

  await contract.waitForDeployment();
  
  console.log(`deployed to: ${await contract.getAddress()}`);
  console.log(`contract owner is: ${await contract.owner()}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
