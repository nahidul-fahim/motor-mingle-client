import { Swiper, SwiperSlide } from 'swiper/react';
// import { Scrollbar } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/scrollbar';
import 'swiper/css/autoplay';

const BannerCarousel = () => {

    const banner1 = 'https://i.ibb.co/pdXhpv0/white-car.png';
    const banner2 = 'https://i.ibb.co/PWpF67Q/white-fast-car.png';



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
                <div className='container mx-auto p-5'>
                    <h1 className='text-6xl font-extrabold font-heading text-left w-[50%] text-sub leading-snug uppercase'>Dive into the Thrilling World of Cars</h1>
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
                <div className='container mx-auto p-5'>
                    <h1 className='text-6xl font-extrabold font-heading text-left w-[50%] text-sub leading-snug uppercase'>Explore the World of Wheels</h1>
                </div>
            </SwiperSlide>
        </Swiper>
    );
};

export default BannerCarousel;