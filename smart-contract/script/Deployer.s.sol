//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import {Transactions} from "../src/Transactions.sol";
import {Script} from "forge-std/Script.sol";
import {console} from "forge-std/console.sol";
import {Helperconfig} from "./Helperconfig.s.sol";

contract Deployer is Script {
    Transactions transactions;
    Helperconfig helperconfig;

    function run() public returns (address) {
        helperconfig = new Helperconfig();
        (uint256 deployerKey) = helperconfig.activeNetworkConfig();

        /*
        The vm.startBroadcast() function starts broadcasting transactions to the blockchain. This function, in conjunction with deployerKey, ensures that the subsequent contract deployments are signed by the deployer account.

        During this phase, the deployerKey is implicitly used to sign the transactions that create the contracts.
        */
        vm.startBroadcast(deployerKey); // @note
        transactions = new Transactions();
        vm.stopBroadcast();

        console.log("Transactions deployed to:", address(transactions));
        return address(transactions);
    }
}
