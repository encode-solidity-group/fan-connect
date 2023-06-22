import Image from 'next/image'
import Link from 'next/link'
import useUserInfo from '../../custom hooks/useUserInfo';

interface PageProps {
  address: string;
}

export default function Subscription({ address }: PageProps) {
  const { username, profilePicture, coverPhoto } = useUserInfo(address);

  return (
    <Link href={`/profile/${address}`}
      className='p-4 border-b border-gray-500 flex items-center rounded-lg gap-4 text-white'
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
        <div>@{username}</div>
      </div>
    </Link>
  )
}
