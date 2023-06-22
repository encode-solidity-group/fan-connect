import { useContext, useEffect, useState } from 'react';
import { useContractRead } from 'wagmi';
import contractJson from '../../SubscriptionJson/SubscriptionService.json';
import Link from 'next/link';
import useGetContractAddress from '../../custom hooks/useGetContractAddress';
import { UserAddressContext } from '../../providers/UserAddressProvider';
import { QueryAddressContext } from '../../providers/QueryAddressProvider';
import Image from 'next/image';

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
        <Link href={`/profile/${subscription}`}
          key={index}
          className='p-4 border-b border-gray-500 flex items-center rounded-lg gap-4 text-white'
          style={{
            backgroundImage: `linear-gradient(to bottom, transparent 10%, rgba(0, 0, 0, 1) 100%), url(/collage.png)`,
            backgroundSize: 'cover',
            backgroundPosition: 'center bottom',
          }}
        >
          <Image
            src={'/male2.jpg'}
            width={100}
            height={100}
            alt='profile pic'
            className='aspect-square object-cover rounded-full border-4'
          />
          <div className='mt-auto break-all'>
            {subscription}
            <div>@username</div>
          </div>
        </Link>
      ))
    );
  };

  return (
    <div className='min-h-screen my-8 mx-auto'>
      <div className='text-2xl text-center mb-4'>Your Subscriptions</div>
      <div className='space-y-8'>
        {userAddress === queryAddress && renderSubscriptions()}
      </div>
    </div>
  )
}
