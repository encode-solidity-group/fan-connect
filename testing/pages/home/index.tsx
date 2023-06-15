import React, { useEffect, useState } from 'react';
import SideBar from '../../components/SideBar';
import Feed from '../../components/Feed';
import { useAccount } from 'wagmi';

const UserHome = () => {
  const { address } = useAccount();
  const [userAddress, setUserAddress] = useState<string>();

  useEffect(() => {
    if (address) {
      setUserAddress(address);
    }
  }, [address])

  return (
    <div className='flex justify-between w-screen'>
      <SideBar />
      <div className='sm:ml-[175px] lg:ml-[340px] w-full'>
        <Feed userAddress={userAddress} />
      </div>
    </div>
  );
};

export default UserHome;
