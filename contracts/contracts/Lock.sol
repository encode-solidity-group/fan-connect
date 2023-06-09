// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;
// Uncomment this line to use console.log
// import "hardhat/console.sol";

contract SubscriptionService {

    struct Subscription {
        uint256 start;
        uint256 end;
        //address subscriberAddress;
    }

    struct Creator {
        // price per 30 days
        uint256 price;
        mapping(address => Subscription) subscriptions;
    }

    mapping(address => Creator) public creators;

    event PageCreated(address indexed creatorAddress, uint256 price);
    event SubscriptionPaid(address indexed creatorAddress, address indexed subscriberAddress, uint256 start, uint256 end);
    event UserIsSubscribed(address creator, address sub);
    event UserNotSubscribed(address creator, address sub);

    function createPage(uint256 _price) public{
        creators[msg.sender].price = _price;
        emit PageCreated(msg.sender, _price);
    }

    function payForSubscription(address creator_address) public payable{
        require(creators[creator_address].price > 0, "Creator not found");
        require(msg.value >= creators[creator_address].price, "Insufficient payment");

        //TODO get start time based off of payment
        uint256 start_time = block.timestamp;
        //TODO calculate end time based off of payment
        uint256 end_time = start_time + 30 days;


        //create new subscription object
        Subscription memory newSub = Subscription(start_time,end_time);
        //append subscription to creator array
        creators[creator_address].subscriptions[msg.sender] = newSub;

        emit SubscriptionPaid(creator_address, msg.sender, start_time, end_time);

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
}