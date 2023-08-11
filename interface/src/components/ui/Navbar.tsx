import { ConnectButton } from '@rainbow-me/rainbowkit';

export default function Navbar() {
    return (
        <header className="flex justify-end sticky top-0 z-10 w-full border-b border-b-neutral-800" >
            <ConnectButton showBalance={false} />
        </header>
    );
}
