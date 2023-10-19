import { Swiper, SwiperSlide } from 'swiper/react';
// import { Scrollbar } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/scrollbar';
import 'swiper/css/autoplay';

const AdvertisementCarousel = () => {

    const banner1 = 'https://i.ibb.co/kBThqd7/1.png';
    const banner2 = 'https://i.ibb.co/4RrZK6R/2.png';
    const banner3 = 'https://i.ibb.co/Jd5zSpC/3.png';


    return (
        <Swiper
            spaceBetween={50}
            slidesPerView={1}
            navigation
            scrollbar={{ draggable: true }}
        >
            <SwiperSlide>
                <img src={banner1} alt="" />
            </SwiperSlide>
            <SwiperSlide>
                <img src={banner2} alt="" />
            </SwiperSlide>
            <SwiperSlide>
                <img src={banner3} alt="" />
            </SwiperSlide>

        </Swiper>
    );
};

export default AdvertisementCarousel;