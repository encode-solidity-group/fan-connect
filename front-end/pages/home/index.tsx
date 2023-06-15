import React, { useEffect, useState } from 'react';
import SideBar from '../../components/SideBar';
import Feed from '../../components/Feed';
import { useAccount } from 'wagmi';
import { ConnectButton } from '@rainbow-me/rainbowkit';

const UserHome = () => {
  const { address } = useAccount();
  const [userAddress, setUserAddress] = useState<string>();

  useEffect(() => {
    if (address) {
      setUserAddress(address);
    }
  }, [address]);

  return (
    <div>
      <div className='flex justify-between w-screen'>
        <SideBar />

        <div className='sm:ml-[175px] lg:ml-[340px] xl:ml-[0px] w-full'>
          <div className="flex justify-end py-16 mr-16">
            <ConnectButton />
          </div>
          <Feed userAddress={userAddress} />
        </div>
      </div>
    </div>
  );
};

export default UserHome;
