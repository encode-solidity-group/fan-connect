import { expect } from "chai";
import { ethers } from "hardhat";
import { SubscriptionService } from "../typechain-types";
import { SignerWithAddress } from "@nomicfoundation/hardhat-ethers/signers";

describe("SubscriptionService", function () {
  let contract: SubscriptionService;
  let accounts: SignerWithAddress[];
  const contractFee = 5
  const price30Days = ethers.parseEther("0.1");
  const price90Days = ethers.parseEther("0.3");
  const price180Days = ethers.parseEther("0.5");
  const price365Days = ethers.parseEther("0.8");

  beforeEach(async () => {
    accounts = await ethers.getSigners();
    const contractFactory = await ethers.getContractFactory("SubscriptionService", accounts[0]);
    contract = await contractFactory.deploy(contractFee);
    
    await contract.connect(accounts[2]).createPage(price30Days, price90Days, price180Days, price365Days);
  });

  it("should set the correct fee", async () => {
    expect(await contract.feePercentage()).to.equal(contractFee);
  })
  
  it("should allow a creator to create a page with prices", async () => {
    const creator = await contract.creators(accounts[2].address);
    expect(creator.price30Days).to.equal(price30Days);
    expect(creator.price90Days).to.equal(price90Days);
    expect(creator.price180Days).to.equal(price180Days);
    expect(creator.price365Days).to.equal(price365Days);
  });

  it("should allow a user to subscribe to a creator with the correct start and end times", async () => {
    const creator = accounts[2].address;
    const user = accounts[1].address;
    const subscriptionDuration = 90;
    const price = ethers.parseEther("0.3");

    await contract.connect(accounts[1]).payForSubscription(creator, subscriptionDuration, { value: price });
    
    const subscribed = await contract._isSubscribed(creator, user);
    const startTime = await contract.subscriptionStart(creator, user);
    const endTime = await contract.subscriptionEnd(creator, user);
    
    expect(subscribed).true;
    expect(startTime).to.be.closeTo(Math.floor(Date.now() / 1000), 60); // Allow 1 minute difference
    expect(endTime).to.be.closeTo(startTime + BigInt(subscriptionDuration * 24 * 60 * 60), 60); // Allow 1 minute difference
  });

  it("should return false if a user is not subscribed", async () => {
    const creator = accounts[2].address;
    const user = accounts[1].address;

    const subscribed = await contract._isSubscribed(creator, user);

    expect(subscribed).false;
  });

  it("should pay the owner the correct fee from the subscription", async () => {
    const owner = await contract.owner();
    const creator = accounts[2].address;
    const subscriptionDuration = 30;
    const price = ethers.parseEther("0.1");

    const ownerBalanceBefore = await ethers.provider.getBalance(owner);
    await contract.connect(accounts[1]).payForSubscription(creator, subscriptionDuration, { value: price });
    const ownerBalanceAfter = await ethers.provider.getBalance(owner);

    const feeAmount = Number(price) * (contractFee / 100);

    expect(ethers.formatEther(ownerBalanceAfter - ownerBalanceBefore)).to.equal(ethers.formatEther(feeAmount))
  });

  it("should pay the creator the correct fee from the subscription", async () => {
    const creator = accounts[2].address;
    const subscriptionDuration = 30;
    const price = ethers.parseEther("0.1");

    const creatorBalanceBefore = await ethers.provider.getBalance(creator);
    await contract.connect(accounts[1]).payForSubscription(creator, subscriptionDuration, { value: price });
    const creatorBalanceAfter = await ethers.provider.getBalance(creator);

    const creatorFee = Number(ethers.formatEther(price)) * (1 - (contractFee / 100));

    expect(Number(ethers.formatEther(creatorBalanceAfter - creatorBalanceBefore))).to.equal(creatorFee);
  });

});
