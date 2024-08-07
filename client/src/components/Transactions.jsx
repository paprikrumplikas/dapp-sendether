import React, { useContext } from "react";
import { TransactionContext } from "../context/TransactionContext";
import dummyData from "../utils/dummyData";

import { shortenAddress } from "../utils/shortenAddress";

// our custom hook to fecth gifs trhouhg giphy api
import useFetch from "../hooks/useFetch";

const Transactions = () => {

    // getting data from the context
    const { currentAccount, transactions, connectWallet } = useContext(TransactionContext);

    // tx card component for reuseability
    const TransactionCard = ({ addressTo, addressFrom, timestamp, message, keyword, amount, url }) => {
        // pass an object containing the keyword to fetch a gif url. Passing it as an object is for future scalability, it is good for named args.
        const gifUrl = useFetch({ keyword });

        return <div className="bg-[#181918] m-4 flex flex-1
        2xl:min-w-[250px]
        2xl:max-w-[200px]
        sm:min-w-[170px]
        sm:max-w-[200px]
        flex-col p-3 rounded-md hover:shadow-2xl
        ">
            <div className="flex flex-col items-center w-full mt-3">

                <div className="w-full mb.8 p-2">
                    <a href={`https://sepolia.etherscan.io/address/${addressFrom}`} target="_blank" rel="noopener noreferrer">
                        <p className="text-white text-base">
                            From: {shortenAddress(addressFrom)}
                        </p>
                    </a>
                    <a href={`https://sepolia.etherscan.io/address/${addressTo}`} target="_blank" rel="noopener noreferrer">
                        <p className="text-white text-base">
                            To: {shortenAddress(addressTo)}
                        </p>
                    </a>
                    <p className="text-white text-base">
                        Amount: {amount} ETH
                    </p>
                    {/* if there is a message, render it*/}
                    {message && (
                        <>
                            <br />
                            <p className="text-white text-base">
                                Message: {message}
                            </p>
                        </>
                    )}


                </div>

                <img
                    src={gifUrl || url}
                    alt="gif"
                    className="w-full h-64 2x:h-96 rounded-medium shadow-lg object-cover"
                />

                {/* render timestamp: first create a black box that will contain it, then wrtie it*/}
                <div className="bg-black p-3 px-5 w-max rounded-3xl -mt-5 shadow-2xl">
                    <p className="text-[#37c7da] font-bold"> {timestamp}</p>
                </div>

            </div>
        </div>
    }

    return (
        <div className="flex w-full justify-center items-center 2xl:px-20 gradient-bg-transactions">
            <div className="flex flex-col md:p-12 py-12 px-4">
                {/* e ternary (conditional) operator: checking if currentAccount exists. If it does, renders current trxs. If not, renders button*/}
                {currentAccount ? (
                    <h3 className="text-white text-3xl text-center my-2">
                        Latest transactions
                    </h3>
                ) : (
                    <div className="flex flex-col items-center justify-center">
                        <h3 className="text-white text-3xl text-center my-2">
                            Connect your account to see the latest transactions.
                        </h3>

                        <button
                            type="button"
                            onClick={connectWallet}
                            className="flex justify-center items-center my-5 bg-[#2952e3] p-3 rounded-full cursor-pointer hover:bg-[#2546bd] w-full max-w-[300px]">
                            <p className="text-white text-base font-semibold">
                                Connect Wallet
                            </p>
                        </button>
                    </div>
                )}

                {/* loop through the txs */}
                <div className="flex flex-wrap justify-center items-center md-10">
                    {/* display in reverse order */}
                    {transactions.reverse().map((transaction, i) => (
                        < TransactionCard key={i} {...transaction} />))}
                </div>
            </div>
        </div>
    );
}

export default Transactions;
