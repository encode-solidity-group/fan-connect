import { useContractRead } from "wagmi"
import useGetContractAddress from "../../custom hooks/useGetContractAddress"
import contractJson from '../../SubscriptionJson/SubscriptionService.json'

interface PageProps {
  user: string | undefined;
  creator: string | string[] | undefined;
}

export default function SubscriptionLength({ creator, user }: PageProps) {
  const { contractAddress } = useGetContractAddress();

  const {data: isSubscribed} = useContractRead({
    address: contractAddress,
    abi: contractJson.abi,
    functionName: 'isSubscribed',
    args: [creator, user],
  })

  const { data: timestamp } = useContractRead({
    address: contractAddress,
    abi: contractJson.abi,
    functionName: 'subscriptionEnd',
    args: [creator, user],
  })

  const date = new Date(Number(timestamp) * 1000);
  const localTime = date.toLocaleString();

  return (
    <div className="">
      {isSubscribed === true && creator !== user && <div>Subscribed until: {localTime}</div>}
      {!isSubscribed && creator !== user && <div>You are not subscribed</div>}
    </div>
  )
}
