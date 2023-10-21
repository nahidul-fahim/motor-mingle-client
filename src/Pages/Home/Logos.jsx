import Marquee from "react-fast-marquee";
import AOS from 'aos';
import 'aos/dist/aos.css';

const Logos = () => {

    const logo1 = 'https://i.ibb.co/zfgXWyC/1.png';
    const logo2 = 'https://i.ibb.co/LdJy67r/2.png';
    const logo3 = 'https://i.ibb.co/Mp8THPT/3.png';
    const logo4 = 'https://i.ibb.co/2vV9tdK/4.png';
    const logo5 = 'https://i.ibb.co/pfDcQjC/5.png';
    const logo6 = 'https://i.ibb.co/LRMHct4/6.png';
    const logo7 = 'https://i.ibb.co/sW3Z7qb/7.png';


    AOS.init({
        offset: 120,
        duration: 1500,
        easing: 'ease',
        delay: 50,
    });

    return (
        <div className="container mx-auto p-5 mt-[3rem] lg:mt-[5rem]">
            <h2 className="text-3xl md:text-5xl uppercase text-main font-extrabold  text-center"
                data-aos="slide-down"
                data-aos-mirror="true"
                data-aos-once="false"
                data-aos-anchor-placement="top-bottom">Our Alliances</h2>
            <Marquee className="mt-[4rem] space-y-10"
                speed={120}>
                <img src={logo1} alt="" className="w-[80%]" />
                <img src={logo2} alt="" className="w-[80%]" />
                <img src={logo3} alt="" className="w-[80%]" />
                <img src={logo4} alt="" className="w-[80%]" />
                <img src={logo5} alt="" className="w-[80%]" />
                <img src={logo6} alt="" className="w-[80%]" />
                <img src={logo7} alt="" className="w-[80%]" />
            </Marquee>
        </div>
    );
};

export default Logos;