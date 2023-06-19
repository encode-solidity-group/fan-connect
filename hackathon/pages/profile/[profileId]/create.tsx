import { useRouter } from 'next/router';
import { useConnect, useAccount, useContractRead, usePrepareContractWrite, useContractWrite } from 'wagmi';
import { useIsMounted } from '../../useIsMounted';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useState, useEffect } from 'react';
import '@rainbow-me/rainbowkit/styles.css';
import {
  getDefaultWallets,
  RainbowKitProvider,
} from '@rainbow-me/rainbowkit';
import { configureChains, createConfig, WagmiConfig } from 'wagmi';
import { mainnet, polygon, optimism, arbitrum, sepolia, auroraTestnet } from 'wagmi/chains';
import { publicProvider } from 'wagmi/providers/public';
import Sidebar from '../../../components/SideBar';
import Link from 'next/link';
import { ImArrowRight2, ImSpinner9 } from 'react-icons/im';




import SubscriptionService from '../../../SubscriptionJson/SubscriptionService.json';

import useDebounce from '../../useDebounce';
import { ethers } from 'ethers';
import useGetContractAddress from '../../../custom hooks/useGetContractAddress';
const APIKEY = "GGGmhjZ76VIhIyzckHe8nMfmUrjPth0C";

const { chains, publicClient, webSocketPublicClient } = configureChains(
  [mainnet, polygon, optimism, arbitrum, sepolia, auroraTestnet],
  [
    // alchemyProvider({ apiKey: APIKEY }),
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
});


function Create() {
  const mounted = useIsMounted();
  const { address } = useAccount();
  const [monthPrice, setMonthPrice] = useState('0');
  const [quarterlyPrice, setQuarterlyAmount] = useState('0');
  const [semiAnnualPrice, setSemiAnnualPrice] = useState('0');
  const [annualPrice, setAnnualPrice] = useState('0');
  const debounceMonthPrice = useDebounce(monthPrice, 500);
  const debounceQuarterPrice = useDebounce(quarterlyPrice, 500);
  const debounceSemiAnnualPrice = useDebounce(semiAnnualPrice, 500);
  const debounceAnnualPrice = useDebounce(annualPrice, 500);

  useAccount({ onConnect: () => { } });

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

  const {contractAddress} = useGetContractAddress();

  const {
    data,
  } = useContractRead({
    address: contractAddress,
    abi: SubscriptionService.abi,
    functionName: "contractFeePercentage",

  });
  const router = useRouter();

  const { config, error } = usePrepareContractWrite({
    address: contractAddress,
    abi: SubscriptionService.abi,
    functionName: "createPage",
    args: [ethers.utils.parseEther(debounceMonthPrice), ethers.utils.parseEther(debounceQuarterPrice), ethers.utils.parseEther(debounceSemiAnnualPrice), ethers.utils.parseEther(debounceAnnualPrice)],
    enabled: Boolean(ethers.utils.parseEther(debounceMonthPrice) && ethers.utils.parseEther(debounceQuarterPrice) && ethers.utils.parseEther(debounceSemiAnnualPrice) && ethers.utils.parseEther(debounceAnnualPrice)),
  });

  console.log("debounceMonthPrice", debounceMonthPrice);

  const { write } = useContractWrite(config);

  return (
    <div className='flex justify-between w-screen sm:ml-175[px] lg:ml-340[px]'>
      <Sidebar />
      <div className='sm:ml-[175px] lg:ml-[340px] w-full'>
        <div className="flex justify-end py-16 mr-16">
          <ConnectButton />
        </div>
        <div className="flex flex-col justify-center items-center space-y-4 mx-12 text-center mt-16">
          <div className="mb-12">
            Create a community page here! Input the prices you'd like your fans to pay for access to your content. Don't worry, you can always change these later <Link href={`/fees/${address}`} className="text-red-400">here.</Link>
          </div>
          <div className="text-xl pb-12">
            User account : {mounted ? address && <p>Address {address}</p> : null}
          </div>
          <div className="flex justify-between items-center ">
            <p className="mx-4">30 day subscription fee</p>
            <ImArrowRight2 size={25} />
            <input type='number' value={monthPrice.toString()} onChange={addMonthlyPrice} className="text-black p-1 rounded-md w-24 mx-4" />
          </div>
          <div className="flex justify-between items-center">
            <p className="mx-4">90 day subscription fee</p>
            <ImArrowRight2 size={25} />
            <input type='number' value={quarterlyPrice.toString()} onChange={addQuarterlyPrice} className="text-black p-1 rounded-md w-24 mx-4 " />
          </div>
          <div className="flex justify-between items-center">
            <p className="mx-2">6 month subscription fee</p>
            <ImArrowRight2 size={25} />
            <input type='number' value={semiAnnualPrice.toString()} onChange={addSemiAnnualPrice} className="text-black p-1 rounded-md w-24 mx-4 " />
          </div>
          <div className="flex justify-between items-center pb-12">
            <p className="mx-4">1 year subscription fee</p>
            <ImArrowRight2 size={25} />
            <input type='number' value={annualPrice.toString()} onChange={addAnnualPrice} className="text-black p-1 rounded-md w-24 mx-4  " />
          </div>
          <button disabled={!write} onClick={() => write?.()} className="enterButton">Create Contract</button>
        </div>
      </div>
    </div>
  );
}

export default Create;
