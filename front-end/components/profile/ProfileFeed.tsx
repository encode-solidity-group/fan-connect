import React, { useContext, useEffect, useState } from 'react';
import { onSnapshot, collection, query, orderBy, DocumentData, where } from 'firebase/firestore';
import { db } from '../../firebase';
import { useContractRead, useContractWrite } from 'wagmi';
import { BigNumber, ethers } from 'ethers';
import contractJson from '../../SubscriptionJson/SubscriptionService.json';
import ChangeFeeButton from './ChangeFeeButton';
import useGetContractAddress from '../../custom hooks/useGetContractAddress';
import SubscriptionLength from '../SubscriptionLength';
import { SiEthereum } from 'react-icons/si';
import { UserAddressContext } from '../../providers/UserAddressProvider';
import { QueryAddressContext } from '../../providers/QueryAddressProvider';
import { RenderFeed } from '../RenderFeed';

const ProfileFeed = () => {
  const { userAddress } = useContext(UserAddressContext);
  const { queryAddress } = useContext(QueryAddressContext);
  const { contractAddress } = useGetContractAddress();

  const [foundPrice, setFoundPrice] = useState<BigNumber>(ethers.constants.Zero);
  const [posts, setPosts] = useState<DocumentData[]>([]);

  const [daysSubscribed, setDaysSubscribed] = useState<number>(30);

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
  });

  const { write: subscribeWrite } = useContractWrite({
    address: contractAddress,
    abi: contractJson.abi,
    functionName: 'payForSubscription',
    args: [queryAddress, daysSubscribed],
  });

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

  return (
    <div className="min-h-screen py-4 mx-auto sm:w-[600px]">
      <div className='text-center mb-4'>
        <ChangeFeeButton />
      </div>
      <div className="font-medium text-[16px] px-4 py-2 flex justify-center mb-5">
        <SubscriptionLength creator={queryAddress} user={userAddress} />
      </div>
      {(userAddress !== queryAddress) &&
        <div className="flex justify-center mx-5 items-start">
          <select
            value={daysSubscribed}
            onChange={(event) => handleDaysChange(event)}
            className="mx-5 mb-16 border rounded-md text-black"
          >
            <option value="30">30 Days</option>
            <option value="90">90 Days</option>
            <option value="180">180 Days</option>
            <option value="365">365 Days</option>
          </select>

          <div className="mr-6 flex items-center">Price: {ethers.utils.formatUnits(foundPrice)} <SiEthereum /></div>

          <div>
            <button onClick={() => subscribeWrite({ value: BigInt(foundPrice.toString()) })} className='border border-[#3FA0EF] rounded-md px-2'>Subscribe</button>
          </div>

        </div>
      }
      <div className="flex justify-evenly mb-4">
        <div className='mr-2 text-[24px] text-[#3FA0EF]'>
          {userAddress === queryAddress ? 'Your Feed' : 'Feed'}
        </div>
      </div>
      <div className='my-8'>
        {
          isSubscribed || userAddress === queryAddress ?
            RenderFeed(posts)
            :
            <div className='p-4 border my-5 rounded-md text-xl text-bold text-center'>
              <p>Subscribe today for more!</p>
            </div>
        }
      </div>
    </div>
  );
};

export default ProfileFeed; 