// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.18;

import "@openzeppelin/contracts/access/Ownable.sol";

contract SubscriptionService is Ownable {

    uint256 public feePercentage;

    constructor (uint256 _feePercentage) {
        feePercentage = _feePercentage;
    }

    struct Subscription {
        uint256 start;
        uint256 end;
    }

    struct Creator {
        uint256 price30Days;
        uint256 price90Days;
        uint256 price180Days;
        uint256 price365Days;
        mapping(address => Subscription) subscriptions;
    }

    mapping(address => Creator) public creators;

    event PageCreated(address indexed creatorAddress, uint256 price30Days, uint256 price90Days, uint256 price180Days, uint256 price365Days);
    event SubscriptionPaid(address indexed creatorAddress, address indexed subscriberAddress, uint256 start, uint256 end);
    event UserIsSubscribed(address creator, address sub);
    event UserNotSubscribed(address creator, address sub);

    function createPage(uint256 _price30Days, uint256 _price90Days, uint256 _price180Days, uint256 _price365Days) public{
        creators[msg.sender].price30Days = _price30Days;
        creators[msg.sender].price90Days = _price90Days;
        creators[msg.sender].price180Days = _price180Days;
        creators[msg.sender].price365Days = _price365Days;
        emit PageCreated(msg.sender, _price30Days, _price90Days, _price180Days, _price365Days);
    }

    function payForSubscription(address payable creatorAddress, uint256 daysSubscribing) public payable {
        require(creators[creatorAddress].price30Days > 0, "Creator not found");
        require(msg.value >= calculatePrice(creatorAddress, daysSubscribing), "Insufficient payment");
        require(isValidSubscriptionPeriod(daysSubscribing), "Invalid subscription period");

        uint256 start_time = block.timestamp;
        // handle subscribing when having an active subscription
        if (subscriptionEnd(creatorAddress, msg.sender) > start_time) {
            start_time = subscriptionEnd(creatorAddress, msg.sender);
        }
        uint256 end_time = start_time + (daysSubscribing * 1 days);

        Subscription memory newSub = Subscription(start_time, end_time);
        creators[creatorAddress].subscriptions[msg.sender] = newSub;

        // Calculate the tax amount
        uint256 taxAmount = (msg.value * feePercentage) / 100;
        // Calculate the payment amount for the creator after deducting the tax
        uint256 creatorPayment = msg.value - taxAmount;

         // Transfer the tax amount to the owner address
        (bool success, ) = payable(owner()).call{value: taxAmount}("");
        require(success, "Tax payment transfer failed");
        
        // Transfer the payment to the creator address
        (bool success2, ) = payable(creatorAddress).call{value: creatorPayment}("");
        require(success2, "Creator payment transfer failed");

        emit SubscriptionPaid(creatorAddress, msg.sender, start_time, end_time);
        emit UserIsSubscribed(creatorAddress, msg.sender);
    }
    
    function isValidSubscriptionPeriod(uint256 daysSubscribing) internal pure returns (bool) {
        return (daysSubscribing == 30 || daysSubscribing == 90 || daysSubscribing == 180 || daysSubscribing == 365);
    }

    // check which subscription price to charge
    function calculatePrice(address creatorAddress, uint256 daysSubscribing) public view returns (uint256 price) {
        require(isValidSubscriptionPeriod(daysSubscribing), "Invalid subscription period");
        if (daysSubscribing == 30) {
            return creators[creatorAddress].price30Days;
        } else if (daysSubscribing == 90) {
            return creators[creatorAddress].price90Days;
        } else if (daysSubscribing == 180) {
            return creators[creatorAddress].price180Days;
        } else if (daysSubscribing == 365) {
            return creators[creatorAddress].price365Days;
        }
    }

    // input creator_address
    function isSubscribed(address creator_address) public view returns (bool){
        return _isSubscribed(creator_address,msg.sender);
    }

   //TODO SEE IF EVENT NEEDED
    function _isSubscribed(address creator_address,address sub_address) public view returns (bool){
        if(creators[creator_address].subscriptions[sub_address].end >= block.timestamp){
            return true;
        } else{
            return false;
        }
    }

    function subscriptionStart(address creatorAddress, address userAddress) public view returns (uint256) {
        return creators[creatorAddress].subscriptions[userAddress].start;
    }

    function subscriptionEnd(address creatorAddress, address userAddress) public view returns (uint256) {
        return creators[creatorAddress].subscriptions[userAddress].end;
    }
}