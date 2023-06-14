import React from 'react';
import SideBar from '../../../components/SideBar';
import Feed from '../../../components/Feed';
import { useContractRead } from 'wagmi';
import contractJson from '../../../SubscriptionJson/SubscriptionService.json';

const UserHome = () => {
  const {data} = useContractRead({
    address: '0x2645E09ea0dab2B90C0AbC69c2cAF205b4c152f6',
    abi: contractJson.abi,
    functionName: '',
  })

  return (
    <div className='flex justify-between w-screen'>
      <SideBar />
      <div className='sm:ml-[175px] lg:ml-[340px] w-full'>
        <Feed />
      </div>
    </div>
  );
};

export default UserHome;
