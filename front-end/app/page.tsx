'use client';
import Image from 'next/image';
import Link from 'next/link';
import './styles/glass.css';
import './styles/button.css';
import './styles/slider.css';
import './styles/typewriter.css';
// import '../styles/globals.css';
import '@rainbow-me/rainbowkit/styles.css';
import { getDefaultWallets, RainbowKitProvider } from '@rainbow-me/rainbowkit';
import type { AppProps } from 'next/app';
import { configureChains, createConfig, WagmiConfig } from 'wagmi';
import { arbitrum, goerli, mainnet, optimism, polygon,sepolia, pulsechain } from 'wagmi/chains';
import { publicProvider } from 'wagmi/providers/public';

const { chains, publicClient, webSocketPublicClient } = configureChains(
  [
    mainnet,
    goerli,
    sepolia,
    polygon,
    optimism,
    arbitrum,
    pulsechain,
    ...(process.env.NEXT_PUBLIC_ENABLE_TESTNETS === 'true' ? [goerli] : []),
  ],
  [publicProvider()]
);

const { connectors } = getDefaultWallets({
  appName: 'Fan Connect',
  projectId: 'YOUR_PROJECT_ID',
  chains,
});

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
  webSocketPublicClient,
});


export default function Home() {
  return (
    <WagmiConfig config={wagmiConfig}>
    <RainbowKitProvider chains={chains}>
        <main>
          <div className="flex px-5 py-5 ">
            <div className="relative flex py-12">
              <div className="glassMorph relative z-10 flex py-24">
                <p className="z-10 flex">
            // FANCONNECT is a platform for creators to share
                  <br />
                  their content with their community.
                  <br />
              // As a network, promoting interaction between fans and creators.
                </p>
              </div>
              <div className="flex justify-center items-center absolute z-1 top-24 right-0   ">
                <Image className="" src="/otherpic.jpg" alt="redImage" width={500} height={300} />
              </div>
            </div>
          </div>
          <div className="justify-end z-1 top-96 right-24 absolute flex basis-1/3 position:fixed">
            <Image className="" src="/redImage.png" alt="redImage" width={500} height={300} />
          </div>
          <div className="glassMorph">
            <div className="mx-48 -mt-4 py-20 flex items-center justify-between">
              <Link href="/create">
                <button>
                  <div className="base">Discover More</div>
                  <div className="onHover">Create Profile</div>
                </button>
              </Link>
              <div>
                <p>
                  Connect your wallet to follow your favorite
                  <br />
                  creators and customize your profile.
                </p>
              </div>
            </div>
          </div>
          <div className="slider mt-44 glassMorph">
            <div className="slide-track">
              <div className="slide">
                <Image src="/redImage.png" alt="redImage" width={125} height={75} className="mr-[25px] rounded-md" />
                <Image src="/redImage.png" alt="redImage" width={125} height={75} className="mr-[25px]  rounded-md" />
                <Image src="/redImage.png" alt="redImage" width={125} height={75} className="mr-[25px] rounded-md" />
                <Image src="/redImage.png" alt="redImage" width={125} height={75} className="mr-[25px] rounded-md" />
                <Image src="/redImage.png" alt="redImage" width={125} height={75} className="mr-[25px]  rounded-md" />
                <Image src="/redImage.png" alt="redImage" width={125} height={75} className="mr-[25px]  rounded-md" />
                <Image src="/redImage.png" alt="redImage" width={125} height={75} className="mr-[25px]  rounded-md" />
                <Image src="/redImage.png" alt="redImage" width={125} height={75} className="mr-[25px] rounded-md" />
                <Image src="/redImage.png" alt="redImage" width={125} height={75} className="mr-[25px] rounded-md" />
                <Image src="/redImage.png" alt="redImage" width={125} height={75} className="mr-[25px] rounded-md" />
                <Image src="/redImage.png" alt="redImage" width={125} height={75} className="mr-[25px] rounded-md" />
                <Image src="/redImage.png" alt="redImage" width={125} height={75} className="mr-[25px] rounded-md" />
                <Image src="/redImage.png" alt="redImage" width={125} height={75} className="mr-[25px] rounded-md" />
                <Image src="/redImage.png" alt="redImage" width={125} height={75} className="mr-[25px] rounded-md" />
                <Image src="/redImage.png" alt="redImage" width={125} height={75} className="mr-[25px] rounded-md" />
                <Image src="/redImage.png" alt="redImage" width={125} height={75} className="mr-[25px] rounded-md" />
                <Image src="/redImage.png" alt="redImage" width={125} height={75} className="mr-[25px] rounded-md" />
                <Image src="/redImage.png" alt="redImage" width={125} height={75} className="mr-[25px] rounded-md" />
                <Image src="/redImage.png" alt="redImage" width={125} height={75} className="mr-[25px] rounded-md" />
                <Image src="/redImage.png" alt="redImage" width={125} height={75} className="mr-[25px] rounded-md" />
                <Image src="/redImage.png" alt="redImage" width={125} height={75} className="mr-[25px] rounded-md" />
                <Image src="/redImage.png" alt="redImage" width={125} height={75} className="mr-[25px] rounded-md" />
                <Image src="/redImage.png" alt="redImage" width={125} height={75} className="mr-[25px] rounded-md" />
                <Image src="/redImage.png" alt="redImage" width={125} height={75} className="mr-[25px] rounded-md" />
                <Image src="/redImage.png" alt="redImage" width={125} height={75} className="mr-[25px] rounded-md" />
                <Image src="/redImage.png" alt="redImage" width={125} height={75} className="mr-[25px]  rounded-md" />
                <Image src="/redImage.png" alt="redImage" width={125} height={75} className="mr-[25px] rounded-md" />
                <Image src="/redImage.png" alt="redImage" width={125} height={75} className="mr-[25px]  rounded-md" />
                <Image src="/redImage.png" alt="redImage" width={125} height={75} className="mr-[25px] rounded-md" />
                <Image src="/redImage.png" alt="redImage" width={125} height={75} className="mr-[25px] rounded-md" />
              </div>
            </div>
          </div>
        </main>
        </RainbowKitProvider>
    </WagmiConfig>
  );
}