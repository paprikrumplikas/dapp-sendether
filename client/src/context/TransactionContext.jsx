import React, { useEffect, useState } from "react";
import { ethers } from "ethers";

{/* e Stuff we got from the deployment*/ }
import { contractABI, contractAddress } from "../utils/constants";

export const TransactionContext = React.createContext();

// e We are using Metamask -> we are getting acces to the Ethereum object which we can get as follows:
// e The window.etheruem object is present in the browser because we installed and set up MM*
const { ethereum } = window;

{/* e Special function that fetches our contraft*/ }
const getEthereumContract = async () => {
    // @note in ethers 5.x, it was like  const provider = new ethers.providers.Web3Provider(ethereum); BUT it is different in ethers 6.0
    const provider = new ethers.BrowserProvider(window.ethereum);
    // @note added await, this is neccessary in ethers v6 https://github.com/ethers-io/ethers.js/discussions/3913
    /** @note 
        1. Make sure getEthereumContract is async.
        2. Use await when calling getEthereumContract.
        3. Ensure all calling functions are async.
        4. Handle async calls properly inside useEffect or other non-async functions. */
    const signer = await provider.getSigner();
    const transactionContract = new ethers.Contract(contractAddress, contractABI, signer);

    // instead of console logging, we can also return the transactionContract, so:
    {/*console.log({
        provider,
        signer,
        transactionContract
    });*/ }

    return transactionContract;
}

// e Create a context where we call the function to serve a specific purpose
// e Every context provider needs to get one thing from the props: children*
export const TransactionProvider = ({ children }) => {
    // e useState field.  useState hook is a fundamental concept in React. At the start, it is gonna be equal to an empty string 
    const [currentAccount, setCurrentAccount] = useState('');
    // e states for the fields of the form */ }
    // creating the state vars here
    const [formData, setFormData] = useState({ addressTo: '', amount: '', keyword: '', message: '' });
    // needed when we call addToBlockchain() method of our contract and it is gonna take a while to got through
    const [isLoading, setIsLoading] = useState(false);
    //another new state. Initial state of 0 might not be good, as this is gonna reset on each browser reload, so we store it in local storage
    const [transactionCount, setTransactionCount] = useState(localStorage.getItem('transactionCount'));
    // new state with all the txs, that we can pass as a return value to Transactions.jsx. At start, empty array
    const [transactions, setTransactions] = useState([]);

    // e This is to update the fields as user is typing. All handle change funcs functions that interact with inputs expect for event...
    // e Not blockchain related, but difficult to understand, requires more advanced react knowledge
    const handleChange = (e, name) => {
        setFormData((prevState) => ({ ...prevState, [name]: e.target.value }));
    }

    // this is called in checkIfWallletIsConnected
    const getAllTransactions = async () => {
        try {
            // e check if there is an etherum object, i.e. if Metamask is installed
            if (!ethereum) return alert("Please install Metamask!");
            const transactionContract = await getEthereumContract();    // @note added await here too

            // call to our contract
            const availableTransactions = await transactionContract.getAllTransactions();

            const structuredTransactions = availableTransactions.map((transaction) => ({
                addressTo: transaction.receiver,
                addressFrom: transaction.sender,
                // timestamp: new Date(Number(transaction.timestamp) * 1000).toLocaleString, @note works only for ethers v5
                timestamp: new Date(Number(transaction.timestamp) * 1000).toLocaleString(),
                message: transaction.message,
                keyword: transaction.keyword,
                // amount: parseInt(transaction.amount._hex) * (10 ** 18) @note works only for ethers v5
                amount: Number(transaction.amount) / (10 ** 18)
            }))
            //console.log(availableTransactions); @note this results in a weird format, so we created structuredTransactions instead
            console.log(structuredTransactions);
            setTransactions(structuredTransactions);
        } catch (error) {
            console.log(error);
        }
    }


    // e We want to transfer some data that helps us connect to the blockchain. For this, we have this new funct
    const checkIfWalletIsConnected = async () => {
        try {
            // e check if there is an etherum object, i.e. if Metamask is installed
            if (!ethereum) return alert("Please install Metamask!");
            // e get Metamask connected accounts. We specify the object and request eth_accounts
            const accounts = await ethereum.request({ method: 'eth_accounts' });

            if (accounts.length) {
                setCurrentAccount(accounts[0]);
                getAllTransactions();
            } else {
                console.log('No accounts found.');
            }

            {/* e check if we getting something*/ }
            console.log(accounts);
        } catch (error) {
            console.log(error);
            throw new Error("No ethereum object.")
        }
    }

    // 
    const checkIfTransactionExists = async () => {
        try {
            const transactionContract = await getEthereumContract();    // @note added await here too
            const transactionCount = await transactionContract.getTransactionCount();

            window.localStorage.setItem("transactionCount", transactionCount);

        } catch (error) {
            //throw new Error("No ethereum object.") // misleading, error can come from another source
            console.log(error);

        }
    }

    const connectWallet = async () => {
        try {
            // e check if there is an etherum object, i.e. if Metamask is installed
            if (!ethereum) return alert("Please install Metamask!");
            // e we need to request a MM account. We are gonna get all the accounts
            const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
            // e this is gonna connect the first account*/ }
            setCurrentAccount(accounts[0]);
            {/* e error handling*/ }
        } catch (error) {
            console.log(error);
            throw new Error("No ethereum object.")
        }
    }

    {/* e Entire logic for sending and storing txs is gonna be in this func*/ }
    const sendTransaction = async () => {
        console.log("Entered sendTransaction-0")

        try {
            {/* e check if there is an etherum object, i.e. if Metamask is installed*/ }
            if (!ethereum) return alert("Please install Metamask!");
            // @note get the data from the form, deconstruct
            const { addressTo, amount, keyword, message } = formData;
            // get the contract. (calling this function). At the start, this is not gonna do anything but console logging
            // if we put this into a var, we can use this var to call all of our contract-related funcs
            // @note added await here too
            const transactionContract = await getEthereumContract();
            console.log("Entered sendTransaction-1")

            // we need to convert decimal to hex, as a first step, we parse it, then make it hex
            // @note in ethers 5.x, it was like            const parsedAmount = ethers.utils.parseEther(amount); but it changed
            const parsedAmount = ethers.parseEther(amount);
            // Convert parsedAmount to hex string
            const hexAmount = ethers.toBeHex(parsedAmount);

            console.log("Entered sendTransaction-2")


            // send some eth
            await ethereum.request({
                method: 'eth_sendTransaction',
                params: [{
                    from: currentAccount,
                    to: addressTo,
                    gas: '0x5208', // hex, in decimal 21_000 gwei
                    value: hexAmount, // hex amount!
                }]
            });

            console.log("Got everything ready, next immediate step is adding the tx to the contract (in TransactionContext.jsx");


            // to store our transaction, we need this. It is better to add this to a var which is a tx hash. This is async, gonna take a while to go trhough
            const transactionHash = await transactionContract.addToBlockchain(addressTo, parsedAmount, message, keyword);

            // since it takes time to go trhough, we need a loading state, and we need an await as per below
            setIsLoading(true);
            console.log(`Loading - ${transactionHash.hash}`);
            await transactionHash.wait();

            // after this is done,
            setIsLoading(false);
            console.log(`Success - ${transactionHash.hash}`);

            const transactionCount = await transactionContract.getTransactionCount();
            //setTransactionCount(transactionCount.toNumber()); @note this does not work in ethers v6 anymore
            setTransactionCount(Number(transactionCount)); // Convert BigInt to regular number


        } catch (error) {
            console.log(error);
            // throw new Error("No ethereum object.")
        }
    }

    // e We need to call this function (checkIfWalletIsConnected) so we need a useEffect. This happens only at the load of the application, at the start
    /*useEffect(() => {
        checkIfWalletIsConnected();
        //set up the current number of txs
        checkIfTransactionExists();
    }, []);*/
    // @note mofified this
    useEffect(() => {
        (async () => {
            await checkIfWalletIsConnected();
        })();
    }, []);



    return (
        // passing the state vars through the context value here
        < TransactionContext.Provider value={{ connectWallet, currentAccount, formData, setFormData, handleChange, sendTransaction, transactions, isLoading }} >
            {children}
        </TransactionContext.Provider >

    );
}






