import React, { useEffect, useState } from 'react';
import { onSnapshot, collection, query, orderBy, DocumentData, where } from 'firebase/firestore';
import { db } from '../firebase';
import Input from './Input'
import { useSession } from 'next-auth/react';
import { useContractRead,useContractWrite } from 'wagmi';
import{ethers} from 'ethers'
import contractJson from '../SubscriptionJson/SubscriptionService.json';

const ProfileFeed = ({profile_id}) => {
  const { data: session } = useSession();
  const userAddress = session?.user?.name;

  const [posts, setPosts] = useState<DocumentData[]>([]);
  const [isFeedView, setIsFeedView] = useState(true); // new state

  const [daysSubscribed, setDaysSubscribed] = useState(0);
  const { data: userSubscriptions } = useContractRead({
        address: '0x2645E09ea0dab2B90C0AbC69c2cAF205b4c152f6',
        abi: contractJson.abi,
        functionName: 'getUserSubscriptions',
        args: [userAddress],
      })
    
  const { data: price} = useContractRead({
        address: '0x2645E09ea0dab2B90C0AbC69c2cAF205b4c152f6',
        abi: contractJson.abi,
        functionName: 'calculatePrice',
        args: [profile_id,daysSubscribed],
      })
  
  const { data:subscribe, isLoading:subscribeIsLoading, isSuccess:subscribeIsSuccess, write:subscribeWrite } = useContractWrite({
        address: '0x2645E09ea0dab2B90C0AbC69c2cAF205b4c152f6',
        abi: contractJson.abi,
        functionName: 'payForSubscription',
        args: [profile_id,daysSubscribed],
        value: ethers.utils.parseEther(price != undefined ? price.toString() : '0')
      });
  



  useEffect(() => {
    if(userAddress){
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
  }, [userAddress]);





  //TODO: TOKEN GATE THIS FEED. IF YOU ARE NOT SUBSCRIBED TO THE CREATOR
  // AND YOU ARE NOT THE CREATOR YOU SHOULD NOT RENDER ANYTHING
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

  console.log(userSubscriptions)
  const handleDaysChange = (e) => {
    setDaysSubscribed(e.target.value);
  };
  console.log(price)

  const renderSubscriptions = () => {
    //TODO: PRINT OUT LIST OF ALL THE CREATORS YOU ARE SUBSCRIBED TO
    // ONLY IF userAddress = profile_id
  }

  return (
    <div className="min-h-screen text-white py-8 mx-auto w-[600px]">
      <h1 className="bg-black font-medium text-[30px] px-4 py-2">
        Home
      </h1>
      <select value={daysSubscribed} onChange={handleDaysChange}>
        <option value="30">30</option>
        <option value="90">90</option>
        <option value="180">180</option>
        <option value="365">365</option>
        </select>
      <button onClick={subscribeWrite}>Subscribe</button>
      <div className="flex justify-center mb-4">
        <button 
          className={`mr-2 ${isFeedView ? 'bg-black text-white' : ''}`} 
          onClick={() => setIsFeedView(true)}
        >
          Feed
        </button>
        <button 
          className={`ml-2 ${!isFeedView ? 'bg-black text-white' : ''}`} 
          onClick={() => setIsFeedView(false)}
        >
          Subscriptions
        </button>
      </div>
      <div className='my-8'>
        {isFeedView ? renderFeed() : renderSubscriptions()}
      </div>
    </div>
  )
};

export default ProfileFeed;