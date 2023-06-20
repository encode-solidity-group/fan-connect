import React, { useContext, useEffect, useState } from 'react';
import { onSnapshot, collection, query, orderBy, DocumentData, where } from 'firebase/firestore';
import { db } from '../../firebase';
import { useContractRead, useContractWrite } from 'wagmi';
import { BigNumber, ethers } from 'ethers';
import contractJson from '../../SubscriptionJson/SubscriptionService.json';
import ChangeFeeButton from './ChangeFeeButton';
import useGetContractAddress from '../../custom hooks/useGetContractAddress';
import SubscriptionLength from './SubscriptionLength';
import { SiEthereum } from 'react-icons/si';
import { UserAddressContext } from '../../providers/UserAddressProvider';

interface PageProps {
  profile_id: string;
}

const ProfileFeed = ({ profile_id }: PageProps) => {
  const {userAddress} = useContext(UserAddressContext);
  const [foundPrice, setFoundPrice] = useState<BigNumber>(ethers.constants.Zero);

  const [posts, setPosts] = useState<DocumentData[]>([]); 
  const { contractAddress } = useGetContractAddress();

  const [daysSubscribed, setDaysSubscribed] = useState<number>(30);

  const { data: price, refetch: calcPriceRefetch } = useContractRead({
    address: contractAddress,
    abi: contractJson.abi,
    functionName: 'calculatePrice',
    args: [profile_id, daysSubscribed],
  });

  const { data: isSubscribed } = useContractRead({
    address: contractAddress,
    abi: contractJson.abi,
    functionName: 'isSubscribed',
    args: [profile_id, userAddress],
  });

  const { write: subscribeWrite } = useContractWrite({
    address: contractAddress,
    abi: contractJson.abi,
    functionName: 'payForSubscription',
    args: [profile_id, daysSubscribed],
    value: foundPrice
  });

  useEffect(() => {

    if (daysSubscribed != 0) {
      calcPriceRefetch()
    }
    if (price) {
      setFoundPrice(price as BigNumber);
    }
  }, [ calcPriceRefetch, daysSubscribed, price])


  useEffect(() => {
    if (profile_id) {
      const getSubscriptionsFeed = onSnapshot(
        query(
          collection(db, 'posts'),
          where('username', 'in', [profile_id]),
          orderBy('timestamp', 'desc')
        ),
        (snapshot) => {
          const documents = snapshot.docs.map((doc) => doc.data());
          setPosts(documents);
        }
      );
      return () => getSubscriptionsFeed();
    }
  }, [profile_id]);


  // TOKEN GATE THIS FEED. IF YOU ARE NOT SUBSCRIBED TO THE CREATOR
  // AND YOU ARE NOT THE CREATOR YOU SHOULD NOT RENDER ANYTHING
  const renderFeed = () => {
    if (isSubscribed || userAddress === profile_id) {
      return posts.map((post, index) => (
        <div key={index} className='p-4 border border-red-100 my-5 rounded-md'>
          <p>{new Date(post.timestamp.seconds * 1000).toLocaleString()}</p>
          <p>author: {post.username}</p>
          <div className="mt-2 text-red-400">
            <p>{post.text}</p>

          </div>
        </div>
      ));
    } else {
      return (
        <div className='p-4 border border-red-100 my-5 rounded-md text-xl text-bold text-red-300 text-center'>
          <p>Subscribe today for more!</p>
        </div>
      );
    }
  };

  const handleDaysChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = Number(event.target.value);
    setDaysSubscribed(selectedValue);
  };
  
  return (
    <div className="min-h-screen text-white py-4 mx-auto w-[600px]">
      <div className='text-center mb-4'>
        <ChangeFeeButton profile_id={profile_id} />
      </div>
      <div className="bg-black font-medium text-[16px] px-4 py-2 flex justify-center mb-5">
        <div>
          User Profile: {profile_id}
          <SubscriptionLength creator={profile_id} />
        </div>
      </div>
      {(userAddress !== profile_id) &&
        <div className="flex justify-center mx-5 items-start">
          <select
            value={daysSubscribed}
            onChange={(event) => handleDaysChange(event)}
            className="bg-black text-red-200 mx-5 mb-16 border rounded-md "
          >
            <option value="30">30 Days</option>
            <option value="90">90 Days</option>
            <option value="180">180 Days</option>
            <option value="365">365 Days</option>
          </select>

          <div className="mr-6 flex items-center">Price: {ethers.utils.formatUnits(price ? price : 0)} <SiEthereum/></div>

          <div className="text-red-400">
            <button onClick={() => subscribeWrite()} className='border border-red-400 rounded-md px-2'>Subscribe</button>
          </div>

        </div>
      }
      <div className="flex justify-evenly mb-4">
        <div className='mr-2 bg-black text-[24px] text-red-500'>
          {userAddress === profile_id ? 'Your Feed' : 'Feed'}
        </div>
      </div>
      <div className='my-8'>
        {renderFeed()}
      </div>
    </div>
  );
};

export default ProfileFeed; 