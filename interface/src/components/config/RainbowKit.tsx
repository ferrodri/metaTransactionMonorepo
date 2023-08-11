import {
    connectorsForWallets,
    RainbowKitProvider,
} from '@rainbow-me/rainbowkit';
import '@rainbow-me/rainbowkit/styles.css';
import {
    argentWallet,
    braveWallet,
    coinbaseWallet,
    injectedWallet,
    ledgerWallet,
    metaMaskWallet,
    rainbowWallet,
    trustWallet,
    walletConnectWallet,
} from '@rainbow-me/rainbowkit/wallets';
import { ALCHEMY_KEY, CHAIN_ID, IS_CLIENT } from 'config';
import type { ReactNode } from 'react';
import { Chain } from 'types';
import { configureChains, createClient, WagmiConfig } from 'wagmi';
import { hardhat, polygon, polygonMumbai } from 'wagmi/chains';
import { alchemyProvider } from 'wagmi/providers/alchemy';
import { jsonRpcProvider } from 'wagmi/providers/jsonRpc';

const needsInjectedWallet =
    IS_CLIENT &&
    window.ethereum &&
    !window.ethereum.isMetaMask &&
    !window.ethereum.isCoinbaseWallet;

const { chains, provider } = configureChains(
    [CHAIN_ID === Chain.Polygon ? polygon : CHAIN_ID === Chain.PolygonMumbai ? polygonMumbai : hardhat ],
    [
        alchemyProvider({
            apiKey: ALCHEMY_KEY,
        }),
        jsonRpcProvider({
            rpc: () => ({
                http: 'http://127.0.0.1:8545/',
            }),
        })
    ]
);

const connectors = connectorsForWallets([
    {
        groupName: 'Suggested',
        wallets: [
            metaMaskWallet({ chains }),
            braveWallet({ chains, shimDisconnect: true }),
            coinbaseWallet({ appName: 'metatransaction', chains }),
            walletConnectWallet({ chains }),
            rainbowWallet({ chains }),
            ...(needsInjectedWallet ? [injectedWallet({ chains })] : []),
        ],
    },
    {
        groupName: 'Other',
        wallets: [
            ledgerWallet({ chains }),
            trustWallet({ chains, shimDisconnect: true }),
            argentWallet({ chains }),
        ],
    },
]);

const wagmiClient = createClient({
    autoConnect: IS_CLIENT,
    connectors,
    provider,
});

export default function RainbowKit({ children }: { children: ReactNode }) {
    return (
        <WagmiConfig client={wagmiClient}>
            <RainbowKitProvider chains={chains} modalSize="compact">
                {children}
            </RainbowKitProvider>
        </WagmiConfig>
    );
}
