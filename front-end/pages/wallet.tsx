import { useAccount, useContractRead  } from 'wagmi';
import { useIsMounted } from './useIsMounted';
import { ConnectButton } from '@rainbow-me/rainbowkit';

import SubscriptionService from '../SubscriptionJson/SubscriptionService.json';
import useGetContractAddress from '../custom hooks/useGetContractAddress';


function Wallet() {
  const mounted = useIsMounted();
  const { address } = useAccount();
  const {contractAddress} = useGetContractAddress();

  const {
    data,
    isLoading,
    isSuccess,
  } = useContractRead({
    address: contractAddress,
    abi: SubscriptionService.abi,
    functionName: "contractFeePercentage",

  })
  console.log("eheanlf", data );

  return (
    <div>
      <ConnectButton />
      {mounted ? address && <p>Address {address}</p> : null}
    </div>
  );
}

export default Wallet;