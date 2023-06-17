import { useRouter } from "next/router"
import { useContractRead, useNetwork } from "wagmi";
import contractJson from '../SubscriptionJson/SubscriptionService.json';
import useGetContractAddress from "../custom hooks/useGetContractAddress";

interface PageProps {
  userAddress: string;
  profile_id: string;
}

export default function ChangeFeeButton({ userAddress, profile_id }: PageProps) {
  const router = useRouter();

  const { contractAddress } = useGetContractAddress();

  const { data: iscreator } = useContractRead({
    address: contractAddress,
    abi: contractJson.abi,
    functionName: 'creatorPageExists',
    args: [userAddress],
    watch: true,
  })

  if (!iscreator) {
    return <></>
  }

  return (
    <>
      {profile_id === userAddress &&
        <button
          className="enterButton"
          onClick={() => router.push(`/fees/${userAddress}`)} >
          <div className="base">Change Subscription Fees</div>
          <div className="onHover">Change Subscription Fees</div>
        </button>
      }
    </>
  )
}