import { Flip, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useRef, useState } from 'react';
import { FaUpload } from 'react-icons/fa';
import useAxiosPublic from '../../../../Hooks/useAxiosPublic/useAxiosPublic';
import useAxiosSecure from '../../../../Hooks/useAxiosSecure/useAxiosSecure';
import useCurrentUser from '../../../../Hooks/useCurrentUser/useCurrentUser';
import LoadingAnimation from '../../../../Components/Shared/LoadingAnimation/LoadingAnimation';



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
    const { dbCurrentUserPending, dbCurrentUser } = useCurrentUser();

    // getting the form select field options in an array

    // car brands
    let allCarBrands = ["Acura", "Alfa Romeo", "Aston Martin", "Audi", "Bentley", "BMW", "Bugatti", "Buick", "Cadillac", "Chevrolet", "Chrysler", "Citroën", "Dodge", "Ferrari", "Fiat", "Ford", "Genesis", "GMC", "Honda", "Hyundai", "Infiniti", "Jaguar", "Jeep", "Kia", "Lamborghini", "Land Rover", "Lexus", "Lincoln", "Lotus", "Maserati", "Mazda", "McLaren", "Mercedes-Benz", "Mini", "Mitsubishi", "Nissan", "Pagani", "Peugeot", "Porsche", "Ram", "Rolls-Royce", "Subaru", "Suzuki", "Tesla", "Toyota", "Volkswagen", "Volvo"];

    // car types
    let allCarTypes = ["Sedans and Coupes", "SUVs and Crossovers", "Sports Cars", "Trucks and Pickups", "Luxury Cars", "Electric and Hybrid Cars"]

    // fuel types
    let allFuelTypes = ["Gasoline", "Diesel", "Electric", "Hybrid", "Petrol", "CNG", "LPG", "Octane", "Other fuel type"
    ]

    // transmission types
    let allTransmissionTypes = ["Automatic", "Manual", "Semi-Automatic", "Continuously Variable Transmission (CVT)", "Dual-Clutch Transmission (DCT)"]





    // conditional loading
    if (dbCurrentUserPending) {
        return <LoadingAnimation />
    }



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



    // handle old car product upload for sale by user
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
                        const carName = form.carName.value;
                        const carBrand = form.carBrand.value;
                        const carType = form.carType.value;
                        const priceInString = form.price.value;
                        const carCondition = form.carCondition.value;
                        const purchasingDate = form.purchasingDate.value;
                        const manufactureYearInString = form.manufactureYear.value;
                        const engineCapacityInString = form.engineCapacity.value;
                        const totalRunInString = form.totalRun.value;
                        const fuelType = form.fuelType.value;
                        const transmissionType = form.transmissionType.value;
                        const registeredYearInString = form.registeredYear.value;
                        const description = form.description.value;
                        const photo = res.data.data.display_url;
                        const addingDate = todayDate;
                        const sellerId = dbCurrentUser?._id;
                        const sellerName = dbCurrentUser?.name;
                        const sellerEmail = dbCurrentUser?.email;
                        const sellerPhoto = dbCurrentUser?.photo;
                        const sellerVerificationStatus = dbCurrentUser?.verifyStatus;
                        const price = parseInt(priceInString);
                        const sellerPhone = form.sellerPhone.value;
                        const approvalStatus = "pending";
                        const registeredYear = parseInt(registeredYearInString);
                        const manufactureYear = parseInt(manufactureYearInString);
                        const engineCapacity = parseInt(engineCapacityInString);
                        const totalRun = parseInt(totalRunInString);


                        //getting the form info into an object
                        const formInfo = { carName, carBrand, carType, price, carCondition, purchasingDate, description, photo, approvalStatus, addingDate, manufactureYear, engineCapacity, totalRun, fuelType, transmissionType, registeredYear, sellerId, sellerName, sellerEmail, sellerPhone, sellerVerificationStatus, sellerPhoto }

                        // Send the data to the server and databse

                        axiosSecure.post("/oldproduct", formInfo)
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
            <h2 className="text-center text-4xl md:text-5xl font-extrabold text-main uppercase"
                data-aos="slide-right"
                data-aos-mirror="true"
                data-aos-once="false"
                data-aos-anchor-placement="top-bottom">Sell Your Old Car</h2>
            <form ref={addingForm} onSubmit={handleAddOldProduct}
                className="flex flex-col justify-center items-center gap-10 mt-[70px] md:mt-[80px] text-[18px] font-medium w-full lg:w-[90%]">

                {/* car name, car brand, car type */}
                <div className='w-full flex flex-col lg:flex-row justify-center items-center gap-8'>

                    {/* car model */}
                    <div className='font-body flex flex-col justify-start items-start gap-3 w-full lg:w-1/3'>
                        <label>Car model <span className='text-[red]'>*</span></label>
                        <input required type="text" id='carName' name='carName' placeholder='Enter car model' className='w-full border-[1px] border-gray px-4 py-2 rounded-[3px] focus:outline-none focus:border-lightMain' />
                    </div>

                    {/* brand name */}
                    <div className='font-body flex flex-col justify-start items-start gap-3 w-full lg:w-1/3'>
                        <label>Choose car brand <span className='text-[red]'>*</span></label>
                        <select required id='carBrand' name='carBrand' className='w-full border-[1px] border-gray px-4 py-2 rounded-[3px] focus:outline-none focus:border-lightMain'>
                            {
                                allCarBrands.map((carBrand, index) =>
                                    <option key={index} value={carBrand} className='capitalize'>{carBrand}</option>)
                            }
                        </select>
                    </div>

                    {/* car type */}
                    <div className='font-body flex flex-col justify-start items-start gap-3 w-full lg:w-1/3'>
                        <label>Choose car type <span className='text-[red]'>*</span></label>
                        <select required id='carType' name='carType' className='w-full border-[1px] border-gray px-4 py-2 rounded-[3px] focus:outline-none focus:border-lightMain'>
                            {
                                allCarTypes.map((carType, index) =>
                                    <option key={index} value={carType} className='capitalize'>{carType}</option>)
                            }
                        </select>
                    </div>
                </div>


                {/* car price, car condition, car purchasing date */}
                <div className='w-full flex flex-col lg:flex-row justify-center items-center gap-8'>
                    {/* car price */}
                    <div className='font-body flex flex-col justify-start items-start gap-3 w-full lg:w-1/3'>
                        <label>Car price ($) <span className='text-[red]'>*</span></label>
                        <input required type="number" id='price' name='price' min="1000" step="1" placeholder='Enter car price' className='w-full border-[1px] border-gray px-4 py-2 rounded-[3px] focus:outline-none focus:border-lightMain' />
                    </div>

                    {/* car condition */}
                    <div className='font-body flex flex-col justify-start items-start gap-3 w-full lg:w-1/3'>
                        <label>Car condition <span className='text-[red]'>*</span></label>
                        <select required id='carCondition' defaultValue={"Choose car condition"} name='carCondition' className='w-full border-[1px] border-gray px-4 py-2 rounded-[3px] focus:outline-none focus:border-lightMain'>
                            <option disabled>Choose car condition</option>
                            <option value="super fresh">Super Fresh</option>
                            <option value="fresh">Fresh</option>
                            <option value="moderate">Moderate</option>
                        </select>
                    </div>

                    {/* car purchasing date */}
                    <div className='font-body flex flex-col justify-start items-start gap-3 w-full lg:w-1/3'>
                        <label>Purchased on <span className='text-[red]'>*</span></label>
                        <input required type="date" max={todayDate} id='purchasingDate' name='purchasingDate' className='w-full border-[1px] border-gray px-4 py-2 rounded-[3px] focus:outline-none focus:border-lightMain' />
                    </div>
                </div>


                {/* Year of manufacture, Engine capacity, total kilometers run */}
                <div className='w-full flex flex-col lg:flex-row justify-center items-center gap-8'>
                    {/* Year of manufacture */}
                    <div className='font-body flex flex-col justify-start items-start gap-3 w-full lg:w-1/3'>
                        <label>Manufacture year <span className='text-[red]'>*</span></label>
                        <input required type="number" id='manufactureYear' name='manufactureYear' min="1925" step="1" placeholder='Enter manufacture year' className='w-full border-[1px] border-gray px-4 py-2 rounded-[3px] focus:outline-none focus:border-lightMain' />
                    </div>

                    {/* Engine capacity */}
                    <div className='font-body flex flex-col justify-start items-start gap-3 w-full lg:w-1/3'>
                        <label>Engine capacity <span className='text-[red]'>*</span></label>
                        <input required type="number" id='engineCapacity' name='engineCapacity' min="100" step="1" placeholder='Enter engine capacity' className='w-full border-[1px] border-gray px-4 py-2 rounded-[3px] focus:outline-none focus:border-lightMain' />
                    </div>

                    {/* total kilometers run  */}
                    <div className='font-body flex flex-col justify-start items-start gap-3 w-full lg:w-1/3'>
                        <label>Total run (km) <span className='text-[red]'>*</span></label>
                        <input required type="number" id='totalRun' name='totalRun' min="1" step="1" placeholder='Enter total run' className='w-full border-[1px] border-gray px-4 py-2 rounded-[3px] focus:outline-none focus:border-lightMain' />
                    </div>
                </div>


                {/* fuel type, transmission type, registered year */}
                <div className='w-full flex flex-col lg:flex-row justify-center items-center gap-8'>
                    {/* Fuel type */}
                    <div className='font-body flex flex-col justify-start items-start gap-3 w-full lg:w-1/3'>
                        <label>Choose fuel type <span className='text-[red]'>*</span></label>
                        <select required id='fuelType' name='fuelType' className='w-full border-[1px] border-gray px-4 py-2 rounded-[3px] focus:outline-none focus:border-lightMain'>
                            {
                                allFuelTypes.map((fuelType, index) =>
                                    <option key={index} value={fuelType} className='capitalize'>{fuelType}</option>)
                            }
                        </select>
                    </div>

                    {/* transmission type */}
                    <div className='font-body flex flex-col justify-start items-start gap-3 w-full lg:w-1/3'>
                        <label>Choose trnasmission type <span className='text-[red]'>*</span></label>
                        <select required id='transmissionType' name='transmissionType' className='w-full border-[1px] border-gray px-4 py-2 rounded-[3px] focus:outline-none focus:border-lightMain'>
                            {
                                allTransmissionTypes.map((transMissionType, index) =>
                                    <option key={index} value={transMissionType} className='capitalize'>{transMissionType}</option>)
                            }
                        </select>
                    </div>

                    {/* registered year  */}
                    <div className='font-body flex flex-col justify-start items-start gap-3 w-full lg:w-1/3'>
                        <label>Registered year <span className='text-[#7a7a7a]'>(opt)</span></label>
                        <input type="number" id='registeredYear' name='registeredYear' min="1980" step="1" placeholder='Enter registered year' className='w-full border-[1px] border-gray px-4 py-2 rounded-[3px] focus:outline-none focus:border-lightMain' />
                    </div>
                </div>


                {/* car description */}
                <div className='w-full flex justify-center items-center gap-8'>
                    <div className='font-body flex flex-col justify-start items-start gap-3 w-full'>
                        <label>Car description <span className='text-[red]'>*</span></label>
                        <textarea required id='description' name='description' placeholder='Enter details about your car' className='w-full border-[1px] border-gray px-4 py-2 rounded-[3px] focus:outline-none focus:border-lightMain' />
                    </div>
                </div>


                {/* email, phone number */}
                <div className='w-full flex flex-col lg:flex-row justify-center items-center gap-8'>

                    {/* email */}
                    <div className='font-body flex flex-col justify-start items-start gap-3 w-full lg:w-1/2'>
                        <label>Your email</label>
                        <input readOnly type="email" id='sellerEmail' name='sellerEmail' value={dbCurrentUser?.email} className='w-full border-[1px] border-gray px-4 py-2 rounded-[3px] focus:outline-none' />
                    </div>

                    {/* phone number */}
                    <div className='font-body flex flex-col justify-start items-start gap-3 w-full lg:w-1/2'>
                        <label>Enter phone number <span className='text-[red]'>*</span></label>
                        <input required type="tel" id='sellerPhone' name='sellerPhone' placeholder='Enter your phone number' className='w-full border-[1px] border-gray px-4 py-2 rounded-[3px] focus:outline-none focus:border-lightMain' />
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
                                required
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