// SPDX-License-Identifier: MIT
pragma solidity =0.8.21;

import "./libraries/EIP712.sol";

abstract contract EIP712Domain {
    // solhint-disable-next-line var-name-mixedcase
    bytes32 public DOMAIN_SEPARATOR;
}