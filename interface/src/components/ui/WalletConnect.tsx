import { useAccount } from 'wagmi';
import { shortenAddress } from 'utils/address';
import { useConnectModal } from '@rainbow-me/rainbowkit';

export default function WalletConnect() {
    const { address } = useAccount();
    const { openConnectModal } = useConnectModal();

    if (!address) {
        return (
            <button onClick={openConnectModal} className="px-4 py-3">
                Connect wallet
            </button>
        );
    }

    return <div>{shortenAddress(address)}</div>;
}
