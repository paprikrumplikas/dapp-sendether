import { BsShieldFillCheck } from "react-icons/bs";
import { BiSearchAlt } from "react-icons/bi";
import { RiHeart2Fill } from "react-icons/ri";


// new component for reusability of cards.
// this is an arrow function with instant return
// data passed to a react component is props (properties)
const ServiceCard = ({ color, title, icon, subtitle }) => (
    <div className="flex flex-row justify-start items-center white-glassmorphism p-3 m-2 cursor-pointer hover:shadow-xl">
        <div className={`w-10 h-10 rounded-full flex justify-center items-center ${color}`}>
            {icon}
        </div>
        <div className="ml-5 flex flex-col flex-1">
            <h1 className="mt-2 text-white text-lg">{title}</h1>
            <p className="mt-2 text-white text-sm md:w-11/12">{subtitle}</p>
        </div>
    </div>
);

const Services = () => {
    return (
        <div className="flex w-full justify-center items-center gradient-bg-services">
            {/* Align the outer container classes with the Welcome component */}
            <div className="flex mf:flex-row flex-col items-center justify-between md:px-20 md:py-10 py-12 px-4 max-w-screen-lg">
                <div className="flex-1 flex flex-col justify-start items-start">
                    <h1 className="text-white text-3xl sm:text-5xl py-2 text-gradient">Services that we
                        <br />
                        continue to improve.
                    </h1>
                </div>
                <div className="flex-1 flex flex-col justify-start items-center">
                    <ServiceCard
                        color="bg-[#2952E3]"
                        title="Security Guaranteed"
                        icon={<BsShieldFillCheck fontSize={21} className="text-white" />}
                        subtitle="Security is guaranteed. We always maintain privacy and maintain the quality of our products."
                    />
                    <ServiceCard
                        color="bg-[#006400]"
                        title="Best Exchange Rates"
                        icon={<BiSearchAlt fontSize={21} className="text-white" />}
                        subtitle="We offer the most competitive exchange rates, ensuring you get the best value for your transactions."
                    />
                    <ServiceCard
                        color="bg-[#FF5733]"
                        title="Fastest Transactions"
                        icon={<RiHeart2Fill fontSize={21} className="text-white" />}
                        subtitle="Enjoy lightning-fast transaction speeds, ensuring your transfers are completed within seconds."
                    />
                </div>
            </div>
        </div>
    );
}

export default Services;
