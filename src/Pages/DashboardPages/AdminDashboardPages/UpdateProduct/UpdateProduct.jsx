import { useParams } from "react-router-dom";
import { Flip, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AOS from 'aos';
import 'aos/dist/aos.css';
import useSingleProduct from "../../../../Hooks/useSingleProduct/useSingleProduct";
import LoadingAnimation from "../../../../Components/Shared/LoadingAnimation/LoadingAnimation";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure/useAxiosSecure";
import { useState } from "react";
import { FaUpload } from "react-icons/fa";
import useAxiosPublic from "../../../../Hooks/useAxiosPublic/useAxiosPublic";


// image hosting (imgBB) key and url
const imgHostingKey = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const imgUploadUrl = `https://api.imgbb.com/1/upload?key=${imgHostingKey}`;



const UpdateProduct = () => {

    // hooks and custom hooks
    const productToUpdate = useParams();
    const { singleProductPending, singleProduct } = useSingleProduct(productToUpdate.id)
    const axiosSecure = useAxiosSecure();
    const axiosPublic = useAxiosPublic();
    const [selectedImageName, setSelectedImageName] = useState('');
    const [selectedImage, setSelectedImage] = useState(null);


    // image input and get the file name
    const handleImageInput = e => {
        e.preventDefault();
        const fileInput = e.target;
        if (fileInput.files.length > 0) {
            const file = { image: fileInput.files[0] }
            const fileName = fileInput.files[0].name;
            setSelectedImageName(fileName);
            setSelectedImage(file)
        }
        else {
            setSelectedImageName('')
        }
    }





    // codtional loading if singleProduct is not loaded
    if (singleProductPending) {
        return <LoadingAnimation />
    }


    // get todays date
    const todayDate = new Date().toISOString().split('T')[0];



    // get the product details
    const { _id, productName, brandName, carType, productPrice, description, rating } = singleProduct;
    const currentProductId = _id;


    // handle product update
    const handleUpdateProduct = e => {
        e.preventDefault();
        const form = e.target;

        // if selected image file is availble, upload the image to imgbb
        if (selectedImage) {
            axiosPublic.post(imgUploadUrl, selectedImage, {
                headers: {
                    'content-type': 'multipart/form-data'
                }
            })
                .then(res => {
                    const data = res.data;
                    if (data) {
                        const photo = data.data.display_url;
                        const productName = form.productName.value;
                        const brandName = form.brandName.value;
                        const carType = form.carType.value;
                        const productPrice = form.productPrice.value;
                        const rating = form.rating.value;
                        const updateDate = todayDate;

                        const updateProductInfo = { productName, brandName, carType, productPrice, rating, description, photo, updateDate }


                        // send the updated data to server side
                        axiosSecure.put(`/updateproduct/${currentProductId}`, updateProductInfo)
                            .then(res => {
                                const data = res.data;
                                if (data.modifiedCount > 0) {
                                    successNotify()
                                }
                            })
                            // file upload to database error
                            .catch(err => {
                                failureNotify(err.code + "|" + err.message)
                            })
                    }
                })
                // imgbb file upload error
                .catch(err => failureNotify(err.code + "|" + err.message))
        }
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

            {/* product updating form */}
            <form onSubmit={handleUpdateProduct}
                className="flex flex-col justify-center items-center gap-14 mt-[70px] md:mt-[80px]  text-[18px] font-medium w-full lg:w-[90%]">

                {/* car name and brand name */}
                <div className="flex flex-col lg:flex-row justify-between items-center gap-[40px] lg:gap-[100px] lg:p-0 w-full">
                    <input required type="text" name="productName" id="productName" defaultValue={productName} className="w-full lg:w-1/2 px-5 py-3 border-b-[1px] border-lightMain focus:outline-none focus:border-sub" />
                    <input required type="text" name="brandName" id="brandName" defaultValue={brandName} className="w-full lg:w-1/2 px-5 py-3 border-b-[1px] border-lightMain focus:outline-none focus:border-sub" />
                </div>

                {/* car type, pricing and rating */}
                <div className="flex flex-col lg:flex-row justify-between items-center gap-[40px] lg:gap-[100px] lg:p-0 w-full">
                    <input required type="text" name="carType" id="carType" defaultValue={carType} className="w-full lg:w-1/3 px-5 py-3 border-b-[1px] border-lightMain focus:outline-none focus:border-sub" />
                    <input required type="number" name="productPrice" id="productPrice" min="1000" defaultValue={productPrice} className="w-full lg:w-1/3 px-5 py-3 border-b-[1px] border-lightMain focus:outline-none focus:border-sub" />
                    <input required type="number" name="rating" id="rating" min="1" max="5" step=".01" defaultValue={rating} className="w-full lg:w-1/3 px-5 py-3 border-b-[1px] border-lightMain focus:outline-none focus:border-sub" />
                </div>

                {/* product description */}
                <textarea required rows="2" name="description" id="description" defaultValue={description} className="w-full px-5 py-3 border-b-[1px] border-lightMain focus:outline-none focus:border-sub" />


                {/* image file input */}
                <label
                    htmlFor="image"
                    className="cursor-pointer relative focus:outline-none border-b-[1px] pb-2 border-lightMain focus:border-main transition-all duration-500 w-full lg:w-2/3 text-[gray] flex justify-center items-center gap-2"
                >
                    <FaUpload /> {selectedImageName.length > 25 ? selectedImageName.slice(0, 25) + "..." : selectedImageName || "Choose updated image"}
                    <input
                        type="file"
                        name="image"
                        id="image"
                        accept="image/*"
                        onChange={handleImageInput}
                        className="cursor-pointer opacity-0 absolute top-0 left-0 w-full" />
                </label>


                {/* submit button */}
                <input type="submit" value="Update Product" className="w-full lg:w-2/3 px-5 py-3 bg-sub mt-5 rounded-md text-white hover:bg-main duration-300  font-semibold text-xl  cursor-pointer" />
            </form>

            <ToastContainer closeButton={false} />

        </div>
    );
};

export default UpdateProduct;