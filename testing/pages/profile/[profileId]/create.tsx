import { useRouter } from 'next/router';
import { useConnect, useAccount, useContractRead, usePrepareContractWrite, useContractWrite  } from 'wagmi';
import { useIsMounted } from '../../useIsMounted';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useState, useEffect } from 'react';
import '@rainbow-me/rainbowkit/styles.css';
import {
  getDefaultWallets,
  RainbowKitProvider,
} from '@rainbow-me/rainbowkit';
import { configureChains, createConfig, WagmiConfig } from 'wagmi';
import { mainnet, polygon, optimism, arbitrum } from 'wagmi/chains';
import { alchemyProvider } from 'wagmi/providers/alchemy';
import { publicProvider } from 'wagmi/providers/public';

import SubscriptionService from '../../../../contracts/artifacts/contracts/SubscriptionService.sol/SubscriptionService.json';

const { chains, publicClient } = configureChains(
  [mainnet, polygon, optimism, arbitrum],
  [
    alchemyProvider({ apiKey: process.env.ALCHEMY_ID }),
    publicProvider()
  ]
);

const { connectors } = getDefaultWallets({
  appName: 'My RainbowKit App',
  projectId: 'YOUR_PROJECT_ID',
  chains
});

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient
})

function Create() {
  const mounted = useIsMounted();
  const { address, isConnected } = useAccount();
  const [monthPrice, setMonthPrice] = useState(0);
  const [quarterlyPrice, setQuarterlyAmount] = useState(0);
  useAccount({ onConnect: () => {}})

  function addMonthlyPrice(e) {
    setMonthPrice(e.target.value);
  }

  function addQuarterlyPrice(e) {
    setQuarterlyAmount(e.target.value);
  }

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
  const router = useRouter();
  const { profileId } = router.query;

  const {config } = usePrepareContractWrite({
    address: "0x2645E09ea0dab2B90C0AbC69c2cAF205b4c152f6",
    abi: SubscriptionService.abi,
    functionName: "createSubscription",
    args: [addMonthlyPrice, addQuarterlyPrice],
  })

  const { write } = useContractWrite(config);

  return (
    <div >
      <ConnectButton />
      {mounted ? address && <p>Address {address}</p> : null}
      Cost of 30day subscription
      <input type='number' value={monthPrice} onChange={addMonthlyPrice} className="my-5 mx-5 bg-[#eadc9a] text-black" />
      Cost of 90day subscription
      <input type='number' value={quarterlyPrice} onChange={addQuarterlyPrice} className="my-5 mx-5 bg-[#eadc9a] text-black"/>
      <button onClick={()=>write?.()}>Create Contract</button>
    </div>
  );
}

export default Create;
