import { useNetwork } from 'wagmi';

interface TesseractProxyContractMap {
    [chainId: number]: string;
}

export function useTesseractProxyContract(): `0x${string}` | undefined {
    const { chain } = useNetwork();

    const tesseractProxyContract: TesseractProxyContractMap = {
        80001: '0x6a61a1231a3118dff17b31e4fb6271deb7df2ee4'
    };

    const contractAddress = chain?.id ? tesseractProxyContract[chain.id] : undefined;

    return contractAddress ? contractAddress as `0x${string}` : undefined;
}