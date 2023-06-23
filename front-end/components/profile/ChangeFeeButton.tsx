import { useRouter } from "next/router"
import { useContractRead } from "wagmi";
import contractJson from '../../SubscriptionJson/SubscriptionService.json';
import useGetContractAddress from "../../custom hooks/useGetContractAddress";
import { useContext } from "react";
import { UserAddressContext } from "../../providers/UserAddressProvider";
import { QueryAddressContext } from "../../providers/QueryAddressProvider";

export default function ChangeFeeButton() {
  const router = useRouter();

  const { userAddress } = useContext(UserAddressContext);
  const { queryAddress } = useContext(QueryAddressContext);
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
      {queryAddress === userAddress &&
        <button
          className="enterButton"
          onClick={() => router.push(`/create/${userAddress}`)}
        >
          Change Subscription Fees
        </button>
      }
    </>
  )
}