import { Key, useEffect, useState } from 'react'
import { useContractRead } from 'wagmi';
import contractJson from '../../SubscriptionJson/SubscriptionService.json';
import { SiEthereum } from "react-icons/si";
import useGetContractAddress from '../../custom hooks/useGetContractAddress';

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
          <div key={index} className='flex flex-col items-center justify-center'>
            <div className='text-xl'>{interval} Days</div>
            <div className='flex items-center text-center'>{parsedPrice} <SiEthereum /></div>
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
        <div className='flex justify-center gap-8'>
          {creatorFees()}
        </div>
      </div>
    </div>
  )
}
