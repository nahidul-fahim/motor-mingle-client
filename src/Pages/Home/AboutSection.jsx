import AOS from 'aos';
import 'aos/dist/aos.css';
import { AiTwotoneLike, AiTwotoneRocket , AiTwotoneStar } from "react-icons/ai";


const AboutSection = () => {

    AOS.init({
        offset: 120,
        duration: 1200,
        easing: 'ease',
        delay: 50,
    });

    return (
        <div className="mt-[3rem] lg:mt-[5rem] flex justify-center items-center">
            <div className="container mx-auto p-5 lg:py-[3rem] flex flex-col justify-center items-center gap-5">
                <h2 className="text-3xl md:text-5xl capitalize text-main font-semibold  text-center"
                    data-aos="slide-down"
                    data-aos-mirror="true"
                    data-aos-once="false"
                    data-aos-anchor-placement="top-bottom">What we serve</h2>
                <p className="md:w-2/3 text-center font-normal text-base text-lightBlack">We offer you a platform where you can buy and sell your car. A easy, reliable platform for you.</p>

                {/* card container */}
                <div className='container mx-auto gap-14 flex flex-col md:flex-row justify-center md:justify-around items-center w-full lg:w-[90%] mt-8'>
                    {/* card 1 */}
                    <div className='flex flex-col gap-3 justify-center items-start'>
                        <AiTwotoneLike className='text-third text-3xl'/>
                        <h3 className='text-xl font-semibold text-black'>Top Buy & Sell Car</h3>
                        <p className='text-lightBlack'>Rev up your journey with our top-notch cars for sale, and drive away with the best deal today. Ready to upgrade? Sell your car hassle-free and get top value with our seamless selling process.</p>
                    </div>
                    {/* card 2 */}
                    <div className='flex flex-col gap-3 justify-center items-start'>
                        <AiTwotoneRocket className='text-third text-3xl'/>
                        <h3 className='text-xl font-semibold text-black'>Easy to use</h3>
                        <p className='text-lightBlack'>Simplicity meets efficiency with our user-friendly design, making it a breeze to navigate and enjoy. Experience the ease of use that redefines convenience in every click.</p>
                    </div>
                    {/* card 3 */}
                    <div className='flex flex-col gap-3 justify-center items-start'>
                        <AiTwotoneStar className='text-third text-3xl'/>
                        <h3 className='text-xl font-semibold text-black'>Realiable</h3>
                        <p className='text-lightBlack'>Trust in the unwavering performance of our products, where reliability is not just a promise but a standard. Depend on us for consistency and excellence in every experience.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AboutSection;