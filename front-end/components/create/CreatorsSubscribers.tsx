import { useContractRead } from "wagmi";
import contractJson from '../../SubscriptionJson/SubscriptionService.json';
import { Key, useEffect, useState } from "react";
import { BsArrowDownCircle, BsArrowUpCircle } from "react-icons/bs";
import Link from "next/link";
import useGetContractAddress from "../../custom hooks/useGetContractAddress";
import SubscriptionLength from "../profile/SubscriptionLength";

interface PageProps {
  userAddress: string | undefined;
}

export default function CreatorSubscribers({ userAddress }: PageProps) {
  const [foundSubscribers, setFoundSubscribers] = useState<string[]>([]);
  const [foundActiveSubscribers, setFoundActiveSubscribers] = useState<string[]>([]);
  const [showFoundActiveSubscribers, setShowFoundActiveSubscribers] = useState<Boolean>(false);
  const [showFoundSubscribers, setShowFoundSubscribers] = useState<Boolean>(false);
  const { contractAddress } = useGetContractAddress();

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
      <div key={index}>
        <Link href={`/profile/${subscriber}`} className="hover:text-red-400 break-all">
          {subscriber}
        </Link>
        <SubscriptionLength creator={userAddress} user={subscriber} />
      </div>
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