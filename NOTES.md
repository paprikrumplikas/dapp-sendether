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
