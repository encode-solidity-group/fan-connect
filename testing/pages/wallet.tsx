import { useAccount, useContractRead  } from 'wagmi';
import { useIsMounted } from './useIsMounted';
import { ConnectButton } from '@rainbow-me/rainbowkit';

import SubscriptionService from '../../contracts/artifacts/contracts/SubscriptionService.sol/SubscriptionService.json';


function Wallet() {
  const mounted = useIsMounted();
  const { address } = useAccount();

  const {
    data,
    isLoading,
    isSuccess,
  } = useContractRead({
    address: "0x2645E09ea0dab2B90C0AbC69c2cAF205b4c152f6",
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