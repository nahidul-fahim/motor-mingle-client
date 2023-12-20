import { useParams } from "react-router-dom";
import { Flip, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AOS from 'aos';
import 'aos/dist/aos.css';
import useSingleProduct from "../../../../Hooks/useSingleProduct/useSingleProduct";
import LoadingAnimation from "../../../../Components/Shared/LoadingAnimation/LoadingAnimation";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure/useAxiosSecure";



const UpdateProduct = () => {


    // hooks and custom hooks
    const productToUpdate = useParams();
    const { singleProductPending, singleProduct } = useSingleProduct(productToUpdate.id)
    const axiosSecure = useAxiosSecure();


    // codtional loading if singleProduct is not loaded
    if (singleProductPending) {
        return <LoadingAnimation />
    }


    // get todays date
    const todayDate = new Date().toISOString().split('T')[0];



    // get the product details
    const { _id, productName, brandName, carType, productPrice, description, photo, rating } = singleProduct;
    const currentProductId = _id;


    // handle product update
    const handleUpdateProduct = e => {
        e.preventDefault();
        const form = e.target;
        const productName = form.productName.value;
        const brandName = form.brandName.value;
        const carType = form.carType.value;
        const productPrice = form.productPrice.value;
        const rating = form.rating.value;
        const photo = form.photo.value;
        const updateDate = todayDate;

        const updateProductInfo = { productName, brandName, carType, productPrice, rating, description, photo, updateDate }


        // send the updated data to server side
        axiosSecure.put(`/updateProduct/${currentProductId}`, updateProductInfo)
            .then(res => {
                const data = res.data;
                if (data.modifiedCount > 0) {
                    successNotify()
                }
            })
            .catch(err => {
                failureNotify(err.code + "|" + err.message)
            })
    }


    // Successful product adding message
    const successNotify = () => toast.success('Product updated successfully!', {
        position: "top-center",
        autoClose: 1800,
        hideProgressBar: true,
        closeOnClick: false,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
        theme: "colored",
        transition: Flip,
    });

    // Failed product adding message
    const failureNotify = (errorMessage) => toast.error(`${errorMessage}`, {
        position: "top-center",
        autoClose: 1800,
        hideProgressBar: true,
        closeOnClick: false,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
        theme: "colored",
        transition: Flip,
    });

    AOS.init({
        offset: 120,
        duration: 1500,
        easing: 'ease',
        delay: 50,
    });


    return (
        <div className="container mx-auto p-5 mt-[70px] md:mt-[80px]">
            <h2 className="text-center text-4xl md:text-5xl font-extrabold text-main uppercase"
                data-aos="slide-right"
                data-aos-mirror="true"
                data-aos-once="false"
                data-aos-anchor-placement="top-bottom">Update product</h2>
            <form onSubmit={handleUpdateProduct}
                className="flex flex-col justify-center items-center gap-14 mt-[70px] md:mt-[80px]  text-[18px] font-medium">

                <div className="flex flex-col lg:flex-row justify-between items-center gap-[40px] lg:gap-[100px] w-full lg:w-2/3 lg:p-0">
                    <input required type="text" name="productName" id="productName" placeholder="Enter car name" className="w-full lg:w-1/2 px-5 py-3 border-b-[1px] border-[#ff2c8f38] focus:outline-none focus:border-[#ff2c8ff6]" defaultValue={productName} />
                    <input required type="text" name="brandName" id="brandName" placeholder="Enter brand name" className="w-full lg:w-1/2 px-5 py-3 border-b-[1px] border-[#ff2c8f38] focus:outline-none focus:border-[#ff2c8ff6]" defaultValue={brandName} />
                </div>

                <div className="flex flex-col lg:flex-row justify-between items-center gap-[40px] lg:gap-[100px] w-full lg:w-2/3 lg:p-0">
                    <input required type="text" name="carType" id="carType" placeholder="Enter car type" className="w-full lg:w-1/2 px-5 py-3 border-b-[1px] border-[#ff2c8f38] focus:outline-none focus:border-[#ff2c8ff6]" defaultValue={carType} />
                    <input required type="number" name="productPrice" id="productPrice" min="1000" placeholder="Price ($)" className="w-full lg:w-1/2 px-5 py-3 border-b-[1px] border-[#ff2c8f38] focus:outline-none focus:border-[#ff2c8ff6]" defaultValue={productPrice} />
                    <input required type="number" name="rating" id="rating" min="1" max="5" step=".01" placeholder="Rating" className="w-full lg:w-1/2 px-5 py-3 border-b-[1px] border-[#ff2c8f38] focus:outline-none focus:border-[#ff2c8ff6]" defaultValue={rating} />
                </div>

                <input required type="text" name="photo" id="photo" placeholder="Enter car photo URL" className="w-full lg:w-2/3 px-5 py-3 border-b-[1px] border-[#ff2c8f38] focus:outline-none focus:border-[#ff2c8ff6]" defaultValue={photo} />

                <input type="submit" value="Update the Product" className="w-full lg:w-2/3 px-5 py-3 bg-sub mt-5 rounded-md text-white hover:bg-main duration-300  font-semibold text-xl cursor-pointer" />
            </form>

            <ToastContainer closeButton={false} />

        </div>
    );
};

export default UpdateProduct;