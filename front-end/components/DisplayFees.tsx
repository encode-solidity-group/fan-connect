import { useRouter } from 'next/router';
import { Key, useEffect, useState } from 'react'
import { useContractRead } from 'wagmi';
import contractJson from '../SubscriptionJson/SubscriptionService.json';
import { SiEthereum } from "react-icons/si";
import useGetContractAddress from '../custom hooks/useGetContractAddress';

interface PageProps {
  queryAddress: string | string[] | undefined;
}

export default function DisplayFees({ queryAddress }: PageProps) {

  const subscriptionIntervals = [30, 90, 180, 365];
  const [creatorPrices, setCreatorPrices] = useState<any>();

  const { contractAddress } = useGetContractAddress();

  const { data: creatorStruct } = useContractRead({
    address: contractAddress,
    abi: contractJson.abi,
    functionName: 'creators',
    args: [queryAddress],
    watch: true,
  })

  useEffect(() => {
    if (creatorStruct) {
      setCreatorPrices(creatorStruct);
    }
  }, [creatorStruct])

  const creatorFees = () => {
    if (creatorPrices)
      return creatorPrices.map((price: any, index: Key) => {
        const parsedPrice = Number(price) / 10 ** 18;
        const interval = subscriptionIntervals[Number(index)];

        return (
          <div key={index} className='flex items-center justify-center'>
            {interval} day price: {parsedPrice} <SiEthereum />
          </div>
        );
      });
  };

  return (
    <div className="text-center my-8 space-y-4">
      <p className='text-xl'>Subscription Fees for:
        <br />
        {queryAddress}
      </p>
      <div className='space-y-4'>
        {creatorFees()}
      </div>
    </div>
  )
}
