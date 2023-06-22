import React, { useContext } from 'react'
import { QueryAddressContext } from '../../providers/QueryAddressProvider'
import Image from 'next/image';
import UpdateUsernameModal from './UpdateUsernameModal';
import useUserInfo from '../../custom hooks/useUserInfo';
import { useContractRead } from 'wagmi';
import useGetContractAddress from '../../custom hooks/useGetContractAddress';
import contractJson from '../../SubscriptionJson/SubscriptionService.json';
import { UserAddressContext } from '../../providers/UserAddressProvider';
import { DarkModeContext } from '../../providers/DarkModeProvider';
import { ConnectButton } from '@rainbow-me/rainbowkit';

export default function ProfileHeader() {
  const { queryAddress } = useContext(QueryAddressContext);
  const { userAddress } = useContext(UserAddressContext);
  const { username, bio, profilePicture, coverPhoto } = useUserInfo(queryAddress);
  const { contractAddress } = useGetContractAddress();
  const { darkMode } = useContext(DarkModeContext);

  const { data: subscriberCount } = useContractRead({
    address: contractAddress,
    abi: contractJson.abi,
    functionName: 'getCreatorSubscribers',
    args: [queryAddress],
    watch: true
  });

  const count = Array.isArray(subscriberCount) ? subscriberCount.length : 0;
  const defaultUsername = `${username.slice(0, 4)}...${username.slice(38)}`;

  return (
    <div className="border-b border-gray-500 pb-4 w-full">
      <div className='-mb-10 flex justify-end mr-8'>
        <ConnectButton />
      </div>
      <div className="h-52 bg-cover bg-center" style={{ backgroundImage: `url(${coverPhoto})` }}></div>
      <div className="flex flex-col -mt-24 mx-4 sm:mx-8">
        <div className='flex'>
          <Image
            src={profilePicture}
            width={200}
            height={200}
            alt='profile pic'
            className={`aspect-square object-cover rounded-full border-4 ${!darkMode && 'border-gray-500'}`}
          />
          {userAddress === queryAddress &&
            <div className={`mt-auto -ml-12 border-2 rounded-full ${!darkMode && 'border-gray-500'}`}>
              <UpdateUsernameModal />
            </div>
          }
          <div className="mt-auto ml-4 sm:ml-8">
            <h2 className="text-2xl font-bold">{queryAddress?.slice(0, 4)}...{queryAddress?.slice(38)}</h2>
            <p className="text-lg text-gray-400">@{username === queryAddress ? defaultUsername : username}</p>
            <p className="text-lg">Subscribers: {count}</p>
          </div>
        </div>
        <div className='mt-4 sm:mt-8'>
          {bio}
        </div>
      </div>
    </div>

  )
}
