import React, { useEffect, useState } from 'react';
import { onSnapshot, collection, query, orderBy, DocumentData, where } from 'firebase/firestore';
import { db } from '../firebase';
import Input from './Input'
import contractJson from '../SubscriptionJson/SubscriptionService.json';
import { useContractRead } from 'wagmi';

interface PageProps {
  userAddress: string | undefined
}

const Feed = ({userAddress}: PageProps) => {

  const [posts, setPosts] = useState<DocumentData[]>([]);

  const { data: isCreator } = useContractRead({
    address: '0x2645E09ea0dab2B90C0AbC69c2cAF205b4c152f6',
    abi: contractJson.abi,
    functionName: 'creatorPageExists',
    args: [userAddress],
  });
  console.log('feed address: ', userAddress);

  useEffect(() => {

    const getSubscriptionsFeed = onSnapshot(
      query(
        collection(db, 'posts'),
        where('username', 'in', ['0xBB923B99A0067e8ae37533898B849d67B8f3268e', '0x622e92aa1C7D0512d70Cf3155a5C0c76E4e58538']),
        orderBy('timestamp', 'desc')
      ),
      (snapshot) => {
        const documents = snapshot.docs.map((doc) => doc.data());
        setPosts(documents);
      }
    );

    return () => getSubscriptionsFeed();
  }, []);

  const renderFeed = () => {
    return (
      posts && posts.map((post, index) => (
        <div key={index} className='p-4 border-y'>
          <p>time: {new Date(post.timestamp.seconds * 1000).toLocaleString()}</p>
          <p>author: {post.username}</p>
          <p>text: {post.text}</p>
        </div>
      ))
    );
  }

  return (
    <div className="min-h-screen text-white py-8 mx-auto w-[600px]">
      <div className="bg-black font-medium text-[30px] px-4 py-2">
        Home
      </div>
      {isCreator === true  &&  <Input />}
      <div className='my-8'>
        {renderFeed()}
      </div>
    </div>
  )
};

export default Feed;
