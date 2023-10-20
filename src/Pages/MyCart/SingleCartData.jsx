import PropTypes from 'prop-types';

const SingleCartData = ({singleCart}) => {

    const {photo, productName, productPrice } = singleCart;

    return (
        <div className='flex flex-col justify-center items-center gap-3 p-10 rounded-lg duration-500'>
            <img src={photo} alt="" />
            <h2 className='text-3xl uppercase font-bold font-boby text-sub'>{productName}</h2>
            <h3 className='text-xl font-bold font-heading text-main'>${productPrice}</h3>
            <button className='bg-sub px-4 py-2 font-heading font-semibold text-white mt-[1rem] hover:shadow-[0_60px_40px_#FF8FB2FF] hover:bg-main rounded duration-300'>Remove from Cart</button>
        </div>
    );
};

export default SingleCartData;


SingleCartData.propTypes = {
    singleCart: PropTypes.object,
}