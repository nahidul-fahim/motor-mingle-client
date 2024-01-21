import AOS from 'aos';
import 'aos/dist/aos.css';


const FeaturedCar = () => {




    AOS.init({
        offset: 120,
        duration: 1200,
        easing: 'ease',
        delay: 50,
    });


    return (
        <div className='mt-[6rem] flex flex-col justify-center items-center gap-4'>
            <h2 className="text-3xl md:text-5xl capitalize text-main font-semibold  text-center"
                data-aos="slide-down"
                data-aos-mirror="true"
                data-aos-once="false"
                data-aos-anchor-placement="top-bottom">Find your dream car</h2>
                <p className='text-center text-lightBlack'>
                    A friendly collection for you. You can have a look and choose the best for you.
                </p>
        </div>
    );
};

export default FeaturedCar;