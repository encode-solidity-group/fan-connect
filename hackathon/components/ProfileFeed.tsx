import React, { useEffect, useState } from 'react';
import { onSnapshot, collection, query, orderBy, DocumentData, where } from 'firebase/firestore';
import { db } from '../firebase';
import Input from './Input';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { useContractRead, useContractWrite, useAccount } from 'wagmi';
import { ethers } from 'ethers';
import contractJson from '../SubscriptionJson/SubscriptionService.json';
import ChangeFeeButton from './ChangeFeeButton';
import useGetContractAddress from '../custom hooks/useGetContractAddress';

const ProfileFeed = ({ profile_id }) => {
  const { address } = useAccount();
  const [userAddress, setUserAddress] = useState("");
  // const userAddress = session?.user?.name;

  const [posts, setPosts] = useState<DocumentData[]>([]);
  const [isFeedView, setIsFeedView] = useState(true);
  const {contractAddress} = useGetContractAddress();

  const [daysSubscribed, setDaysSubscribed] = useState(30);

  const { data: userSubscriptions } = useContractRead({
    address: contractAddress,
    abi: contractJson.abi,
    functionName: 'getUserSubscriptions',
    args: [userAddress],
  });

  const { data: price, refetch:calcPriceRefetch } = useContractRead({
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

  const { data: subscribe, isLoading: subscribeIsLoading, isSuccess: subscribeIsSuccess, write: subscribeWrite } = useContractWrite({
    address: contractAddress,
    abi: contractJson.abi,
    functionName: 'payForSubscription',
    args: [profile_id, daysSubscribed],
    value: price
  });

  useEffect(() => {
    if(address){
    setUserAddress(address)
    }
    if(daysSubscribed != 0){
      calcPriceRefetch()
    }
  }, [address,daysSubscribed])



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

      // If user is not the profile owner, default to Feed view
      if (userAddress !== profile_id) {
        setIsFeedView(true);
      }
      return () => getSubscriptionsFeed();
    }
  }, [profile_id]);





  //TODO: TOKEN GATE THIS FEED. IF YOU ARE NOT SUBSCRIBED TO THE CREATOR
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
        <div className='p-4 border border-red-100 my-5 rounded-md text-xl text-bold text-red-300'>
          <p> Subscribe Today! </p>
        </div>
      );
    }
  };

  const handleDaysChange = (e) => {
    setDaysSubscribed(e.target.value);
  };

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
    <div className="min-h-screen py-4 mx-auto w-[600px]">
      <div className='text-center mb-4'>
        <ChangeFeeButton userAddress={userAddress} profile_id={profile_id} />
      </div>
      <div className="font-medium text-[16px] px-4 py-2 flex justify-center mb-5">
        <div>
          User Profile: {address}
        </div>
      </div>
      {(userAddress !== profile_id)&&
      <div className="flex justify-center mx-5">
        <select 
          value={daysSubscribed} 
          onChange={handleDaysChange}
          className="text-red-200 mx-5 mb-16 border rounded-md"
        >
          <option value="30">30</option>
          <option value="90">90</option>
          <option value="180">180</option>
          <option value="365">365</option>
        </select>
        <p className="mr-6">Price: {ethers.utils.formatUnits(price?price:0n)} Eth</p>

        <div className="text-red-400">
          <button onClick={subscribeWrite}>Subscribe</button>
        </div>

      </div>
      }
      <div className="flex justify-evenly mb-4">
        <button
          className={`mr-2 ${isFeedView ? 'text-[24px] text-red-500' : ''}`}
          onClick={() => setIsFeedView(true)}
        >
          Feed
        </button>
        {userAddress === profile_id && (
          <button
            className={`ml-2 ${!isFeedView ? 'text-[24px]  text-red-500' : ''}`}
            onClick={() => setIsFeedView(false)}
          >
            Subscriptions
          </button>
        )}
      </div>
      <div className='my-8'>
        {isFeedView ? renderFeed() : ((userAddress === profile_id) && renderSubscriptions())}
      </div>
    </div>
  );
};

export default ProfileFeed; 