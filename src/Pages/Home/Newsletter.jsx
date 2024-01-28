import AOS from 'aos';
import 'aos/dist/aos.css';



const Newsletter = () => {




    // animation
    AOS.init({
        offset: 120,
        duration: 1200,
        easing: 'ease',
        delay: 50,
    });



    return (
        <div className='mt-[6rem] rounded-lg bg-lightMain flex flex-col justify-center items-center gap-4 container mx-auto px-5 py-[80px]'>
            <h2 className="text-3xl md:text-5xl capitalize text-main font-semibold text-center"
                data-aos="slide-down"
                data-aos-mirror="true"
                data-aos-once="false"
                data-aos-anchor-placement="top-bottom">Join Motor Mingle</h2>
            <p className='text-center text-lightBlack'>
                Get latest updates to get your dream car.
            </p>

            <div className='w-full md:w-[65%] lg:w-[35%] flex justify-center items-center mt-5'>
                <input type="email" name='userEmail' id='userEmail' placeholder='Your email address' className='text-lightBlack font-medium text-[18px] px-8 py-5 w-full focus:outline-none rounded-l-[50px]' />
                <input type="submit" value="Sign up" className='text-white bg-sub text-[18px] font-semibold px-8 py-5 cursor-pointer hover:bg-black duration-500 rounded-r-[50px]' />
            </div>
        </div>
    );
};

export default Newsletter;