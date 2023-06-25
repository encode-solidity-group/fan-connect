import '../styles/globals.css';
import '@rainbow-me/rainbowkit/styles.css';
import { getDefaultWallets, RainbowKitProvider } from '@rainbow-me/rainbowkit';
import type { AppProps } from 'next/app';
import { configureChains, createConfig, WagmiConfig } from 'wagmi';
import { sepolia, auroraTestnet, aurora } from 'wagmi/chains';
import { publicProvider } from 'wagmi/providers/public';
import { RainbowKitSiweNextAuthProvider } from '@rainbow-me/rainbowkit-siwe-next-auth';
import { SessionProvider } from 'next-auth/react';
import '../styles/glass.css';
import '../styles/buttons.css';
import '../styles/slider.css';
import '../styles/typewriter.css';
import UserAddressProvider from '../providers/UserAddressProvider';
import QueryAddressProvider from '../providers/QueryAddressProvider';
import DarkModeProvider from '../providers/DarkModeProvider';
import SearchProvider from '../providers/SearchProvider';

const { chains, publicClient, webSocketPublicClient } = configureChains(
  [aurora, auroraTestnet, sepolia], [publicProvider()]
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

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <WagmiConfig config={wagmiConfig}>
      <SessionProvider refetchInterval={0} session={pageProps.session}>
        <RainbowKitSiweNextAuthProvider>
          <RainbowKitProvider chains={chains}>
            <UserAddressProvider>
              <QueryAddressProvider>
                <DarkModeProvider>
                  <SearchProvider>
                    <Component {...pageProps} />
                  </SearchProvider>
                </DarkModeProvider>
              </QueryAddressProvider>
            </UserAddressProvider>
          </RainbowKitProvider>
        </RainbowKitSiweNextAuthProvider>
      </SessionProvider>
    </WagmiConfig>
  );
}

export default MyApp;
