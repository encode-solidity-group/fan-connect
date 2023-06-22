import { useContext, useEffect, useState } from 'react';
import { useContractRead } from 'wagmi';
import contractJson from '../../SubscriptionJson/SubscriptionService.json';
import useGetContractAddress from '../../custom hooks/useGetContractAddress';
import { UserAddressContext } from '../../providers/UserAddressProvider';
import Subscription from './Subscription';

export default function UserSubscriptions() {
  const { contractAddress } = useGetContractAddress();
  const { userAddress } = useContext(UserAddressContext);

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
        <Subscription address={subscription} key={index} />
      ))
    );
  };

  return (
    <div className='min-h-screen my-8 mx-auto'>
      <div className='text-2xl text-center mb-4'>Your Subscriptions</div>
      <div className='space-y-8'>
        {userAddress && renderSubscriptions()}
      </div>
    </div>
  )
}
