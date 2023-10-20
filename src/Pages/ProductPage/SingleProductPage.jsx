import PropTypes from 'prop-types';
import { Link } from "react-router-dom";


const SingleProductPage = ({ singleCategoryCar }) => {

    const { productName, brandName, carType, productPrice, description, photo, _id } = singleCategoryCar;

    return (
        <div className="w-full lg:w-2/3 mx-auto">

            <div className="flex flex-col md:flex-row justify-center items-center gap-10 h-[380px] bg-[#ff19662f] rounded-t-lg p-10 lg:p-0">
                <div className="space-y-3">
                    <h2 className="text-4xl font-bold font-heading text-black">{productName}</h2>
                    <h3 className="text-2xl text-main font-body font-bold">${productPrice}</h3>
                    <div className="flex justify-center items-start gap-3">
                        <Link to={`/productDetails/${_id}`}><button className="bg-sub px-4 py-1 text-base font-body font-bold rounded text-white hover:bg-main duration-300">See Details</button></Link>
                        <Link to={`/productUpdate/${_id}`}><button className="bg-sub px-4 py-1 text-base font-body font-bold rounded text-white hover:bg-main duration-300">Update Product</button></Link>
                    </div>
                </div>
                <img src={photo} alt="" />
            </div>
            <div className="px-[50px] md:px-[100px] py-10 bg-sub flex flex-col justify-center items-start text-left gap-5 rounded-b-lg">
                <div className="flex justify-start items-center gap-5">
                    <h3 className="text-base font-body font-bold text-white border-b-2 border-main pb-2 rounded-md">{brandName}</h3>
                    <h3 className="text-base font-body font-bold text-white border-b-2 border-main pb-2 rounded-md">{carType}</h3>
                </div>
                <p className="font-medium text-white">{description}</p>
            </div>

        </div>
    );
};

export default SingleProductPage;


SingleProductPage.propTypes = {
    singleCategoryCar: PropTypes.object,
}