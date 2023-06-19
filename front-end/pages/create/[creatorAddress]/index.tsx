import { useAccount, useContractRead } from "wagmi";
import CreatorFee from "../../../components/create/CreatorFee";
import { useEffect, useState } from "react";
import contractJson from '../../../SubscriptionJson/SubscriptionService.json';
import SideBar from "../../../components/SideBar";
import { useRouter } from "next/router";
import DisplayFees from "../../../components/create/DisplayFees";
import RedirectToCreate from "../../../components/create/RedirectToCreate";
import { ConnectButton } from '@rainbow-me/rainbowkit';
import CreatorSubscriptions from "../../../components/create/CreatorsSubscriptions";
import useGetContractAddress from "../../../custom hooks/useGetContractAddress";
import Link from "next/link";

export default function FeeGate() {
  const router = useRouter();
  const { creatorAddress } = router.query;
  const { address } = useAccount();
  const { contractAddress } = useGetContractAddress();

  const [userAddress, setUserAddress] = useState<string>();
  const [queryAddress, setQueryAddress] = useState<string | string[] | undefined>();

  useEffect(() => {
    if (address) {
      setUserAddress(address);
    }
    if (creatorAddress) {
      setQueryAddress(creatorAddress);
    }
  }, [address, creatorAddress]);

  const { data: isCreator } = useContractRead({
    address: contractAddress,
    abi: contractJson.abi,
    functionName: 'creatorPageExists',
    args: [queryAddress],
  })

  return (
    <div className='flex justify-between w-screen'>
      <SideBar />
      <div className='sm:ml-[175px] lg:ml-[340px] w-full'>

        <div className="flex justify-end mr-16 mt-4">
          <ConnectButton />
        </div>

        {!isCreator && <RedirectToCreate queryAddress={queryAddress} userAddress={userAddress} />}
        {isCreator === true &&
          <div>
            <DisplayFees queryAddress={queryAddress} />
            {queryAddress !== userAddress &&
              <Link href={`/profile/${queryAddress}`} className="flex justify-center">
                <button className="enterButton">Subscribe Now</button>
              </Link>
            }
          </div>
        }
        {isCreator === true && queryAddress === userAddress &&
          <div className="grid grid-cols-2 mx-auto">
            <CreatorFee />
            <CreatorSubscriptions userAddress={userAddress} />
          </div>
        }

      </div>
    </div>
  )
}
