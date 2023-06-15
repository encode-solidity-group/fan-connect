import { useRouter } from "next/router"
import { useContractRead } from "wagmi";
import contractJson from '../SubscriptionJson/SubscriptionService.json';

interface PageProps {
  userAddress: string;
  profile_id: string;
}

export default function ChangeFeeButton({ userAddress, profile_id }: PageProps) {
  const router = useRouter();

  const { data: iscreator } = useContractRead({
    address: '0x2645E09ea0dab2B90C0AbC69c2cAF205b4c152f6',
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