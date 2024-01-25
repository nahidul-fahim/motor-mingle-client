import { Link } from "react-router-dom";
import { MdArrowOutward } from "react-icons/md";
import AOS from 'aos';
import 'aos/dist/aos.css';



const UserActivity = () => {


    // animation
    AOS.init({
        offset: 120,
        duration: 1200,
        easing: 'ease',
        delay: 50,
    });



    return (
        <div className="container mx-auto p-5 flex flex-col md:flex-row justify-center items-center gap-10 font-heading mt-[80px]"
            data-aos="fade-down"
            data-aos-mirror="true"
            data-aos-once="false"
            data-aos-anchor-placement="top-bottom">
            <div className="bg-[#cee3ff] px-[30px] lg:px-[50px] py-[40px] lg:py-[80px] flex flex-col justify-start items-start self-stretch gap-8 rounded-lg w-full md:w-1/2">
                <h3 className="text-main text-4xl font-bold">Are you looking for a car?</h3>
                <p className="text-lightBlack">Discover unique stories on wheels! Explore and buy vintage cars from our community, where every car has a story to tell.</p>
                <Link to={"/allListings"} className="bg-sub px-6 py-3 text-white font-medium text-xl rounded hover:bg-black duration-500 flex justify-center items-center gap-2">Buy A Car <MdArrowOutward /></Link>
            </div>

            <div className="bg-[#dfdfdf] px-[30px] lg:px-[50px] py-[40px] lg:py-[80px] flex flex-col justify-start items-start self-stretch gap-8 rounded-lg w-full md:w-1/2">
                <h3 className="text-main text-4xl font-bold">Do you want to sell a car?</h3>
                <p className="text-lightBlack">Turn memories into cash! Sell your old car effortlessly on our platform – where simplicity meets value.</p>
                <Link to={"/dashboard/sellCar"} className="bg-black px-6 py-3 text-white font-medium text-xl rounded hover:bg-sub duration-500 flex justify-center items-center gap-2">Sell Your Car <MdArrowOutward /></Link>
            </div>
        </div>
    );
};

export default UserActivity;