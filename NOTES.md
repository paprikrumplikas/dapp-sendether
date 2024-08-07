INSTRUCTIONS:
1. tx shows only if user is logged in
2. ether is send via the app but not via the smart contract
3. only function of the smart contract is to log txs to the blockchain that were made through the app



SETUP
1. hosting and storage on hostinger
2. cd ./client
3. npm init vite@latest
4. npm install
5. npm run dev
6. npm install -D tailwindcss postcss autoprefixer
7. npx tailwindcss init -p
8. follow https://tailwindcss.com/docs/installation
9. ensure tailwind.config.jss looks like this

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {},
  },
  plugins: [],
}



CONTINUE:
1. Create the basic folder and file structure.
2. Install all dependencies that our react applications will need
  


TEST WEBSITE:

1. Go to the clients folder and execute `npm run dev` in the terminal to see what we built in the browser:
npm install react-install ethers. Ethers will enable us to interact with the blockchain


GIT:
@note in a monorepo setup, you can have multiple .gitignore files, and Git will recognize and respect each .gitignore file based on its location within the directory structure. Each .gitignore file will apply to the directory it is located in and all its subdirectories. This allows for more granular control over ignored files in different parts of the repository.


DEPLOYMENT, get everything so that react can interact with the smart contract
1. source .env
2. @note forge script script/Deployer.s.sol --rpc-url $SEPOLIA_RPC_URL --private-key $PRIVATE_KEY --broadcast --etherscan-api-key $ETHERSCAN_API_KEY
3. deployed to sepolia, address 0x5e8560CFC51FE25Ea8d85D74F1a4EB4DE652b716
4. Add the contract address to client/src/utils/constants.js @note
5. add the geneted ABI json to client/src/utils/Transactions.json https://youtu.be/Wn_Kb3MR_cU?t=5554
6. In constants.json, import the Transactions.json and then export the abi (In deployed via a deployer script contract with foundry, it is found in the out/ folder)
With this, we have everything in the react application to interact with our smart contract.



CONNECTING TO THE BLOCKCHAIN:
1. Src/context uses React's context abi around the entire application that will allow us to connect to the blockchain. 
2. Here (Src/context/TransactionContext.jsx), we create a txProvider object that we then use in main.jsx to wrap our entire app into
3. Here (Src/context/TransactionContext.jsx), we have a func for checking if a wallet is connected at the start, and also a func to connect the account
4. This has the from data fields defined as objects
5. @note for ethers 6.x, use 
in ethers 5.x, it was like  const provider = new ethers.providers.Web3Provider(ethereum); BUT it is different in ethers 6.0
const provider = new ethers.BrowserProvider(window.ethereum);


TO Add gifs:
1. register to giphy.com
2. create API key
3. add API key to client/.env
4. create custom hook in src/hooks/useFetch.jsx. Hook: a hook is a special function that allows you to "hook into" React's features, such as state and lifecycle methods, from function components.
@note the code in the file


TIPS
1. // @note `` instead of '' is used to make a template string where we can use logic in a string


LEARNINGS FROM DEBUGGINGS:
1. Unchecked runtime.lastError: The message port closed before a response was received.
   1. Can be caused by extensions. In my case, it is the Norton extension
2. Empty white space at the bottom of the react app
   1. Caused by a stray comma that was rendered as a text block
3. Error: contract runner does not support calling (operation="call", code=UNSUPPORTED_OPERATION, version=6.13.2)
   1.   added await when getting the signer (    const signer = await provider.getSigner();
   this is neccessary in ethers v6 https://github.com/ethers-io/ethers.js/discussions/3913
    /** @note 
        1. Make sure getEthereumContract is async.
        2. Use await when calling getEthereumContract.
        3. Ensure all calling functions are async.
        4. Handle async calls properly inside useEffect or other non-async functions. */
4. TypeError: transactionCount2.toNumber is not a function
    at sendTransaction (TransactionContext.jsx:176:50)
    1. setTransactionCount(transactionCount.toNumber()); // This works in ethers v5
    2. setTransactionCount(Number(transactionCount)); // This works in ehters v6
5. Too many API calls to giphy
   1. added debouncing + caching in useFetch.jsx


