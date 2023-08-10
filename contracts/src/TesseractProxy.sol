// SPDX-License-Identifier: MIT
pragma solidity =0.8.21;

import "./libraries/EIP712.sol";
import {EIP712Domain} from "./EIP712Domain.sol";
import {Nonces} from "./Nonces.sol";

contract TesseractProxy is EIP712Domain, Nonces {
    /*
     * Meta transaction structure.
     * No point of including value field here as if user is doing value transfer then he has the funds to pay for gas
     * He should call the desired function directly in that case.
     */
    struct MetaTransaction {
        uint256 nonce;
        address from;
        bytes functionSignature;
    }

    // keccak256("MetaTransaction(uint256 nonce,address from,bytes functionSignature)")
    bytes32 public constant META_TRANSACTION_TYPEHASH =
        0x23d10def3caacba2e4042e0c75d44a42d2558aabcf5ce951d0642a8032e1e653;

    mapping(address => mapping(address => uint256)) public allowance;

    function approve(address owner, address spender, uint256 amount) public virtual returns (bool) {
        allowance[owner][spender] = amount;
        return true;
    }

    function executeMetaTransaction(
        address userAddress,
        bytes memory functionSignature,
        bytes32 sigR,
        bytes32 sigS,
        uint8 sigV
    ) public payable returns (bytes memory) {
        MetaTransaction memory metaTx =
            MetaTransaction({nonce: _nonces[userAddress]++, from: userAddress, functionSignature: functionSignature});

        require(_verify(userAddress, metaTx, sigR, sigS, sigV), "Signer and sig don't match");

        // solhint-disable-next-line avoid-low-level-calls
        (bool success, bytes memory returnData) = address(this).call(abi.encodePacked(functionSignature, userAddress));
        require(success, "Function call not successful");

        return returnData;
    }

    function tesseractApprove(
        address userAddress,
        bytes memory functionSignature,
        bytes32 sigR,
        bytes32 sigS,
        uint8 sigV
    ) public {
        executeMetaTransaction(userAddress, functionSignature, sigR, sigS, sigV);
    }

    function _verify(address signer, MetaTransaction memory metaTx, bytes32 sigR, bytes32 sigS, uint8 sigV)
        internal
        view
        returns (bool)
    {
        require(signer != address(0), "INVALID_SIGNER");

        bytes memory data =
            abi.encode(META_TRANSACTION_TYPEHASH, metaTx.nonce, metaTx.from, keccak256(metaTx.functionSignature));

        return EIP712.recover(DOMAIN_SEPARATOR, sigV, sigR, sigS, data) == signer;
    }
}
