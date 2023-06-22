import { useContractRead } from "wagmi";
import CreatorFee from "../../../components/create/CreatorFee";
import { useContext } from "react";
import contractJson from '../../../SubscriptionJson/SubscriptionService.json';
import SideBar from "../../../components/sidebar/SideBar";
import DisplayFees from "../../../components/create/DisplayFees";
import RedirectToCreate from "../../../components/create/RedirectToCreate";
import { ConnectButton } from '@rainbow-me/rainbowkit';
import useGetContractAddress from "../../../custom hooks/useGetContractAddress";
import Link from "next/link";
import CreatorSubscribers from "../../../components/create/CreatorsSubscribers";
import { UserAddressContext } from "../../../providers/UserAddressProvider";
import { QueryAddressContext } from "../../../providers/QueryAddressProvider";
import { DarkModeContext } from "../../../providers/DarkModeProvider";
import Nav from "../../../components/landingPage/Nav";
import TotalSubscribersCard from "../../../components/create/cards/TotalSubscribersCard";
import SideBarRight from "../../../components/sidebar/RightSideBar";

export default function FeeGate() {
  const { contractAddress } = useGetContractAddress();
  const { userAddress } = useContext(UserAddressContext);
  const { queryAddress } = useContext(QueryAddressContext);
  const { darkMode } = useContext(DarkModeContext);

  const { data: isCreator } = useContractRead({
    address: contractAddress,
    abi: contractJson.abi,
    functionName: 'creatorPageExists',
    args: [queryAddress],
  });

  return (
    <div className={`flex justify-between w-screen min-h-screen ${darkMode && 'dark-mode'}`}>
      <SideBar />
      <div className='sm:ml-[175px] lg:ml-[280px] w-full px-4 sm:px-8'>
        <div className='mt-4 flex justify-end'>
          <ConnectButton />
        </div>
        {/* {!isCreator && <RedirectToCreate />}
        {isCreator === true &&
          <div>
            <DisplayFees />
            {queryAddress !== userAddress &&
              <Link href={`/profile/${queryAddress}`} className="flex justify-center">
                <button className="enterButton">Subscribe Now</button>
              </Link>
            }
          </div>
        } */}
        {/* {isCreator === true && queryAddress === userAddress &&
          <div className="grid grid-cols-2 mx-auto">
            <CreatorFee />
            <CreatorSubscribers />
          </div>
        } */}
        {!isCreator && <RedirectToCreate />}
        {isCreator === true &&
          <div className="flex gap-[20px]">
            <TotalSubscribersCard />
          </div>
        }
      </div>
      <SideBarRight />
      <Nav />
    </div>
  );
}
