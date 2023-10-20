import PropTypes from 'prop-types';
import { Link } from "react-router-dom";



const SingleCarBrand = ({ carBrand }) => {

    const { brandName, photo } = carBrand;


    return (
        <div>
            <Link to={`/products/${brandName}`}>
                <div className="flex flex-col justify-center items-center gap-5 rounded-md p-5 duration-500 hover:shadow-[0_0_100px_#FF004C38] hover:scale-105">
                    <img src={photo} alt="Brand logo" />
                    <h1 className="text-2xl font-bold  text-center text-sub">{brandName}</h1>
                </div>
            </Link>
        </div>
    );
};

export default SingleCarBrand;



SingleCarBrand.propTypes = {
    carBrand: PropTypes.object,
}