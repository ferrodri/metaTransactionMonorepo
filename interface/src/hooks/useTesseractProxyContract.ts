import { useNetwork } from 'wagmi';

interface TesseractProxyContractMap {
    [chainId: number]: string;
}

export function useTesseractProxyContract(): `0x${string}` | undefined {
    const { chain } = useNetwork();

    const tesseractProxyContract: TesseractProxyContractMap = {
        31337: '0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512',
        80001: '0x09c733b8b2a5fb8f33110c52cb22eecd88c06e69',
    };

    const contractAddress = chain?.id ? tesseractProxyContract[chain.id] : undefined;

    return contractAddress ? contractAddress as `0x${string}` : undefined;
}