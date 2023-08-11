// SPDX-License-Identifier: MIT
pragma solidity =0.8.21;

import "./ECRecover.sol";

library EIP712 {
    // keccak256("EIP712Domain(string name,string version,address verifyingContract,bytes32 salt)")
    bytes32 public constant EIP712_DOMAIN_TYPEHASH = 0x36c25de3e541d5d970f66e4210d728721220fff5c077cc6cd008b3a0c62adab7;

    /**
     * @notice Make EIP712 domain separator
     * @param name      Contract name
     * @param version   Contract version
     * @return Domain separator
     */
    function makeDomainSeparator(string memory name, string memory version) internal view returns (bytes32) {
        uint256 chainId;
        // solhint-disable-next-line no-inline-assembly
        assembly {
            chainId := chainid()
        }

        return keccak256(
            abi.encode(
                EIP712_DOMAIN_TYPEHASH,
                keccak256(bytes(name)),
                keccak256(bytes(version)),
                address(this),
                bytes32(chainId)
            )
        );
    }

    /**
     * @notice Recover signer's address from a EIP712 signature
     * @param domainSeparator   Domain separator
     * @param sigV              sigV of the signature
     * @param sigR              sigR of the signature
     * @param sigS              sigS of the signature
     * @param typeHashAndData   Type hash concatenated with data
     * @return Signer's address
     */
    function recover(bytes32 domainSeparator, uint8 sigV, bytes32 sigR, bytes32 sigS, bytes memory typeHashAndData)
        internal
        pure
        returns (address)
    {
        bytes32 digest = keccak256(abi.encodePacked("\x19\x01", domainSeparator, keccak256(typeHashAndData)));
        return ECRecover.recover(digest, sigV, sigR, sigS);
    }
}
