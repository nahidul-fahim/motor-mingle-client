
import PropTypes from 'prop-types';

const SingleCartData = ({ singleCart, remainingProducts }) => {

    const { photo, productName, productPrice, _id } = singleCart;

    const handleRemoveProduct = id => {
        const productId = _id;

        fetch(`https://motor-mingle-server-j07tt86md-nahidul-islams-projects.vercel.app/productsOnCart/${productId}`, {
            method: 'DELETE',
        })
            .then(res => res.json())
            .then(data => {
                if (data.deletedCount > 0) {
                    remainingProducts(id);
                }
            })
    }


    return (
        <div className='flex flex-col justify-center items-center gap-3 p-10 rounded-lg duration-500'>
            <img src={photo} alt="" />
            <h2 className='text-3xl uppercase font-bold font-boby text-sub'>{productName}</h2>
            <h3 className='text-xl font-bold  text-main'>${productPrice}</h3>
            <button onClick={() => handleRemoveProduct(_id)} className='bg-main px-4 py-2  font-semibold text-white mt-[1rem] hover:shadow-[0_60px_40px_#FF8FB2FF] rounded duration-300'>Remove from Cart</button>
        </div>
    );
};

export default SingleCartData;


SingleCartData.propTypes = {
    singleCart: PropTypes.object,
    remainingProducts: PropTypes.func,
}