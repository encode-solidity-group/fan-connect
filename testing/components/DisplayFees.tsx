import { useRouter } from 'next/router';
import { Key, useEffect, useState } from 'react'
import { useContractRead } from 'wagmi';
import contractJson from '../SubscriptionJson/SubscriptionService.json';
import { SiEthereum } from "react-icons/si";
import { ImArrowRight2 } from 'react-icons/im';

export default function DisplayFees() {
  const router = useRouter();
  const { creatorAddress } = router.query;

  const [queryAddress, setQueryAddress] = useState<string | string[]>();

  const subscriptionIntervals = [30, 90, 180, 365];
  const [creatorPrices, setCreatorPrices] = useState<any>();

  useEffect(() => {

    if (creatorAddress) {
      setQueryAddress(creatorAddress);
    }
  }, [creatorAddress]);

  const { data: creatorStruct } = useContractRead({
    address: '0x2645E09ea0dab2B90C0AbC69c2cAF205b4c152f6',
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
          <p key={index} className='flex justify-center items-center'>
            {interval} day price <ImArrowRight2 className='mx-2'/> {parsedPrice} <SiEthereum/>
          </p>
        );
      });
  };

  return (
    <div className="text-center my-16 space-y-4">
      <p className='text-xl'>Subscription Fees for:
        <br/>
        {queryAddress}
      </p>
      <div className='space-y-4'>
        {creatorFees()}
      </div>
    </div>
  )
}
