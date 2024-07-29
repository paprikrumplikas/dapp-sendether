//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import {Transactions} from "../src/Transactions.sol";
import {Script} from "forge-std/Script.sol";
import {console} from "forge-std/console.sol";

contract Helperconfig is Script {
    uint256 public DEFAULT_ANVIL_KEY = 0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80;

    struct NetworkConfig {
        uint256 deployerKey;
    }

    NetworkConfig public activeNetworkConfig; // public so we get a getter

    constructor() {
        if (block.chainid == 11155111) {
            activeNetworkConfig = getSepoliaEthConfig();
        } else if (block.chainid == 1) {
            activeNetworkConfig = getMainEthConfig();
        } else {
            activeNetworkConfig = getOrCreateAnvilEthConfig();
        }
    }

    function getSepoliaEthConfig() public returns (NetworkConfig memory) {
        return NetworkConfig({
            deployerKey: vm.envUint("PRIVATE_KEY") //in order for out tests to work, we have to be the owner of the xxx address. In the vm.startBroadcast statements, we can pass a private key we want to use. We define that here by getting it from the -env file.
        });
    }

    function getMainEthConfig() public returns (NetworkConfig memory) {
        return NetworkConfig({
            deployerKey: vm.envUint("PRIVATE_KEY") //in order for out tests to work, we have to be the owner of the xxx address. In the vm.startBroadcast statements, we can pass a private key we want to use. We define that here by getting it from the -env file.
        });
    }

    function getOrCreateAnvilEthConfig() public returns (NetworkConfig memory) {
        if (activeNetworkConfig.deployerKey != 0) {
            return activeNetworkConfig; //if we get here, the function returns, the rest of the code does not get executed
        }

        vm.startBroadcast();
        // nothing here
        vm.stopBroadcast();

        return NetworkConfig({
            deployerKey: DEFAULT_ANVIL_KEY //this is gonna be the default anvil key
        });
    }
}
