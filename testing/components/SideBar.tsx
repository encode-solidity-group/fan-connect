import React from 'react';
import Image from 'next/image';
import logo from '../public/logo.png';
import SideBarLink from './SideBarLink';
import { AiFillHome, AiOutlineInbox, AiOutlineTeam, AiOutlineUser } from 'react-icons/ai';
import Link from 'next/link';
import ContractFee from './ContractFee';
import { useAccount } from 'wagmi';

const SideBar = () => {
  const { address: userAddress } = useAccount();

  if (!userAddress) {
    return <></>
  }

  return (
    <div className="hidden sm:flex flex-col items-center fixed lg:items-start lg:w-[340px] h-screen border-r border-red-200">

      <div className="flex items-center justify-center w-44 h-44 hoverEffect mx-auto p-4 lg:p-0">
        <Link href={'/'}>
          <Image src={logo} alt="FanConnectLogo"  width={300} height={200} />
        </Link>
      </div>

      <div className="flex-col mx-auto">
        <Link href={'/home'}>
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
              {userAddress?.slice(0, 4)}...{userAddress?.slice(38)}
            </div>
          </div>
        </Link>
      </div>
      <ContractFee userAddress={userAddress}/>
    </div>
  );
};

export default SideBar;