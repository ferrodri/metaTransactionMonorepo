// SPDX-License-Identifier: MIT
pragma solidity =0.8.21;

import "./libraries/USDCHelper.sol";

contract TesseractProxy {
    function tesseractApprove(
        address userAddress,
        bytes memory functionSignature,
        bytes32 sigR,
        bytes32 sigS,
        uint8 sigV
    ) public returns (bytes memory) {
        address usdc = 0x0FA8781a83E46826621b3BC094Ea2A0212e71B23;
        return USDCHelper.executeMetaTransaction(usdc, userAddress, functionSignature, sigR, sigS, sigV);
    }
}
