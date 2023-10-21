import PropTypes from 'prop-types';
import { Link } from "react-router-dom";
import { Rating, StickerStar } from '@smastrom/react-rating'
import '@smastrom/react-rating/style.css'
import AOS from 'aos';
import 'aos/dist/aos.css';


const SingleProductPage = ({ singleCategoryCar }) => {

    const { productName, brandName, carType, productPrice, description, photo, _id, rating } = singleCategoryCar;

    const ratingStyles = {
        itemShapes: StickerStar,
        activeFillColor: '#FF0062',
        inactiveFillColor: '#FFC2D9FF'
    }

    AOS.init({
        offset: 120,
        duration: 1100,
        easing: 'ease',
        delay: 50,
    });

    return (
        <div className="w-full lg:w-2/3 mx-auto">

            <div className="flex flex-col md:flex-row justify-center items-center gap-10 h-[500px] md:h-[380px] bg-[#e7e7e7fb] rounded-t-lg p-10 lg:p-0">
                <div className="flex flex-col justify-center items-start gap-2">
                    <div className="flex justify-start items-center gap-x-4 mb-2">
                        <h3 className="text-[14px] font-semibold text-[gray] rounded-md">{brandName}</h3>
                        <h3 className="text-[14px]  font-semibold text-[gray] rounded-md">{carType}</h3>
                    </div>
                    <h2 className="text-3xl md:text-4xl font-bold text-black">{productName}</h2>
                    <h3 className="text-2xl text-main  font-bold">${productPrice}</h3>
                    <div className="flex justify-center items-start gap-3">
                        <Link to={`/productDetails/${_id}`}><button className="bg-sub px-4 py-1 text-base font-semibold rounded text-white hover:bg-main duration-300">See Details</button></Link>
                        <Link to={`/productUpdate/${_id}`}><button className="bg-sub px-4 py-1 text-base  font-semibold rounded text-white hover:bg-main duration-300">Update Product</button></Link>
                    </div>
                </div>
                <img src={photo} alt=""
                    data-aos="fade-left"
                    data-aos-mirror="true"
                    data-aos-once="false"
                    data-aos-anchor-placement="top-bottom" />

            </div>
            <div className="px-[50px] md:px-[100px] py-10 bg-sub flex flex-col justify-center items-start text-left gap-5 rounded-b-lg">
                <p className="font-normal  text-[#bdbdbd]">{description}</p>
                <Rating
                    style={{ maxWidth: 150 }}
                    itemStyles={ratingStyles}
                    readOnly={true}
                    value={rating} />
            </div>
        </div>
    );
};

export default SingleProductPage;


SingleProductPage.propTypes = {
    singleCategoryCar: PropTypes.object,
}