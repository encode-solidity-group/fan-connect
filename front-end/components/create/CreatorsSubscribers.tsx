import { useContractRead } from "wagmi";
import contractJson from '../../SubscriptionJson/SubscriptionService.json';
import { Key, useContext, useEffect, useState } from "react";
import { BsArrowDownCircle, BsArrowUpCircle } from "react-icons/bs";
import useGetContractAddress from "../../custom hooks/useGetContractAddress";
import { UserAddressContext } from "../../providers/UserAddressProvider";
import Subscription from "../subscriptions/Subscription";

export default function CreatorSubscribers() {
  const { userAddress } = useContext(UserAddressContext);
  const { contractAddress } = useGetContractAddress();

  const [foundSubscribers, setFoundSubscribers] = useState<string[]>([]);
  const [foundActiveSubscribers, setFoundActiveSubscribers] = useState<string[]>([]);
  const [showFoundActiveSubscribers, setShowFoundActiveSubscribers] = useState<Boolean>(false);
  const [showFoundSubscribers, setShowFoundSubscribers] = useState<Boolean>(false);

  const { data: subscribers } = useContractRead({
    address: contractAddress,
    abi: contractJson.abi,
    functionName: 'getCreatorSubscribers',
    args: [userAddress],
    watch: true,
  })

  const { data: activeSubs } = useContractRead({
    address: contractAddress,
    abi: contractJson.abi,
    functionName: 'getActiveSubscribers',
    args: [userAddress],
    watch: true,
  })

  useEffect(() => {
    if (subscribers) {
      setFoundSubscribers(subscribers as string[]);
    }
  }, [subscribers])

  useEffect(() => {
    if (activeSubs) {
      setFoundActiveSubscribers(activeSubs as string[]);
    }
  }, [activeSubs])

  const subscriptionList = foundSubscribers.map((subscriber, index: Key) => {
    return (
      <Subscription address={subscriber} key={index} creator={userAddress}/>
    )
  })

  return (
    <div className="space-y-4">
      <div className="text-xl text-center">
        Total Subscribers: {foundSubscribers.length}
      </div>
      <div className="flex items-center">
        Active Subscribers: {foundActiveSubscribers.length}
        {!showFoundActiveSubscribers ?
          <BsArrowDownCircle
            className="ml-2 cursor-pointer"
            onClick={() => setShowFoundActiveSubscribers(!showFoundActiveSubscribers)}
          />
          :
          <BsArrowUpCircle
            className="ml-2 cursor-pointer"
            onClick={() => setShowFoundActiveSubscribers(!showFoundActiveSubscribers)}
          />
        }
      </div>
      {showFoundActiveSubscribers && subscriptionList}

      <div className="flex items-center">
        In-Active Subscribers: {foundSubscribers.length - foundActiveSubscribers.length}
        {!showFoundSubscribers ?
          <BsArrowDownCircle
            className="ml-2 cursor-pointer"
            onClick={() => setShowFoundSubscribers(!showFoundSubscribers)}
          />
          :
          <BsArrowUpCircle
            className="ml-2 cursor-pointer"
            onClick={() => setShowFoundSubscribers(!showFoundSubscribers)}
          />
        }
      </div>
    </div>
  )
}