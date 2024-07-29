import { useState } from "react";
import { HiMenuAlt4 } from "react-icons/hi";
import { AiOutlineClose } from "react-icons/ai";


import logo from "../../images/logo.png"; // e we got it from a source

// e new component for our nav bar item
const NavbarItem = ({ title, classProps }) => {
    return (
        <li className={`mx-4 cursor-pointer ${classProps}`}>
            {/* Render the title */}
            {title}
        </li>
    )
}

const Navbar = () => {
    {/* e status that says whether the mobile nav bar is open. At start, it is gonna be closed.*/ }
    const [toggleMenu, setToggleMenu] = useState(false);

    return (
        // tailname documentation explains what this classNames mean
        <nav className="w-full flex md:justify-center justify-between items-center p-4">
            <div className="md:flex-[0.5] flex-initial justify-center items-center">
                <img src={logo} alt="logo" className="w-32 cursor-pointer">
                </img>
            </div>
            <ul className="text-white md:flex hidden list-none flex-row justify-between items-center flex-initial">
                {/* e Render the NavbarItem component here */}
                {/* e Call the navigation bar item as a component */}
                {/* e We dont want only one navbar item so we use a new dynamic block with an array. Then call a map method which intantenously returns something -> wont have curly braces here*/}
                {["Market", "Exchange", "Tutorials", "Wallets"].map((item, index) => (
                    <NavbarItem key={item + index} title={item} />
                ))}
                {/* e This is for the login button that has rounded backdround which changes color upon hover, etc*/}
                <li className="bg-[#2952e3] py-2 px-7 mx-4 rounded-full cursor-pointer hover:bg-[#2456bd]">
                    Login
                </li>
            </ul>

            {/* e Navbar implementation for mobile devices*/}
            <div className="flex relative">
                {/* e Dynamic block of code to check whether the toggle menu is currently turned on*/}
                {toggleMenu
                    ? <AiOutlineClose fontSize={28} className="text-white md:hidden cursor-pointer" onClick={() => setToggleMenu(false)} />
                    : <HiMenuAlt4 fontSize={28} className="text-white md:hidden cursor-pointer" onClick={() => setToggleMenu(true)} />}
                {/* e when menu is toggled on, we need to be able to show it*/}
                {/** && means that to code in () os gonna show only if toggelMenu = true */}
                {toggleMenu && (
                    <ul
                        className="z=10 fixed top-0 -right-2 p-3 w-[70vw] h-screen shadow-2xl md:hidden list-none
                         flex flex-col justify-start items-end rounded-md blue-glassmorphism text-white animate-slide-in
                        "
                    >
                        <li className="text-xl w-full my-2">
                            <AiOutlineClose onClick={() => setToggleMenu(false)} />
                        </li>
                        {/** we need to loop through menu items again */}
                        {["Market", "Exchange", "Tutorials", "Wallets"].map((item, index) => (
                            <NavbarItem key={item + index} title={item} classProps="my-2 text-lg" />
                        ))}
                    </ul>


                )}
            </div>

        </nav>
    );
}

export default Navbar;