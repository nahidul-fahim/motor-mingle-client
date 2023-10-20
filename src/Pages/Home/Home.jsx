import AboutSection from "./AboutSection";
import BannerCarousel from "./BannerCarousel";
import CarBrands from "./CarBrands";
import Logos from "./Logos";



const Home = () => {


    return (
        <div>
            <BannerCarousel />
            <CarBrands />
            <AboutSection />
            <Logos />
        </div>
    );
};

export default Home;