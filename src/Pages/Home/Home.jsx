import AboutSection from "./AboutSection";
import Banner from "./Banner";
import FeaturedCar from "./FeaturedCar";
import UserActivity from "./UserActivity";



const Home = () => {


    return (
        <div>
            <Banner />
            <UserActivity />
            <AboutSection />
            <FeaturedCar />
        </div>
    );
};

export default Home;