import Image from 'next/image'
import Link from 'next/link'
import useUserInfo from '../../custom hooks/useUserInfo';
import SubscriptionLength from '../SubscriptionLength';
import { useContext } from 'react';
import { DarkModeContext } from '../../providers/DarkModeProvider';
import { UserAddressContext } from '../../providers/UserAddressProvider';

interface PageProps {
  address: string;
  creator?: string;
}

export default function Subscription({ address, creator }: PageProps) {
  const { username, profilePicture, coverPhoto } = useUserInfo(address);
  const defaultUsername = `${username.slice(0, 4)}...${username.slice(38)}`;

  const { userAddress } = useContext(UserAddressContext);
  const { darkMode } = useContext(DarkModeContext);

  return (
    <Link href={`/profile/${address}`}
      className={`opacity-80 hover:opacity-100 p-4 hover:border hover:shadow-md hover:shadow-gray-300 ease-in-out duration-100 ${darkMode ? 'border-gray-500' : 'border-gray-300'} flex items-center rounded-lg gap-4 text-white`}
      style={{
        backgroundImage: `linear-gradient(to bottom, transparent 10%, rgba(0, 0, 0, 1) 100%), url(${coverPhoto})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center bottom',
      }}
    >
      <Image
        src={profilePicture}
        width={100}
        height={100}
        alt='profile pic'
        className='aspect-square object-cover rounded-full border-4'
      />
      <div className='mt-auto break-all'>
        {address}
        <div className='text-gray-300'>@{username === address ? defaultUsername : username}</div>
        {creator ?
          <SubscriptionLength creator={creator} user={address} />
          : (
            <SubscriptionLength creator={address} user={userAddress} />
          )
        }
      </div>
    </Link>
  )
}
