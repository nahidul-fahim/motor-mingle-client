import { Link } from "react-router-dom";


const bannerImg = "https://i.ibb.co/SmmryVS/hero-image3.png";

const Banner = () => {
    return (
        <div className="container mx-auto flex justify-between items-center gap-5 p-5 font-heading min-h-[600px]">
            <div className="w-[45%] flex flex-col justify-center items-start gap-5">
                <h1 className="text-[60px] font-bold leading-[60px] text-main">Buy and Sell <br />Your Car</h1>
                <p className="text-lightBlack font-medium">We will help you buy and sell your dream car here easily and quickly that is easy and reliable.</p>
                <div className="flex justify-start items-center gap-3">
                    <Link to={"/alllistings"}><button className="bg-main px-5 py-3 rounded text-white font-semibold hover:bg-sub duration-500 hover:text-white">Buy Car</button></Link>
                    <Link to={"/dashboard/sellCar"}><button className="bg-white px-5 py-3 rounded text-main font-semibold hover:bg-sub duration-500 hover:text-white">Sell Car</button></Link>
                </div>
            </div>
            <div className="w-[55%]">
                <img src={bannerImg} alt="" className="w-full" />
            </div>
        </div>
    );
};

export default Banner;