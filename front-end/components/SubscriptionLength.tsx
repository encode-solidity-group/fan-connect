import { useContractRead } from "wagmi"
import useGetContractAddress from "../custom hooks/useGetContractAddress"
import contractJson from '../SubscriptionJson/SubscriptionService.json'

interface PageProps {
  creator: string | string[] | undefined;
  user: string | undefined;
}

export default function SubscriptionLength({ creator, user }: PageProps) {
  const { contractAddress } = useGetContractAddress();

  const { data: isSubscribed } = useContractRead({
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
    watch: true
  })

  const { data: isCreator } = useContractRead({
    address: contractAddress,
    abi: contractJson.abi,
    functionName: 'creatorPageExists',
    args: [creator],
  });

  const date = new Date(Number(timestamp) * 1000);
  const localTime = date.toLocaleString();

  return (
    <div>
      {isSubscribed === true && creator !== user && isCreator === true && <div>Subscribed until: {localTime}</div>}
      {!isSubscribed && creator !== user && isCreator === true && <div>You are not subscribed</div>}
    </div>
  )
}
