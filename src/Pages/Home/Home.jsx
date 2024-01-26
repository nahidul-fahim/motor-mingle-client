import AboutSection from "./AboutSection";
import Banner from "./Banner";
import FeaturedCar from "./FeaturedCar";
import Testimonial from "./Testimonial";
import UserActivity from "./UserActivity";



const Home = () => {


    return (
        <div>
            <Banner />
            <UserActivity />
            <AboutSection />
            <FeaturedCar />
            <Testimonial />
        </div>
    );
};

export default Home;