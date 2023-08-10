// SPDX-License-Identifier: MIT
pragma solidity =0.8.21;

import "forge-std/Test.sol";
import "src/TesseractProxy.sol";
import "./utils/SigUtils.sol";

contract TesseractProxyTest is Test {
    TesseractProxy public tesseractProxy;

    address public signer;
    uint256 public signerPrivateKey;
    address public spender = address(100);
    uint256 public amount = 5000000000000000000;

    function setUp() public {
        tesseractProxy = new TesseractProxy();

        /// We get signer private keys to be able to sign, signer = (private keys [0] of anvil)
        signerPrivateKey = 0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80;
        signer = vm.addr(signerPrivateKey);
    }

    function test_Approve() public {
        assertEq(tesseractProxy.allowance(signer, spender), 0);
        tesseractProxy.approve(signer, spender, amount);
        assertEq(tesseractProxy.allowance(signer, spender), amount);
    }

    function test_TesseractApprove() public {
        assertEq(tesseractProxy.allowance(signer, spender), 0);

        SigUtils sigUtils = new SigUtils(tesseractProxy.DOMAIN_SEPARATOR());
        bytes memory functionSignature =
            abi.encodeWithSignature("approve(address,address,uint256)", signer, spender, amount);
        SigUtils.MetaTransaction memory metaTransaction =
            SigUtils.MetaTransaction({nonce: 0, from: signer, functionSignature: functionSignature});
        bytes32 digest = sigUtils.getTypedDataHash(metaTransaction);

        vm.prank(signer);

        (uint8 v, bytes32 r, bytes32 s) = vm.sign(signerPrivateKey, digest);

        tesseractProxy.tesseractApprove(metaTransaction.from, metaTransaction.functionSignature, r, s, v);

        assertEq(tesseractProxy.allowance(signer, spender), amount);
    }
}
