import React, { useEffect, useState } from 'react';
import { onSnapshot, collection, query, orderBy, DocumentData, where } from 'firebase/firestore';
import { db } from '../firebase';
import Input from './Input';
import contractJson from '../SubscriptionJson/SubscriptionService.json';
import { useContractRead } from 'wagmi';

interface PageProps {
  userAddress: string | undefined;
}

const Feed = ({ userAddress }: PageProps) => {

  const [posts, setPosts] = useState<DocumentData[]>([]);

  const { data: isCreator } = useContractRead({
    address: '0x2645E09ea0dab2B90C0AbC69c2cAF205b4c152f6',
    abi: contractJson.abi,
    functionName: 'creatorPageExists',
    args: [userAddress],
  });
  console.log('feed address: ', userAddress);

  const { data: subscriptions } = useContractRead({
    address: '0x2645E09ea0dab2B90C0AbC69c2cAF205b4c152f6',
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
        const documents = snapshot.docs.map((doc) => doc.data());
        setPosts(documents);
      }
    );

    return () => getSubscriptionsFeed();
  }, [isCreator, subscriptions]);

  const renderFeed = () => {
    return (
      posts && posts.map((post, index) => (
        <div key={index} className='p-4 border border-red-100 my-5 rounded-md'>
          <p>{new Date(post.timestamp.seconds * 1000).toLocaleString()}</p>
          <p>author: {post.username}</p>
          <div className="mt-2 text-red-400">
            <p className="text-bold">{post.text}</p>
          </div>
        </div>
      ))
    );
  };

  return (


    <div className="min-h-screen text-white py-8 mx-auto w-[600px] -mt-8">
      <div className="bg-black font-medium text-[30px] px-4 py-2">
        Home
      </div>
      {isCreator === true && <Input />}
      <div className='my-8'>
        {renderFeed()}
      </div>
    </div>

  );
};

export default Feed;
