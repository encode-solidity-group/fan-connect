import React, { useContext, useEffect, useState } from 'react';
import { onSnapshot, collection, query, orderBy, DocumentData, where } from 'firebase/firestore';
import { db } from '../../firebase';
import { useContractRead, useContractWrite, useWaitForTransaction } from 'wagmi';
import { BigNumber, ethers } from 'ethers';
import contractJson from '../../SubscriptionJson/SubscriptionService.json';
import useGetContractAddress from '../../custom hooks/useGetContractAddress';
import SubscriptionLength from '../SubscriptionLength';
import { SiEthereum } from 'react-icons/si';
import { UserAddressContext } from '../../providers/UserAddressProvider';
import { QueryAddressContext } from '../../providers/QueryAddressProvider';
import { RenderFeed } from '../feed/RenderFeed';
import Input from '../home/Input';
import { DarkModeContext } from '../../providers/DarkModeProvider';
import { toast } from 'react-toastify';
import { ImSpinner9 } from 'react-icons/im';

const ProfileFeed = () => {
  const { userAddress } = useContext(UserAddressContext);
  const { queryAddress } = useContext(QueryAddressContext);
  const { contractAddress } = useGetContractAddress();
  const { darkMode } = useContext(DarkModeContext);

  const [foundPrice, setFoundPrice] = useState<BigNumber>(ethers.constants.Zero);
  const [posts, setPosts] = useState<DocumentData[]>([]);

  const [daysSubscribed, setDaysSubscribed] = useState<number>(30);
  const [showInput, setShowInput] = useState(false);

  const { data: price, refetch: calcPriceRefetch } = useContractRead({
    address: contractAddress,
    abi: contractJson.abi,
    functionName: 'calculatePrice',
    args: [queryAddress, daysSubscribed],
  });

  const { data: isSubscribed } = useContractRead({
    address: contractAddress,
    abi: contractJson.abi,
    functionName: 'isSubscribed',
    args: [queryAddress, userAddress],
    watch: true,
  });

  const { write: subscribeWrite, data: tx } = useContractWrite({
    address: contractAddress,
    abi: contractJson.abi,
    functionName: 'payForSubscription',
    args: [queryAddress, daysSubscribed],
  });

  const { data: isCreator } = useContractRead({
    address: contractAddress,
    abi: contractJson.abi,
    functionName: 'creatorPageExists',
    args: [queryAddress],
    watch: true
  });

  const { isLoading, isSuccess } = useWaitForTransaction({
    hash: tx?.hash
  })

  useEffect(() => {
    if (isLoading) {
      toast.info('Subscribing! Please wait a moment.', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  }, [isLoading]);

  useEffect(() => {
    if (isSuccess) {
      toast.success(`Subscribed for ${daysSubscribed} days!`, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  }, [daysSubscribed, isSuccess]);


  useEffect(() => {
    if (daysSubscribed != 0) {
      calcPriceRefetch()
    }
    if (price) {
      setFoundPrice(price as BigNumber);
    }
  }, [calcPriceRefetch, daysSubscribed, price])

  useEffect(() => {
    if (queryAddress) {
      const getSubscriptionsFeed = onSnapshot(
        query(
          collection(db, 'posts'),
          where('username', 'in', [queryAddress]),
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
    }
  }, [queryAddress]);

  const handleDaysChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = Number(event.target.value);
    setDaysSubscribed(selectedValue);
  };

  if (typeof userAddress === 'undefined') {
    return null; // Return null to hide the component
  }


  return (
    <div className="min-h-screen mx-auto">
      <div className='text-center'>
        <SubscriptionLength creator={queryAddress} user={userAddress} />
      </div>
      {(userAddress !== queryAddress) && isCreator === true &&
        <div className="flex flex-col items-center sm:flex-row justify-center mx-5">
          
          <div className='flex items-center'>
            <select
              value={daysSubscribed}
              onChange={(event) => handleDaysChange(event)}
              className="m-5 border rounded-md text-black border-gray-500"
            >
              <option value="30">30 Days</option>
              <option value="90">90 Days</option>
              <option value="180">180 Days</option>
              <option value="365">365 Days</option>
            </select>
            <div className="mr-6 flex items-center">Price: {ethers.utils.formatUnits(foundPrice)} <SiEthereum /></div>
          </div>

          <div className='flex'>
            <div>
              <button onClick={() => subscribeWrite({ value: BigInt(foundPrice.toString()) })} className='border border-[#3FA0EF] hover:bg-[#3FA0EF] rounded-md px-2'>Subscribe</button>
            </div>
            {isLoading && <ImSpinner9 className='animate-spin ml-2 mt-1' />}
          </div>

        </div>
      }
      <div className="flex justify-between mb-4 items-center">

        <div className="font-medium text-[30px] mx-4 ">
          {userAddress === queryAddress ? 'Your Feed' : 'Feed'}
        </div>

        {userAddress === queryAddress && isCreator === true &&
          <button className='enterButton' onClick={() => setShowInput(!showInput)}>
            {showInput ? 'Hide post' : 'Start a new post'}
          </button>
        }
      </div>
      {showInput && <Input />}
      <div className='my-8'>
        {
          isSubscribed || userAddress === queryAddress ?
            RenderFeed(posts)
            :
            (isCreator === true &&
              <div className={`p-4 border ${darkMode ? 'border-gray-800' : 'border-gray-200'} text-gray-500 shadow-md shadow-gray-500 my-5 rounded-md text-xl text-bold text-center`}>
                <p>Subscribe today for more!</p>
              </div>
            )
        }
      </div>
    </div>
  );
};

export default ProfileFeed; 