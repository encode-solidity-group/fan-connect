import { expect } from "chai";
import { ethers, network } from "hardhat";
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
    expect(await contract.contractFeePercentage()).to.equal(contractFee);
  })
  
  it("should allow a creator to create a page with prices", async () => {
    const creator = await contract.creators(accounts[2].address);
    expect(creator.price30Days).to.equal(price30Days);
    expect(creator.price90Days).to.equal(price90Days);
    expect(creator.price180Days).to.equal(price180Days);
    expect(creator.price365Days).to.equal(price365Days);
  });

  it("should revert if the creator tries to create another page with the same address", async () => {
    try {
      await contract.connect(accounts[2]).createPage(price30Days, price90Days, price180Days, price365Days);
      // If the createPage function doesn't revert, fail the test
      expect.fail("Expected revert");
    } catch (error: any) {
      // Check if the error message matches the expected revert reason
      expect(error.message).to.include("Creator has an existing page");
    }
  });

  it("should revert if the creator tries to subscriber to their own page", async () => {
    try {
      await contract.connect(accounts[2]).payForSubscription(accounts[2].address, 30)
      // If the createPage function doesn't revert, fail the test
      expect.fail("Expected revert");
    } catch (error: any) {
      // Check if the error message matches the expected revert reason
      expect(error.message).to.include("You can not subscribe to your own page");
    }
  });
  
  it("should allow the owner to change the contract fee", async () => {
    const contractFeeBefore = await contract.contractFeePercentage();
    await contract.connect(accounts[0]).changeContractFee(10);
    const contractFeeAfter = await contract.contractFeePercentage();
    expect(contractFeeBefore).to.equal(5);
    expect(contractFeeAfter).to.equal(10);
  });
  
  it("should allow the creator to change their fees", async () => {
    const newPrice30Days = ethers.parseEther("0.2");
    const newPrice365Days = ethers.parseEther("1");

    await contract.connect(accounts[2]).changeManySubscriptionFee([30, 365], [newPrice30Days, newPrice365Days]);
    
    const creator = await contract.creators(accounts[2].address);

    expect(creator.price30Days).to.equal(newPrice30Days);
    expect(creator.price365Days).to.equal(newPrice365Days);
  });

  it("should allow a user to subscribe to a creator with the correct start and end times", async () => {
    const creator = accounts[2].address;
    const user = accounts[1].address;
    const subscriptionDuration = 90;
    const price = ethers.parseEther("0.3");

    await contract.connect(accounts[1]).payForSubscription(creator, subscriptionDuration, { value: price });
    
    const subscribed = await contract.isSubscribed(creator, user);
    const startTime = await contract.subscriptionStart(creator, user);
    const endTime = await contract.subscriptionEnd(creator, user);
    
    expect(subscribed).true;
    expect(startTime).to.be.closeTo(Math.floor(Date.now() / 1000), 60); // Allow 1 minute difference
    expect(endTime).to.be.closeTo(startTime + BigInt(subscriptionDuration * 24 * 60 * 60), 60); // Allow 1 minute difference
  });

  it("should return false if a user is not subscribed", async () => {
    const creator = accounts[2].address;
    const user = accounts[1].address;

    const subscribed = await contract.isSubscribed(creator, user);

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

  it("should add to the end time if a user is subscribing again to the same creator", async () => {
    const creator = accounts[2].address;
    const user = accounts[1].address;
    const subscriptionDuration = 90;
    const price = ethers.parseEther("0.3");
    
    const subscriptionDuration2 = 30;
    const price2 = ethers.parseEther("0.1");

    await contract.connect(accounts[1]).payForSubscription(creator, subscriptionDuration, { value: price });
    const firstStartTime = await contract.subscriptionStart(creator, user);
    const firstEndtime = await contract.subscriptionEnd(creator, user);

    await contract.connect(accounts[1]).payForSubscription(creator, subscriptionDuration2, { value: price2 });
    const secondStartTime = await contract.subscriptionStart(creator, user);
    const secondEndTime = await contract.subscriptionEnd(creator, user);
    
    expect(secondStartTime).to.equal(firstEndtime);
    expect(secondEndTime).to.be.closeTo(firstStartTime + BigInt((subscriptionDuration + subscriptionDuration2) * (24 * 60 * 60)), 60); // Allow 1 minute difference
  });

  it("should show a list of all the creators subscribers without duplicates", async () => {
    const user1 = accounts[1];
    const user2 = accounts[3];
    const creator = accounts[2].address;
    const subscriptionDuration = 30;
    const price = ethers.parseEther("0.1");

    await contract.connect(user1).payForSubscription(creator, subscriptionDuration, { value: price });
    await contract.connect(user1).payForSubscription(creator, subscriptionDuration, { value: price });
    await contract.connect(user2).payForSubscription(creator, subscriptionDuration, { value: price });
    await contract.connect(user2).payForSubscription(creator, subscriptionDuration, { value: price });

    const creatorSubscribers = await contract.getCreatorSubscribers(creator);

    expect(creatorSubscribers.length).to.equal(2);
    expect(creatorSubscribers).to.deep.equal([user1.address, user2.address]);
  });

  it("should show a list of all the users subscriptions without duplicates", async () => {
    const creator1 = accounts[2].address;
    const creator2 = accounts[3].address;
    const user = accounts[1];
    const subscriptionDuration = 30;
    const price = ethers.parseEther("0.1");

    await contract.connect(accounts[3]).createPage(price30Days, price90Days, price180Days, price365Days);
    await contract.connect(user).payForSubscription(creator1, subscriptionDuration, { value: price });
    await contract.connect(user).payForSubscription(creator2, subscriptionDuration, { value: price });
    await contract.connect(user).payForSubscription(creator1, subscriptionDuration, { value: price });
    await contract.connect(user).payForSubscription(creator2, subscriptionDuration, { value: price });

    const userSubscriptions = await contract.getUserSubscriptions(user.address);

    expect(userSubscriptions.length).to.equal(2);
    expect(userSubscriptions).to.deep.equal([creator1, creator2]);
  });

  it("should show a list of a creators active and non active subscribers", async () => {
    const creator = accounts[2].address;

    const user0 = accounts[0];
    const user1 = accounts[1];
    const subscriptionDuration1 = 30;
    const price1 = ethers.parseEther("0.1");

    const user2 = accounts[3];
    const subscriptionDuration2 = 90;
    const price2 = ethers.parseEther("0.3");

    await contract.connect(user0).payForSubscription(creator, subscriptionDuration1, { value: price1 });
    await contract.connect(user1).payForSubscription(creator, subscriptionDuration1, { value: price1 });
    await contract.connect(user2).payForSubscription(creator, subscriptionDuration2, { value: price2 });

    // Increase the timestamp by 31 days
    await network.provider.send("evm_increaseTime", [31 * 86400]);

    // Mine a new block to update the timestamp
    await network.provider.send("evm_mine");

    const activeSubscribers = await contract.getActiveSubscribers(creator);
    const allSubscribers = await contract.getCreatorSubscribers(creator);
    const nonActiveSubscribers = allSubscribers.length - activeSubscribers.length;

    expect(activeSubscribers.length).to.equal(1);
    expect(activeSubscribers).to.deep.equal([user2.address]);
    expect(nonActiveSubscribers).to.equal(2);
  });

});