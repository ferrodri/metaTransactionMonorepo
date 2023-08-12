/// SPDX-License-Identifier: MIT
pragma solidity =0.8.21;

interface USDC {
    function executeMetaTransaction(
        address userAddress,
        bytes memory functionSignature,
        bytes32 sigR,
        bytes32 sigS,
        uint8 sigV
    ) external payable returns (bytes memory);
}
