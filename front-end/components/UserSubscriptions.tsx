import React, { useContext } from 'react'
import { useContractRead } from 'wagmi';
import contractJson from '../SubscriptionJson/SubscriptionService.json';
import Link from 'next/link';
import useGetContractAddress from '../custom hooks/useGetContractAddress';
import { UserAddressContext } from '../providers/UserAddressProvider';

export default function UserSubscriptions() {
  const {contractAddress} = useGetContractAddress();
  const {userAddress} = useContext(UserAddressContext);

  const { data: userSubscriptions } = useContractRead({
    address: contractAddress,
    abi: contractJson.abi,
    functionName: 'getUserSubscriptions',
    args: [userAddress],
  });

  const renderSubscriptions = () => {
    //TODO: PRINT OUT LIST OF ALL THE CREATORS YOU ARE SUBSCRIBED TO
    // ONLY IF userAddress = profile_id
    return (userSubscriptions && userSubscriptions.map((subscription, index) => (
      <div key={index} className='p-4 border-y'>
        <Link href={`/profile/${subscription}`}>
          <p>creator: {subscription}</p>
        </Link>
      </div>
    ))
    );
  };
  return (
    <div>UserSubscriptions</div>
  )
}
