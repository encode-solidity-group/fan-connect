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
import ChangeFeeButton from "../../../components/create/ChangeFeeButton";

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
        {!isCreator && <RedirectToCreate />}
        {isCreator === true &&
          <div
            className={`p-8 my-4 sm:my-8 rounded-xl w-full max-w-[900px] mx-auto shadow-md shadow-gray-300 border ${darkMode ? 'border-gray-800' : 'border-gray-200'}`}>
            <DisplayFees />
            {queryAddress !== userAddress &&
              <Link href={`/profile/${queryAddress}`} className="flex justify-center mt-8">
                <button className="enterButton">Subscribe Now</button>
              </Link>
            }
            <div className="flex justify-center">
              <ChangeFeeButton />
            </div>
          </div>
        }
        {isCreator === true && queryAddress === userAddress &&
          <div className={`p-8 mb-4 sm:mb-8 mx-auto max-w-[900px] shadow-md shadow-gray-300 border rounded-xl ${darkMode ? 'border-gray-800' : 'border-gray-200'}`}>
            <CreatorSubscribers />
          </div>
        }
        {/* {!isCreator && <RedirectToCreate />}
        {isCreator === true &&
          <div className="flex gap-[20px]">
            <TotalSubscribersCard />
          </div>
        } */}
      </div>
      <SideBarRight />
      <Nav />
    </div>
  );
}
