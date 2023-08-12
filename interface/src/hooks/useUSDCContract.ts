import { useNetwork } from 'wagmi';

interface USDCContractMap {
    [chainId: number]: string;
}

export function useUSDCContract(): `0x${string}` | undefined {
    const { chain } = useNetwork();

    const USDCContract: USDCContractMap = {
        80001: '0x0fa8781a83e46826621b3bc094ea2a0212e71b23',
    };

    const contractAddress = chain?.id ? USDCContract[chain.id] : undefined;

    return contractAddress ? contractAddress as `0x${string}` : undefined;
}