import PropTypes from 'prop-types';
import { Link } from "react-router-dom";
import AOS from 'aos';
import 'aos/dist/aos.css';



const SingleCarBrand = ({ carBrand }) => {

    const { brandName, photo } = carBrand;

    AOS.init({
        offset: 120,
        duration: 2500,
        easing: 'ease',
        delay: 50,
    });
    return (
        <div data-aos="fade"
            data-aos-mirror="true"
            data-aos-once="false"
            data-aos-anchor-placement="top-bottom">
            <Link to={`/products/${brandName}`}>
                <div className="flex flex-col justify-center items-center gap-5 rounded-md p-5 duration-500 hover:shadow-[0_0_100px_#FF004C38] hover:scale-105">
                    <img src={photo} alt="Brand logo" />
                    <h1 className="text-2xl font-bold  text-center text-second">{brandName}</h1>
                </div>
            </Link>
        </div>
    );
};

export default SingleCarBrand;



SingleCarBrand.propTypes = {
    carBrand: PropTypes.object,
}