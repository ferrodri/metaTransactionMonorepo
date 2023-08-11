// SPDX-License-Identifier: MIT
pragma solidity =0.8.21;

library ECRecover {
    /**
     * @notice Recover signer's address from a signed message
     * @param digest    Keccak-256 hash digest of the signed message
     * @param sigV        sigV of the signature
     * @param sigR         sigR of the signature
     * @param sigS        sigS of the signature
     * @return Signer address
     */
    function recover(bytes32 digest, uint8 sigV, bytes32 sigR, bytes32 sigS) internal pure returns (address) {
        // EIP-2 still allows signature malleability for ecrecover(). Remove this possibility and make the signature
        // unique. Appendix F in the Ethereum Yellow paper (https://ethereum.github.io/yellowpaper/paper.pdf), defines
        // the valid range for sigS in (281): 0 < sigS < secp256k1n ÷ 2 + 1, and for sigV in (282): sigV ∈ {27, 28}. Most
        // signatures from current libraries generate a unique signature with an sigS-value in the lower half order.
        //
        // If your library generates malleable signatures, such as sigS-values in the upper range, calculate a new sigS-value
        // with 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFEBAAEDCE6AF48A03BBFD25E8CD0364141 - s1 and flip sigV from 27 to 28 or
        // vice versa. If your library also generates signatures with 0/1 for sigV instead 27/28, add 27 to sigV to accept
        // these malleable signatures as well.
        if (uint256(sigS) > 0x7FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF5D576E7357A4501DDFE92F46681B20A0) {
            revert("Invalid signature 's' value");
        }

        if (sigV != 27 &&sigV != 28) {
            revert("Invalid signature 'v' value");
        }

        // If the signature is valid (and not malleable), return the signer address
        address signer = ecrecover(digest,sigV, sigR, sigS);
        require(signer != address(0), "ECRecover: invalid signature");

        return signer;
    }
}
