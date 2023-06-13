import React from 'react';
import Image from 'next/image';
import logo from '../public/logo.png';
import SideBarLink from './SideBarLink';
import { AiFillHome, AiOutlineInbox, AiOutlineTeam, AiOutlineUser } from 'react-icons/ai';
import Link from 'next/link';
import { useSession } from 'next-auth/react';


const SideBar = () => {
  const { data: session } = useSession();
  return (
    <div className="hidden sm:flex flex-col items-center xl:items-start xl:w-[340px] p-2 fixed h-full border-r border-red-200 pr-0 xl:pr-8">

      <div className="flex items-center justify-center w-44 h-44 hoverEffect p-0 xl:ml-24">

        <Image src="/logo.png" alt="FanConnectLogo" width={300} height={200} />

      </div>

      <div className="space-y-2 mt-4 mb-2.5 xl:ml-24">
        <SideBarLink text="Home" Icon={AiFillHome} />
        <SideBarLink text="Messages" Icon={AiOutlineInbox} />
        {/* TODO FIX LINK */}
        <Link href="/profile/[profileId]/create">
          <SideBarLink text="Create Community" Icon={AiOutlineTeam} />
        </Link>
        <Link href="/Profile">
          <SideBarLink text="Profile" Icon={AiOutlineUser} />
        </Link>
      </div>
      <Link href="/Profile">
        <div className="text-[#d9d9d9] flex items-center justify-center my-auto xl:ml-auto xl:mr-5 px-4 py-2">
          <div className="hidden xl:inline leading-5">
            <h4 className="font-bold">{session?.user?.name?.slice(-3)}...{session?.user?.name?.slice(38)}</h4>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default SideBar;