import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/scrollbar';
import 'swiper/css/autoplay';
import { Link } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';

const BannerCarousel = () => {

    const banner1 = 'https://i.ibb.co/pdXhpv0/white-car.png';
    const banner2 = 'https://i.ibb.co/PWpF67Q/white-fast-car.png';

    AOS.init({
        offset: 120,
        duration: 1500,
        easing: 'ease',
        delay: 50,
    });

    return (
        <Swiper
            spaceBetween={50}
            slidesPerView={1}
            navigation
            scrollbar={{ draggable: true }}
        >
            <SwiperSlide className='flex justify-start items-center'
                style={{
                    backgroundImage: `linear-gradient(to right, rgba(255, 255, 255, 1), rgba(255, 255, 255, 0.4)), url(${banner1})`,
                    height: '650px',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: 'cover',
                }}>
                <div className='container mx-auto p-5 flex flex-col justify-center items-center lg:items-start'>
                    <h1 className='text-4xl md:text-6xl font-extrabold  text-center lg:text-left lg:w-[50%] text-sub leading-snug uppercase'
                        data-aos="fade-down"
                        data-aos-mirror="true"
                        data-aos-once="false"
                        data-aos-anchor-placement="top-bottom">Dive into the Thrilling World of Cars</h1>
                    <Link to="/allProducts"><button className='mt-8 bg-main text-white px-4 font-semibold rounded hover:bg-sub duration-500 py-2'
                        data-aos="fade-up"
                        data-aos-mirror="true"
                        data-aos-once="false"
                        data-aos-anchor-placement="top-bottom">All Products</button></Link>
                </div>
            </SwiperSlide>

            <SwiperSlide className='flex justify-start items-center'
                style={{
                    backgroundImage: `linear-gradient(to right, rgba(255, 255, 255, 1), rgba(255, 255, 255, 0.4)), url(${banner2})`,
                    height: '650px',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: 'cover',
                }}>
                <div className='container mx-auto p-5 flex flex-col justify-center items-center lg:items-start'>
                    <h1 className='text-4xl md:text-6xl font-extrabold  text-center lg:text-left lg:w-[50%] text-sub leading-snug uppercase'
                        data-aos="fade-down"
                        data-aos-mirror="true"
                        data-aos-once="false"
                        data-aos-anchor-placement="top-bottom">Explore the World of Wheels</h1>
                    <Link to="/allProducts"><button className='mt-8 bg-main text-white px-4 font-semibold rounded hover:bg-sub duration-500 py-2'
                        data-aos="fade-up"
                        data-aos-mirror="true"
                        data-aos-once="false"
                        data-aos-anchor-placement="top-bottom">All Products</button></Link>
                </div>
            </SwiperSlide>
        </Swiper>
    );
};

export default BannerCarousel;