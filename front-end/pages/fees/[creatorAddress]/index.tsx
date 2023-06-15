import { useAccount, useContractRead } from "wagmi";
import CreatorFee from "../../../components/CreatorFee";
import { useEffect, useState } from "react";
import contractJson from '../../../SubscriptionJson/SubscriptionService.json';
import SideBar from "../../../components/SideBar";
import { useRouter } from "next/router";
import DisplayFees from "../../../components/DisplayFees";
import RedirectToCreate from "../../../components/RedirectToCreate";
import { ConnectButton } from '@rainbow-me/rainbowkit';
import CreatorSubscriptions from "../../../components/CreatorsSubscriptions";


export default function FeeGate() {
  const router = useRouter();
  const { creatorAddress } = router.query;
  const { address } = useAccount();

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
    address: '0x2645E09ea0dab2B90C0AbC69c2cAF205b4c152f6',
    abi: contractJson.abi,
    functionName: 'creatorPageExists',
    args: [queryAddress],
  })

  return (
    <div className='flex justify-between w-screen'>
      <SideBar />
      <div className='sm:ml-[175px] lg:ml-[340px] xl:ml-[0px] w-full'>
        <div className="flex justify-end mr-16 mt-4">
          <ConnectButton />
        </div>
        {!isCreator && <RedirectToCreate queryAddress={queryAddress} userAddress={userAddress} />}
        {isCreator === true && <DisplayFees />}
        {isCreator === true && queryAddress === userAddress &&
          <div className="grid grid-cols-2 sm:ml-[175px] lg:ml-[340px]">
            <CreatorFee />
            <CreatorSubscriptions userAddress={userAddress} />
          </div>
        }
      </div>
    </div>
  )
}
