import { useRouter } from 'next/router';
import { Key, useEffect, useState } from 'react'
import { useContractRead } from 'wagmi';
import contractJson from '../SubscriptionJson/SubscriptionService.json';

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
        <p key={index}>
          {interval} day price: {parsedPrice}
        </p>
      );
    });
  };

  return (
    <div className="text-center">
      <p>Subscription Fees for {queryAddress}</p>
      {creatorFees()}
    </div>
  )
}
