import Image from 'next/image';
import useUserInfo from '../../custom hooks/useUserInfo';
import { useContext } from 'react';
import { DarkModeContext } from '../../providers/DarkModeProvider';
import Link from 'next/link';

interface PageProps {
  address: string;
  onDelete?: () => void;
}

export default function RightSidebarProfile({ address, onDelete }: PageProps) {
  const { username, profilePicture, coverPhoto } = useUserInfo(address);
  const defaultUsername = `${username.slice(0, 4)}...${username.slice(38)}`;

  const { darkMode } = useContext(DarkModeContext);

  const handleProfileClose = () => {
    if (onDelete) {
      onDelete();
    }
  };

  return (
    <div className={`relative opacity-80 hover:opacity-100 p-4 hover:border hover:shadow-md hover:shadow-gray-300 ease-in-out duration-100 ${darkMode ? 'border-gray-500' : 'border-gray-300'} flex flex-col items-center rounded-lg gap-4 text-white`} style={{ backgroundImage: `linear-gradient(to bottom, transparent 10%, rgba(0, 0, 0, 1) 100%), url(${coverPhoto})`, backgroundSize: 'cover', backgroundPosition: 'center bottom' }}>
      <Link href={`/profile/${address}`} passHref>
        <Image src={profilePicture} width={100} height={100} alt='profile pic' className='aspect-square object-cover rounded-full border-4' />
        <div className='mt-auto break-all'>
          {address.slice(0, 4)}...{address.slice(38)}
          <div className='text-gray-300'>@{username === address ? defaultUsername : username}</div>
        </div>
      </Link>
      <button onClick={handleProfileClose} className="absolute top-0 right-0 mt-4 mr-4 rounded-full bg-gray-800">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6 ">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  );
}
