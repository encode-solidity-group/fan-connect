import { useRouter } from 'next/router';
import { useConnect, useAccount, useContractRead, usePrepareContractWrite, useContractWrite  } from 'wagmi';
import { useIsMounted } from '../../useIsMounted';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useState, useEffect, use } from 'react';
import '@rainbow-me/rainbowkit/styles.css';
import {
  getDefaultWallets,
  RainbowKitProvider,
} from '@rainbow-me/rainbowkit';
import { configureChains, createConfig, WagmiConfig } from 'wagmi';
import { mainnet, polygon, optimism, arbitrum, sepolia } from 'wagmi/chains';
import { alchemyProvider } from 'wagmi/providers/alchemy';
import { publicProvider } from 'wagmi/providers/public';

import SubscriptionService from '../../../SubscriptionJson/SubscriptionService.json';

import useDebounce from '../../useDebounce'
const APIKEY = "GGGmhjZ76VIhIyzckHe8nMfmUrjPth0C"

const { chains, publicClient, webSocketPublicClient } = configureChains(
  [mainnet, polygon, optimism, arbitrum, sepolia],
  [
    alchemyProvider({ apiKey: APIKEY }),
    publicProvider()
  ]
);

const { connectors } = getDefaultWallets({
  appName: 'FanConnect',
  projectId: 'YOUR_PROJECT_ID',
  chains
});

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
  webSocketPublicClient,
})


function Create() {
  const mounted = useIsMounted();
  const { address, isConnected } = useAccount();
  const [monthPrice, setMonthPrice] = useState(0);
  const [quarterlyPrice, setQuarterlyAmount] = useState(0);
  const [semiAnnualPrice, setSemiAnnualPrice] = useState(0);
  const [annualPrice, setAnnualPrice] = useState(0);
  const debounceMonthPrice = useDebounce(monthPrice, 500);
  const debounceQuarterPrice = useDebounce(quarterlyPrice, 500);
  const debounceSemiAnnualPrice = useDebounce(semiAnnualPrice, 500);
  const debounceAnnualPrice = useDebounce(annualPrice, 500);

  useAccount({ onConnect: () => {}})

  function addMonthlyPrice(e) {
    setMonthPrice(e.target.value);
  }

  function addQuarterlyPrice(e) {
    setQuarterlyAmount(e.target.value);
  }

  function addSemiAnnualPrice(e) {
    setSemiAnnualPrice(e.target.value);
  }

  function addAnnualPrice(e) {
    setAnnualPrice(e.target.value);
  }

  useEffect(() => {
    if (address) {
      const profileUrl = `/profile/${address}/create`;
      router.replace(profileUrl);
    }
  }, [address]);

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

  const {config, error } = usePrepareContractWrite({
    address: "0x2645E09ea0dab2B90C0AbC69c2cAF205b4c152f6",
    abi: SubscriptionService.abi,
    functionName: "createPage",
    args: [debounceMonthPrice, debounceQuarterPrice, debounceSemiAnnualPrice, debounceAnnualPrice],
    enabled: Boolean(debounceMonthPrice && debounceQuarterPrice && debounceSemiAnnualPrice && debounceAnnualPrice),
  })

  console.log("debounceMonthPrice", debounceMonthPrice);

  const { write } = useContractWrite(config);

  // TODO: MAKE SURE BUTTON WORKS

  return (
    <div >
      <ConnectButton />
      {mounted ? address && <p>Address {address}</p> : null}
      Cost of 30day subscription
      <input type='number' value={monthPrice} onChange={addMonthlyPrice} className="my-5 mx-5 bg-[#eadc9a] text-black" />
      Cost of 90day subscription
      <input type='number' value={quarterlyPrice} onChange={addQuarterlyPrice} className="my-5 mx-5 bg-[#eadc9a] text-black"/>
      <input type='number' value={semiAnnualPrice} onChange={addSemiAnnualPrice} className="my-5 mx-5 bg-[#eadc9a] text-black"/>
      <input type='number' value={annualPrice} onChange={addAnnualPrice} className="my-5 mx-5 bg-[#eadc9a] text-black"/>
      <button disabled={!write} onClick={() => write?.()}>Create Contract</button>
      {error && (
        <div>An error occurred preparing the transaction: {error.message}</div>
      )}
    </div>
  );
}

export default Create;
