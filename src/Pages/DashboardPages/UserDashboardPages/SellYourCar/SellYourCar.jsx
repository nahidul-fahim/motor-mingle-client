import { Flip, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useRef, useState } from 'react';
import { FaUpload } from 'react-icons/fa';
import useAxiosPublic from '../../../../Hooks/useAxiosPublic/useAxiosPublic';
import useAxiosSecure from '../../../../Hooks/useAxiosSecure/useAxiosSecure';



// image hosting (imgBB) key and url
const imgHostingKey = import.meta.env.VITE_IMAGE_HOSTING_KEY
const imgUploadUrl = `https://api.imgbb.com/1/upload?key=${imgHostingKey}`



const SellYourCar = () => {


    //hooks and custom hooks
    const [selectedImageName, setSelectedImageName] = useState('');
    const [selectedImage, setSelectedImage] = useState(null);
    const addingForm = useRef(null);
    const axiosPublic = useAxiosPublic();
    const axiosSecure = useAxiosSecure();



    // get today's date
    const todayDate = new Date().toISOString().split('T')[0]


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



    // handle product upload
    const handleAddOldProduct = e => {
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
                    // if the image is uploaded succesfully proceed further
                    const data = res.data;
                    if (data) {
                        const productName = form.productName.value;
                        const brandName = form.brandName.value;
                        const carType = form.carType.value;
                        const productPrice = form.productPrice.value;
                        const rating = form.rating.value;
                        const description = form.description.value;
                        const photo = res.data.data.display_url;
                        const addingDate = todayDate;

                        //getting the form info into an object
                        const formInfo = { productName, brandName, carType, productPrice, rating, description, photo, addingDate }

                        // Send the data to the server and databse

                        axiosSecure.post("/products", formInfo)
                            .then(res => {
                                const data = res.data;
                                if (data.insertedId) {
                                    successNotify();
                                    addingForm.current.reset();
                                }
                            })
                            // db product posting failure
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
    const successNotify = () => toast.success('New product added successfully!', {
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
        <div className="flex flex-col justify-center items-center w-full h-full">
            <h2 className="text-center text-4xl md:text-5xl font-extrabold text-main  uppercase"
                data-aos="slide-right"
                data-aos-mirror="true"
                data-aos-once="false"
                data-aos-anchor-placement="top-bottom">Sell Your Old Car</h2>
            <form ref={addingForm} onSubmit={handleAddOldProduct}
                className="flex flex-col justify-center items-center gap-10 mt-[70px] md:mt-[80px] text-[18px] font-medium w-full lg:w-[90%]">

                {/* car name, car brand, car type */}
                <div className='w-full flex flex-col lg:flex-row justify-center items-center gap-8'>
                    {/* car name */}
                    <div className='font-body flex flex-col justify-start items-start gap-3 w-full lg:w-1/3'>
                        <label>Car name <span className='text-[red]'>*</span></label>
                        <input type="text" id='carName' name='carName' placeholder='Enter car name' className='w-full border-[1px] border-gray px-4 py-2 rounded-[3px] focus:outline-none focus:border-lightMain' />
                    </div>
                    {/* brand name */}
                    <div className='font-body flex flex-col justify-start items-start gap-3 w-full lg:w-1/3'>
                        <label>Car brand <span className='text-[red]'>*</span></label>
                        <input type="text" placeholder='Enter brand name' id='carBrand' name='carBrand' className='w-full border-[1px] border-gray px-4 py-2 rounded-[3px] focus:outline-none focus:border-lightMain' />
                    </div>
                    {/* car type */}
                    <div className='font-body flex flex-col justify-start items-start gap-3 w-full lg:w-1/3'>
                        <label>Car type <span className='text-[red]'>*</span></label>
                        <input type="text" placeholder='Enter car type' id='carType' name='carType' className='w-full border-[1px] border-gray px-4 py-2 rounded-[3px] focus:outline-none focus:border-lightMain' />
                    </div>
                </div>


                {/* car price, car condition, car purchasing date */}
                <div className='w-full flex flex-col lg:flex-row justify-center items-center gap-8'>
                    {/* car price */}
                    <div className='font-body flex flex-col justify-start items-start gap-3 w-full lg:w-1/3'>
                        <label>Car price ($) <span className='text-[red]'>*</span></label>
                        <input type="number" id='price' name='price' min="1000" step="1" placeholder='Enter car price' className='w-full border-[1px] border-gray px-4 py-2 rounded-[3px] focus:outline-none focus:border-lightMain' />
                    </div>
                    {/* car condition */}
                    <div className='font-body flex flex-col justify-start items-start gap-3 w-full lg:w-1/3'>
                        <label>Car condition <span className='text-[red]'>*</span></label>
                        <select id='carCondition' name='carCondition' className='w-full border-[1px] border-gray px-4 py-2 rounded-[3px] focus:outline-none focus:border-lightMain'>
                            <option selected disabled>Choose car condition</option>
                            <option value="super fresh">Super Fresh</option>
                            <option value="fresh">Fresh</option>
                            <option value="moderate">Moderate</option>
                        </select>
                    </div>
                    {/* car purchasing date */}
                    <div className='font-body flex flex-col justify-start items-start gap-3 w-full lg:w-1/3'>
                        <label>Purchased on <span className='text-[red]'>*</span></label>
                        <input type="date" max={todayDate} id='purchasingDate' name='purchasingDate' className='w-full border-[1px] border-gray px-4 py-2 rounded-[3px] focus:outline-none focus:border-lightMain' />
                    </div>
                </div>

                {/* car description */}
                <div className='w-full flex justify-center items-center gap-8'>
                    <div className='font-body flex flex-col justify-start items-start gap-3 w-full'>
                        <label>Car description <span className='text-[red]'>*</span></label>
                        <textarea id='description' name='description' placeholder='Enter details about your car' className='w-full border-[1px] border-gray px-4 py-2 rounded-[3px] focus:outline-none focus:border-lightMain' />
                    </div>
                </div>

                {/* car image select */}
                <div className='w-full flex justify-center items-center gap-8'>
                    <div className='font-body flex flex-col justify-start items-start gap-3 w-full'>
                        {/* image file input */}
                        <label
                            htmlFor="image"
                            className="cursor-pointer relative focus:outline-none border-[1px] py-2 px-4 border-gray text-lightBlack focus:border-lightMain transition-all duration-500 w-full flex justify-center items-center gap-2"
                        >
                            <FaUpload /> {selectedImageName.length > 25 ? selectedImageName.slice(0, 25) + "..." : selectedImageName || "Choose product image"}
                            <input
                                type="file"
                                name="image"
                                id="image"
                                accept="image/*"
                                onChange={handleImageInput}
                                className="cursor-pointer opacity-0 absolute top-0 left-0 w-full" />
                        </label>
                    </div>
                </div>

                {/* submit button */}
                <input type="submit" value="Publish Ad" className="w-full lg:w-2/3 px-5 py-3 bg-sub mt-5 rounded-md text-white hover:bg-main duration-300  font-semibold text-xl  cursor-pointer" />


            </form>

            <ToastContainer closeButton={false} />

        </div>
    );
};

export default SellYourCar;