import { useContext, useEffect, useState } from 'react';
import { useContractRead } from 'wagmi';
import contractJson from '../SubscriptionJson/SubscriptionService.json';
import Link from 'next/link';
import useGetContractAddress from '../custom hooks/useGetContractAddress';
import { UserAddressContext } from '../providers/UserAddressProvider';
import { QueryAddressContext } from '../providers/QueryAddressProvider';

export default function UserSubscriptions() {
  const { contractAddress } = useGetContractAddress();
  const { userAddress } = useContext(UserAddressContext);
  const { queryAddress } = useContext(QueryAddressContext);

  const [subscriptionList, setSubscriptionList] = useState<string[]>([]);

  const { data: userSubscriptions } = useContractRead({
    address: contractAddress,
    abi: contractJson.abi,
    functionName: 'getUserSubscriptions',
    args: [userAddress],
  });

  useEffect(() => {
    if (userSubscriptions) {
      setSubscriptionList(userSubscriptions as string[]);
    }
  }, [userSubscriptions]);

  const renderSubscriptions = () => {
    return (
      subscriptionList &&
      subscriptionList.map((subscription, index) => (
        <div key={index} className='p-4 border-y'>
          creator:{' '}
          <Link href={`/profile/${subscription}`}>
            {subscription}
          </Link>
        </div>
      ))
    );
  };

  return (
    <div className='min-h-screen my-8 mx-auto w-[600px]'>
      <div className='text-2xl text-center mb-4'>Your Subscriptions</div>
      {userAddress === queryAddress && renderSubscriptions()}
    </div>
  )
}
