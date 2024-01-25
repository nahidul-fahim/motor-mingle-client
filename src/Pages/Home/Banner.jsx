import { Link } from "react-router-dom";
import AOS from 'aos';
import 'aos/dist/aos.css';


const bannerImg = "https://i.ibb.co/bdDtPCd/slider51.png";

const Banner = () => {









    // animation
    AOS.init({
        offset: 120,
        duration: 1500,
        easing: 'ease',
        delay: 50,
    });





    return (
        <div className="min-h-calc-100vh-70 bg-contain"
            style={{
                backgroundImage: `linear-gradient(to bottom, #d1dcff00, #FFFFFF00), url(${bannerImg})`,
                backgroundRepeat: 'no-repeat',
                backgroundSize: '',
                backgroundPosition: 'bottom'
            }}>
            <div className="container mx-auto p-5 h-full flex flex-col justify-start items-center font-body gap-4">
                <p className="text-main text-[18px] mt-[50px]"
                    data-aos="zoom-in"
                    data-aos-mirror="true"
                    data-aos-once="false"
                    data-aos-anchor-placement="top-bottom">The dream place for car buy and sell</p>
                <h1 className="text-black text-7xl font-bold text-center"
                    data-aos="fade-down"
                    data-aos-mirror="true"
                    data-aos-once="false"
                    data-aos-anchor-placement="top-bottom">Find Your Dream Car</h1>

            </div>

        </div>
    );
};

export default Banner;