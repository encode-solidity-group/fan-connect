import { useContractRead } from "wagmi"
import useGetContractAddress from "../../custom hooks/useGetContractAddress"
import contractJson from '../../SubscriptionJson/SubscriptionService.json'
import { useContext } from "react";
import { UserAddressContext } from "../../providers/UserAddressProvider";

interface PageProps {
  creator: string | string[] | undefined;
}

export default function SubscriptionLength({ creator }: PageProps) {
  const { contractAddress } = useGetContractAddress();
  const {userAddress} = useContext(UserAddressContext);

  const {data: isSubscribed} = useContractRead({
    address: contractAddress,
    abi: contractJson.abi,
    functionName: 'isSubscribed',
    args: [creator, userAddress],
  })

  const { data: timestamp } = useContractRead({
    address: contractAddress,
    abi: contractJson.abi,
    functionName: 'subscriptionEnd',
    args: [creator, userAddress],
  })

  const date = new Date(Number(timestamp) * 1000);
  const localTime = date.toLocaleString();

  return (
    <div className="">
      {isSubscribed === true && creator !== userAddress && <div>Subscribed until: {localTime}</div>}
      {!isSubscribed && creator !== userAddress && <div>You are not subscribed</div>}
    </div>
  )
}
