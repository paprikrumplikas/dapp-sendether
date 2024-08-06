{/* e importing icons.*/ }
import React, { useContext } from "react";
import { AiFillPlayCircle } from "react-icons/ai";
import { SiEthereum } from "react-icons/si";
import { BsInfoCircle } from "react-icons/bs";

import { TransactionContext } from "../context/TransactionContext";
import { Loader } from "./";

const commonStyles = "min-h-[70px] sm:px-0 px-2 sm:min-w-[120px] flex justify-center items-center border-[0.5px] border-gray-400 text-sm font-light text-white";


{/* e New component for the input fileds of the form on the welcome page.*/ }
{/* e Gonna instantenously return some jsx code -> can use () instead of {}.*/ }
{/* e in onChange, e is for an event*/ }
{/* e in className, notice how the utility classes that tailwind provides us makes things so much easier*/ }
const Input = ({ placeholder, name, type, value, handleChange }) => (
    <input
        placeholder={placeholder}
        type={type}
        step="0.0001"
        value={value}
        onChange={(e) => handleChange(e, name)}
        className="my-2 w-full rounded-sm p-2 outline-none bg-transparent text-white border-none text-sm white-glassmorphism
        "
    />
);

const Welcome = () => {
    {/* e get access to the connectWallet and currentAccount variables*/ }
    const { connectWallet, currentAccount, formData, sendTransaction, handleChange } = useContext(TransactionContext);
    {/* e this is to test that we are transferring all of the data from TransactionContext.jsx file to any of all our compnenets. We can check the result in the browser*/ }
    {/*console.log(value);*/ }



    const handleSubmit = (e) => {
        // deconstruct all the properties from the form data
        const { addressTo, amount, keyword, message } = formData;
        // ususally when a form is submitted, the page reloads. In react apps, we dont want this to happen, so:
        e.preventDefault();

        // if any of the fields is not filled in, just return
        if (!addressTo || !amount || !keyword || !message) return;

        // else use the sendTranaction() function. This is created in TransactionContext
        sendTransaction();
    }

    return (
        <div className="flex w-full justify-center items-center">
            {/* e Here and in 2 other places, md has been changed to mf. This is a media query that is gonna be appended to tailwind by us! I.e. we changed tailwinf.config.js*/}
            <div className="flex mf:flex-row flex-col items-start justify-between md:p-20 py-12 px-4">
                <div className="flex flex-1 justify-start flex-col mf:mr-10">
                    <h1 className="text-3xl sm:text-5xl text-white text-gradient py-1">
                        Send Crypto <br /> accross the world
                    </h1>
                    <p className="text-left mt-5 text-white font-light md:w-9/12 w-11/12 text-base">
                        Explore the crypto world. Buy and sell cryptocurrencies easily on Krypto.
                    </p>
                    {/* e if there is no current account, then render the button*/}
                    {!currentAccount && <button
                        type="button"
                        onClick={connectWallet}
                        className="flex flex-row justify-center items-center my-5 bg-[#2952e3] p-3 rounded-full cursor-pointer hover:bg-[#2546bd]">
                        <p className=" text-white text-base font-semibold">
                            Connect Wallet
                        </p>
                    </button>}
                    {/* e grid for all of our features*/}
                    <div className="grid sm:grid-cols-3 grid-cols-2 w-full mt-10">
                        {/* e elements/cells of the grid @note the backticks!*/}
                        <div className={`rounded-tl-2xl ${commonStyles}`}>
                            Reliability
                        </div>
                        <div className={commonStyles}> Security </div>
                        {/* e elements/cells of the grid @note the backticks!*/}
                        <div className={`rounded-tr-2xl ${commonStyles}`}>
                            Ethereum
                        </div>
                        {/* e elements/cells of the grid @note the backticks!*/}
                        <div className={`rounded-bl-2xl ${commonStyles}`}>
                            Web 3.0
                        </div>
                        <div className={commonStyles}> Low fees </div>
                        <div className={`rounded-br-2xl ${commonStyles}`}>
                            Blockchain
                        </div>
                    </div>
                </div>

                {/* e right side of our desktop welcome view*/}
                <div className="flex flex-col flex-1 items-center justify-start w-full mf:mt-0 mt-10">
                    {/* e The card. the special classes in here are coming from our initial index.css. There are online free services that one can use to create such cool gradients*/}
                    <div className="p-3 justify-end items-start flex-col rounded-xl h-40 sm:w-72 w-full my-5 eth-card white-glassmorphism">
                        <div className="flex justify-between flex-col w-full h-full">
                            <div className="flex justify-between items-start">
                                {/* e circle on the card*/}
                                <div className="w-10 h-10 rounded-full border-2 border-white flex justify-center items-center">
                                    {/* e eth icon*/}
                                    <SiEthereum fontSize={21} color="#fff" />
                                </div>
                                <BsInfoCircle fontSize={17} color="#fff" />
                            </div>
                            {/* e address of the connected wallet*/}
                            <div>
                                <p className="text-white font-light text-sm">
                                    Address                                </p>
                                <p className="text-white font-semibold text-lg mt-1">
                                    Ethereum
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* e The form*/}
                    <div className="p-5 sm:w-96 w-full flex flex-col justify-start items-center blue-glassmorphism">
                        {/* e Inputs. We are gonna have a lot of them -> easier to create a new component*/}
                        {/* e handleChange func is defined in TransactionContext, it helps to update the values dynamically*/}
                        <Input placeholder="Address To" name="addressTo" type="text" handleChange={handleChange} />
                        <Input placeholder="Amount (ETH)" name="amount" type="number" handleChange={handleChange} />
                        <Input placeholder="Keyword (Gif)" name="keyword" type="text" handleChange={handleChange} />
                        <Input placeholder="Enter message" name="message" type="text" handleChange={handleChange} />

                        {/* e Line in the form*/}
                        <div className="h-[1px] w-full bg-gray-400 my-2" />

                        {/* e Check if it loading. If yes, display a circling red circle. If not, display a Send Now button. All buttons should have a cursor-pointer*/}
                        {false ? (
                            <Loader />
                        ) : (
                            < button
                                type="button"
                                onClick={handleSubmit}
                                className="text-white w-full mt-2 border-[1px] p-2 border-[#3d4f7c] rounded-full cursor-pointer"
                            >
                                Send Now
                            </button>
                        )}
                    </div>


                </div>
            </div>
        </div >
    );
}

export default Welcome;