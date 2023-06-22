import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { formatTime } from '../../utils/formatTime'
import useUserInfo from '../../custom hooks/useUserInfo';

interface PageProps {
  userAddress: string;
  timestamp: number;
  text: string;
}

export default function FeedHeader({ userAddress, timestamp, text }: PageProps) {
  const { username, profilePicture } = useUserInfo(userAddress);
  const defaultUsername = `${username.slice(0, 4)}...${username.slice(38)}`;

  return (
    <div className='p-4 space-y-4'>
      <div className='flex justify-between'>
        <div className="flex">
          <Link href={`/profile/${userAddress}`}>
            <Image src={profilePicture} width={50} height={50} alt="profile photo" className="aspect-square object-cover rounded-full" />
          </Link>
          <div className="flex flex-col ml-2">
            <Link href={`/profile/${userAddress}`} className="hover:text-[#3FA0EF]">
              {userAddress.slice(0, 4)}...{userAddress.slice(38)}
            </Link>
            <div className="text-sm text-gray-500">@{username === userAddress ? defaultUsername : username}</div>
          </div>
        </div>
        <p className="text-gray-500">{formatTime(new Date(timestamp * 1000).toLocaleString())}</p>
      </div>
      <div>{text}</div>
    </div>
  )
}
