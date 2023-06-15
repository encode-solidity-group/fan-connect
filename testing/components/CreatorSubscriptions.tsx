import { useContractRead } from "wagmi";
import contractJson from '../SubscriptionJson/SubscriptionService.json';
import { Key, useEffect, useState } from "react";
import { BsArrowDownCircle, BsArrowUpCircle } from "react-icons/bs";
import Link from "next/link";

interface PageProps {
  userAddress: string;
}

export default function CreatorSubscriptions({ userAddress }: PageProps) {
  const [foundSubscribers, setFoundSubscribers] = useState<string[]>([]);
  const [foundActiveSubscribers, setFoundActiveSubscribers] = useState<string[]>([]);
  const [showFoundActiveSubscribers, setShowFoundActiveSubscribers] = useState<Boolean>(false);
  const [showFoundSubscribers, setShowFoundSubscribers] = useState<Boolean>(false);

  const { data: subscribers } = useContractRead({
    address: '0x2645E09ea0dab2B90C0AbC69c2cAF205b4c152f6',
    abi: contractJson.abi,
    functionName: 'getCreatorSubscribers',
    args: [userAddress],
    watch: true,
  })

  const { data: activeSubs } = useContractRead({
    address: '0x2645E09ea0dab2B90C0AbC69c2cAF205b4c152f6',
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
        <Link href={`/profile/${subscriber}`} className="hover:text-blue-400">
          {subscriber}
        </Link>
      </div>
    )
  })

  const handleShowSubscribers = () => {
    setShowFoundActiveSubscribers(!showFoundActiveSubscribers);
  }

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
