import React from 'react';
import Image from 'next/image';
import logo from '../public/logo.png';
import SideBarLink from './SideBarLink';
import { AiFillHome, AiOutlineInbox, AiOutlineTeam, AiOutlineUser } from 'react-icons/ai';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import ContractFee from './ContractFee';


const SideBar = () => {
  const { data: session } = useSession();
  const userAddress = session?.user?.name;

  return (
    <div className="hidden sm:flex flex-col items-center fixed lg:items-start lg:w-[340px] h-screen border-r border-red-200">

      <div className="flex items-center justify-center w-44 h-44 hoverEffect mx-auto p-4 lg:p-0">
        <Image src="/logo.png" alt="FanConnectLogo" width={300} height={200} />
      </div>

      <div className="flex-col mx-auto">
        <Link href={'/'}>
          <SideBarLink text="Home" Icon={AiFillHome} />
        </Link>

        <Link href={'/'}>
          <SideBarLink text="Messages" Icon={AiOutlineInbox} />
        </Link>

        <Link href={`/profile/${userAddress}/create`}>
          <SideBarLink text="Create Community" Icon={AiOutlineTeam} />
        </Link>

        <Link href={`/profile/${userAddress}`}>
          <SideBarLink text="Profile" Icon={AiOutlineUser} />
          <div className="text-[#d9d9d9] flex items-center justify-center">
            <div className="hidden lg:inline leading-5 font-bold">
              {session?.user?.name?.slice(0, 4)}...{session?.user?.name?.slice(38)}
            </div>
          </div>
        </Link>
      </div>
      <ContractFee />

    </div>
  );
};

export default SideBar;