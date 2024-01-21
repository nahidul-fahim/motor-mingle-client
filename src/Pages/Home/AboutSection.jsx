import AOS from 'aos';
import 'aos/dist/aos.css';

const AboutSection = () => {

    const bgImage = 'https://i.ibb.co/djtr8tV/about-page-img.png';


    AOS.init({
        offset: 120,
        duration: 1200,
        easing: 'ease',
        delay: 50,
    });

    return (
        <div className="mt-[3rem] lg:mt-[5rem] flex justify-center items-center"
            style={{
                backgroundImage: `linear-gradient(to bottom, rgba(255, 255, 255, .8), rgba(255, 255, 255, 0.9)), url(${bgImage})`,
                height: '650px',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover',
            }}>
            <div className="container mx-auto p-5 lg:py-[3rem] flex flex-col justify-center items-center gap-10">
                <h2 className="text-3xl md:text-5xl uppercase text-main font-extrabold  text-center"
                    data-aos="slide-down"
                    data-aos-mirror="true"
                    data-aos-once="false"
                    data-aos-anchor-placement="top-bottom">What we provide</h2>
                <p className="md:w-2/3 text-center font-semibold  text-base text-sub"
                    data-aos="slide-up"
                    data-aos-mirror="true"
                    data-aos-once="false"
                    data-aos-anchor-placement="top-bottom">Motor Mingle is your premier destination for car buying and renting. Our platform is designed with you in mind, offering a diverse inventory, transparency, user-friendly features, and secure transactions. Join our community of car enthusiasts and start your automotive journey with us today!</p>
            </div>
        </div>
    );
};

export default AboutSection;