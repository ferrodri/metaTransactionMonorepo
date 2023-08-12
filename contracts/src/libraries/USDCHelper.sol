// solhint-disable avoid-low-level-calls
/// SPDX-License-Identifier: MIT
pragma solidity =0.8.21;

import "../interfaces/USDC.sol";

library USDCHelper {
    function executeMetaTransaction(
        address token,
        address userAddress,
        bytes memory functionSignature,
        bytes32 sigR,
        bytes32 sigS,
        uint8 sigV
    ) internal returns (bytes memory) {
        (bool success, bytes memory data) = token.call(
            abi.encodeWithSelector(
                USDC.executeMetaTransaction.selector, userAddress, functionSignature, sigR, sigS, sigV
            )
        );
        require(success, "Error executing metaTransaction");
        return abi.decode(data, (bytes));
    }
}
