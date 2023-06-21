import React, { useContext, useEffect, useState } from 'react';
import { onSnapshot, collection, query, orderBy, DocumentData, where } from 'firebase/firestore';
import { db } from '../../firebase';
import Input from './Input';
import contractJson from '../../SubscriptionJson/SubscriptionService.json';
import { useContractRead } from 'wagmi';
import useGetContractAddress from '../../custom hooks/useGetContractAddress';
import { UserAddressContext } from '../../providers/UserAddressProvider';
import { RenderFeed } from '../RenderFeed';

const Feed = () => {
  const { contractAddress } = useGetContractAddress();
  const { userAddress } = useContext(UserAddressContext);

  const [posts, setPosts] = useState<DocumentData[]>([]);

  const { data: isCreator } = useContractRead({
    address: contractAddress,
    abi: contractJson.abi,
    functionName: 'creatorPageExists',
    args: [userAddress],
  });

  const { data: subscriptions } = useContractRead({
    address: contractAddress,
    abi: contractJson.abi,
    functionName: 'getUserSubscriptions',
    args: [userAddress],
  });

  useEffect(() => {

    if (isCreator === undefined || subscriptions === undefined || subscriptions === null || (subscriptions as string[]).length < 1) {
      return;
    }

    const getSubscriptionsFeed = onSnapshot(
      query(
        collection(db, 'posts'),
        where('username', 'in', subscriptions),
        orderBy('timestamp', 'desc')
      ),
      (snapshot) => {
        const documents = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setPosts(documents);
      }
    );

    return () => getSubscriptionsFeed();
  }, [isCreator, subscriptions]);

  return (
    <div className="min-h-screen mx-auto w-[600px] my-8">
      <div className="font-medium text-[30px] px-4 py-2">
        Home
      </div>
      {isCreator === true && <Input />}
      <div className='my-8'>
        {RenderFeed(posts)}
      </div>
    </div>

  );
};

export default Feed;
