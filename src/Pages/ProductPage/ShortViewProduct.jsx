import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const ShortViewProduct = ({ singleProduct }) => {

    const { photo, productName, productPrice, _id } = singleProduct;

    return (
        <div className='flex flex-col justify-center items-center gap-3 p-10 rounded-lg duration-500'>
            <img src={photo} alt="" />
            <h2 className='text-3xl uppercase font-bold font-boby text-second text-center'>{productName}</h2>
            <h3 className='text-xl font-bold text-main'>${productPrice}</h3>
            <Link to={`/productDetails/${_id}`}><button className="bg-main px-3 py-1  font-semibold text-white mt-[1rem] duration-500 hover:shadow-[0_60px_40px_#FF8FB2FF] rounded">See Details</button></Link>
        </div>
    );
};

export default ShortViewProduct;

ShortViewProduct.propTypes = {
    singleProduct: PropTypes.object
}