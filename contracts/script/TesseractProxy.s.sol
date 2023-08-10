/// SPDX-License-Identifier: MIT
pragma solidity =0.8.21;

import "forge-std/Script.sol";
import "src/TesseractProxy.sol";

contract DeployTesseractProxy is Script {
    TesseractProxy public tesseractProxy;

    function run() public {
        vm.startBroadcast();

        tesseractProxy = new TesseractProxy();

        vm.stopBroadcast();
    }
}
