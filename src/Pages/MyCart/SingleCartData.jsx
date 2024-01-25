import AOS from 'aos';
import 'aos/dist/aos.css';

const SingleCartData = ({ singleCart, handleDelete }) => {

    const { photo, productName, productPrice, _id } = singleCart;


    AOS.init({
        offset: 120,
        duration: 2000,
        easing: 'ease',
        delay: 50,
    });

    return (
        <div className='flex flex-col justify-center items-center gap-3 p-10 rounded-lg duration-500'>
            <img src={photo} alt="" />
            <h2 className='text-3xl capitalize font-bold font-boby text-second text-center'>{productName}</h2>
            <h3 className='text-xl font-bold  text-main'>${productPrice}</h3>
            <button onClick={() => handleDelete(_id)} className='bg-main px-4 py-2  font-semibold text-white mt-[1rem] hover:shadow-[0_60px_40px_#FF8FB2FF] rounded duration-300'
                data-aos="fade"
                data-aos-mirror="true"
                data-aos-once="false"
                data-aos-anchor-placement="top-bottom">Remove from Cart</button>
        </div>
    );
};

export default SingleCartData;