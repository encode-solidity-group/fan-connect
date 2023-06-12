// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.18;

import "@openzeppelin/contracts/access/Ownable.sol";

contract SubscriptionService is Ownable {

    uint8 public feePercentage;

    constructor (uint8 _feePercentage) {
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
        mapping(address => Subscription) subscribers;
        address[] subscriberList;
    }

    struct User {
        address[] subscriptions;
    }

    mapping(address => Creator) public creators;
    mapping(address => bool) public creatorPageExists;
    mapping(address => User) internal users;

    event PageCreated(address indexed creatorAddress, uint256 price30Days, uint256 price90Days, uint256 price180Days, uint256 price365Days);
    event SubscriptionPaid(address indexed creatorAddress, address indexed userAddress, uint256 start, uint256 end);
    event UserIsSubscribed(address creator, address sub);
    event UserNotSubscribed(address creator, address sub);

    function changeContractFee(uint8 newFee) public onlyOwner {
        feePercentage = newFee;
    }

    function createPage(uint256 _price30Days, uint256 _price90Days, uint256 _price180Days, uint256 _price365Days) public {
        require(!creatorPageExists[msg.sender], "Creator has an existing page");
        creators[msg.sender].price30Days = _price30Days;
        creators[msg.sender].price90Days = _price90Days;
        creators[msg.sender].price180Days = _price180Days;
        creators[msg.sender].price365Days = _price365Days;
        creatorPageExists[msg.sender] = true;
        emit PageCreated(msg.sender, _price30Days, _price90Days, _price180Days, _price365Days);
    }

    function changeSubscriptionFee(uint256 interval, uint256 newFee) internal {
        require(interval == 30 || interval == 90 || interval == 180 || interval == 365, "Invalid interval");
        Creator storage creator = creators[msg.sender];

        if (interval == 30) {
            creator.price30Days = newFee;
            return;
        }
        if (interval == 90) {
            creator.price90Days = newFee;
            return;
        }
        if (interval == 180) {
            creator.price180Days = newFee;
            return;
        }
        if (interval == 365) {
            creator.price365Days = newFee;
            return;
        }
    }

    function changeManySubscriptionFee(uint256[] calldata intervals, uint256[] calldata newFees) public {
        require(intervals.length == newFees.length, "Arrays length mismatch");
        require(creatorPageExists[msg.sender], "You have not created a page");

        for (uint256 i = 0; i < intervals.length; i++) {
            changeSubscriptionFee(intervals[i], newFees[i]);
        }
    }

    function payForSubscription(address payable creatorAddress, uint256 daysSubscribing) public payable {
        Creator storage creator = creators[creatorAddress];
        require(creator.price30Days > 0, "Creator not found");
        require(msg.value >= calculatePrice(creatorAddress, daysSubscribing), "Insufficient payment");
        require(isValidSubscriptionPeriod(daysSubscribing), "Invalid subscription period");

        uint256 start_time = block.timestamp;
        // handle subscribing when having an active subscription
        if (subscriptionEnd(creatorAddress, msg.sender) > start_time) {
            start_time = subscriptionEnd(creatorAddress, msg.sender);
        }
        uint256 end_time = start_time + (daysSubscribing * 1 days);

        Subscription memory newSub = Subscription(start_time, end_time);
        creators[creatorAddress].subscribers[msg.sender] = newSub;

        // push user into creators subscribers list if not already present
        // push creator into users subscriptions if not already present
        if (newSubscriber(creatorAddress, msg.sender)) {
            creator.subscriberList.push(msg.sender);
            users[msg.sender].subscriptions.push(creatorAddress);
        }

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

    function isSubscribed(address creatorAddress, address userAddress) public view returns (bool) {
       return subscriptionEnd(creatorAddress, userAddress) >= block.timestamp;
    }

    function newSubscriber(address creatorAddress, address userAddress) public view returns (bool) {
        address[] memory userSubscriptions = getUserSubscriptions(userAddress);

        for (uint256 i = 0; i < userSubscriptions.length; i++) {
            if (userSubscriptions[i] == creatorAddress) {
                return false;
            }
        }
        return true;
    }

    function subscriptionStart(address creatorAddress, address userAddress) public view returns (uint256) {
        return creators[creatorAddress].subscribers[userAddress].start;
    }

    function subscriptionEnd(address creatorAddress, address userAddress) public view returns (uint256) {
        return creators[creatorAddress].subscribers[userAddress].end;
    }

    function getCreatorSubscribers(address creatorAddress) public view returns (address[] memory) {
        return creators[creatorAddress].subscriberList;
    }

    function getUserSubscriptions(address userAddress) public view returns (address[] memory) {
        return users[userAddress].subscriptions;
    }

    function getActiveSubscribers(address creatorAddress) public view returns (address[] memory) {
        Creator storage creator = creators[creatorAddress];
        address[] memory subscribers = getCreatorSubscribers(creatorAddress);
        address[] memory activeSubscribers = new address[](subscribers.length);
        uint256 activeCount = 0;

        for (uint256 i = 0; i < subscribers.length; i++) {
            if (creator.subscribers[subscribers[i]].end >= block.timestamp) {
                activeSubscribers[activeCount] = subscribers[i];
                activeCount++;
            }
        }

        // Resize the activeSubscribers array to remove the empty elements
        assembly {
            mstore(activeSubscribers, activeCount)
        }

        return activeSubscribers;
    }


}