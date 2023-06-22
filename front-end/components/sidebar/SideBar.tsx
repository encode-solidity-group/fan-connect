import React, { useContext } from 'react';
import Image from 'next/image';
import logo from '../../public/blueLogo.png';
import SideBarLink from './SideBarLink';
import { AiOutlineHome } from 'react-icons/ai';
import { RiBankLine, RiUserLine, RiHeartsLine } from "react-icons/ri";
import Link from 'next/link';
import ContractFee from './ContractFee';
import { UserAddressContext } from '../../providers/UserAddressProvider';
import DarkModeButton from '../DarkModeButton';

const SideBar = () => {
  const { userAddress } = useContext(UserAddressContext);

  return (
    <div className="hidden sm:flex flex-col items-center fixed lg:items-start lg:w-[340px] h-screen border-r border-gray-500">

      <div className="flex items-center justify-center w-44 h-44 hoverEffect mx-auto p-4 lg:p-0">
        <Link href={'/'}>
          <Image src={logo} alt="FanConnectLogo" width={300} height={200} />
        </Link>
      </div>

      <div className="flex-col mx-auto">
        <Link href={'/home'}>
          <SideBarLink text="Home" Icon={AiOutlineHome} />
        </Link>

        <Link href={`/subscriptions/${userAddress}`}>
          <SideBarLink text="Subscriptions" Icon={RiHeartsLine} />
        </Link>

        <Link href={`/create/${userAddress}`}>
          <SideBarLink text="Create Community" Icon={RiBankLine} />
        </Link>

        <Link href={`/profile/${userAddress}`}>
          <SideBarLink text="Profile" Icon={RiUserLine} />
          <div className="flex items-center justify-center">
            <div className="hidden lg:inline leading-5 font-bold">
              {userAddress?.slice(0, 4)}...{userAddress?.slice(38)}
            </div>
          </div>
        </Link>
      </div>
      <DarkModeButton />
      <ContractFee />
    </div>
  );
};

export default SideBar;