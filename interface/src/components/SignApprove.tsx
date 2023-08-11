import { ethers } from 'ethers';
import {
    useAccount,
    useContractReads,
    useContractWrite,
    useNetwork,
    useSigner,
} from 'wagmi';
import { useTesseractProxyContract } from '../hooks/useTesseractProxyContract';
import TESSERACTPROXYABI from '../shared/abi/TesseractProxy.json';

export function SignApprove(): JSX.Element {
    const amount = '5000000000000000000';
    const spender = '0x0000000000000000000000000000000000000064';
    const TesseractProxyContract = useTesseractProxyContract();
    const { address } = useAccount();
    const { data: signer } = useSigner();
    const { chain } = useNetwork();

    const { writeAsync } = useContractWrite({
        mode: 'recklesslyUnprepared',
        address: TesseractProxyContract,
        abi: TESSERACTPROXYABI,
        functionName: 'tesseractApprove',
    });

    const { data } = useContractReads({
        contracts: [
            {
                address: TesseractProxyContract,
                abi: TESSERACTPROXYABI,
                functionName: 'allowance',
                args: [address, spender],
            },
            {
                address: TesseractProxyContract,
                abi: TESSERACTPROXYABI,
                functionName: 'name',
            },
            {
                address: TesseractProxyContract,
                abi: TESSERACTPROXYABI,
                functionName: 'EIP712_VERSION',
            },
        ],
        watch: true,
    });
    const allowance = data?.[0] || '0';
    const tokenName = data?.[1];
    const version = data?.[2];

    function getFunctionSignature(): string {
        const iface = new ethers.utils.Interface([
            'function approve(address,address,uint256)',
        ]);
        return iface.encodeFunctionData('approve', [
            address,
            spender,
            ethers.BigNumber.from(amount),
        ]);
    }

    async function signedTypeData(): Promise<void> {
        const { types, domain, message } = createSignature();

        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        const flatSig = await signer._signTypedData(domain, types, message);

        const {
            v: sigV,
            r: sigR,
            s: sigS,
        } = ethers.utils.splitSignature(flatSig);
        const tx = await writeAsync({
            recklesslySetUnpreparedArgs: [
                address,
                getFunctionSignature(),
                sigR,
                sigS,
                sigV,
            ],
        });
        await tx.wait();
    }

    function createSignature(): {
            types: Record<string, { name: string; type: string }[]>,
            domain: {
                name: string;
                version: string;
                salt: string;
                verifyingContract: string;
            },
            message: { 
                nonce: number; from: string; functionSignature: string 
            }} 
    {
        const message = {
            nonce: 0,
            from: address,
            functionSignature: getFunctionSignature(),
        };

        const typedData = {
            types: {
                MetaTransaction: [
                    {
                        name: 'nonce',
                        type: 'uint256',
                    },
                    {
                        name: 'from',
                        type: 'address',
                    },
                    {
                        name: 'functionSignature',
                        type: 'bytes',
                    },
                ],
            },
            domain: {
                name: tokenName || '',
                version: version,
                salt: ethers.utils.hexZeroPad(
                    ethers.utils.hexlify(chain?.id || 137),
                    32
                ),
                verifyingContract: TesseractProxyContract,
            },
            message: message,
        };

        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        return typedData;
    }

    return (
        <div className="flex flex-col items-center justify-center">
            <span className="font-bold mb-16">Current allowance: {allowance.toString()}</span>
            <button 
                onClick={signedTypeData} 
                className="border-1 rounded-lg font-bold bg-blue-900 px-2 py-5 w-fit">
                Sign gassless approve
            </button>
        </div>
    );
}
