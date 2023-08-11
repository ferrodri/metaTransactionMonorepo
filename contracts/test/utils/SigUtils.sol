// solhint-disable func-param-name-mixedcase
// solhint-disable var-name-mixedcase
// SPDX-License-Identifier: MIT
pragma solidity =0.8.21;

contract SigUtils {
    struct MetaTransaction {
        uint256 nonce;
        address from;
        bytes functionSignature;
    }

    bytes32 public DOMAIN_SEPARATOR;

    //keccak256("MetaTransaction(uint256 nonce,address from,bytes functionSignature)")
    bytes32 public constant META_TRANSACTION_TYPEHASH =
        0x23d10def3caacba2e4042e0c75d44a42d2558aabcf5ce951d0642a8032e1e653;

    constructor(bytes32 _DOMAIN_SEPARATOR) {
        DOMAIN_SEPARATOR = _DOMAIN_SEPARATOR;
    }

    /// computes the hash of the fully encoded EIP-712 message for the domain, which can be used to recover the signer
    function getTypedDataHash(MetaTransaction memory _metaTransaction) public view returns (bytes32) {
        return keccak256(abi.encodePacked("\x19\x01", DOMAIN_SEPARATOR, _getStructHash(_metaTransaction)));
    }

    function _getStructHash(MetaTransaction memory _metaTransaction) internal pure returns (bytes32) {
        return keccak256(
            abi.encode(
                META_TRANSACTION_TYPEHASH,
                _metaTransaction.nonce,
                _metaTransaction.from,
                keccak256(_metaTransaction.functionSignature)
            )
        );
    }
}
