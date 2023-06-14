import React from 'react';
import SideBar from '../../components/SideBar';
import Feed from '../../components/Feed';
import { useAccount, useContractRead } from 'wagmi';
import contractJson from '../../SubscriptionJson/SubscriptionService.json';
import { useSession } from 'next-auth/react';

const UserHome = () => {
  const {address} = useAccount();

  const { data } = useContractRead({
    address: '0x2645E09ea0dab2B90C0AbC69c2cAF205b4c152f6',
    abi: contractJson.abi,
    functionName: 'creatorPageExists',
    args: [address],
  });

  return (
    <div className='flex justify-between w-screen'>
      <SideBar />

      {!data ?
        <div className='sm:ml-[175px] lg:ml-[340px] w-full'>
          <Feed />
        </div>
        : <></>
      }
    </div>
  );
};

export default UserHome;
