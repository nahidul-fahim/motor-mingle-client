import { useParams } from "react-router-dom";
import useAxiosPublic from "../../Hooks/useAxiosPublic/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import LoadingAnimation from "../../Components/Shared/LoadingAnimation/LoadingAnimation";
import AOS from 'aos';
import 'aos/dist/aos.css';
import { FaUser, FaPhone, FaStar, FaRegStar } from "react-icons/fa";
import { SiAdguard } from "react-icons/si";
import { useEffect, useState } from "react";
import useScrollToTop from "../../Hooks/useScrollToTop/useScrollToTop";
import useCurrentUser from "../../Hooks/useCurrentUser/useCurrentUser";
import useAxiosSecure from "../../Hooks/useAxiosSecure/useAxiosSecure";
import { AiTwotoneLike } from "react-icons/ai";
import { ToastContainer, toast, Zoom } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



const ListingDetails = () => {

    // hooks and custom hooks
    const axiosPublic = useAxiosPublic();
    const axiosSecure = useAxiosSecure();
    const { id } = useParams();
    const [showNumber, setShowNumber] = useState(false);
    const scrollToTop = useScrollToTop()
    const { dbCurrentUserPending, dbCurrentUser } = useCurrentUser();
    const [postSaved, setPostSaved] = useState(false);


    // data fetching
    const { isPending, data: singleListing } = useQuery({
        queryKey: ["single-listing", id],
        queryFn: async () => {
            const res = await axiosPublic.get(`/singleListing/${id}`);
            return res.data;
        }
    })



    // scroll to top at initial loading
    useEffect(() => {
        scrollToTop();

        // check if the post is saved
        axiosSecure.get(`/getSingleSavedAd/${id}?email=${dbCurrentUser?.email}`)
            .then(res => {
                const data = res.data;
                if (data) {
                    setPostSaved(true)
                }
                else {
                    setPostSaved(false)
                }
            })
    }, [scrollToTop, axiosSecure, id, dbCurrentUser?.email])




    // get todays date
    const todayDate = new Date().toISOString().split('T')[0];


    // save the data of saved ad to the database
    const handleSaveAd = () => {
        const userEmail = dbCurrentUser?.email;
        const userName = dbCurrentUser?.name;

        // getting current post info
        const { _id: singleAdId, addingDate, carBrand, carCondition, carName, carType, description, engineCapacity, fuelType, manufactureYear, photo, price, purchasingDate, registeredYear, sellerName, sellerPhone, sellerVerificationStatus, sellerPhoto, totalRun, transmissionType, sellStatus } = singleListing;

        // data to send to the database
        const savedAdInfo = { singleAdId, addingDate, carBrand, carCondition, carName, carType, description, engineCapacity, fuelType, manufactureYear, photo, price, purchasingDate, registeredYear, sellerName, sellerPhone, sellerVerificationStatus, sellerPhoto, totalRun, transmissionType, userName, userEmail, todayDate, sellStatus }

        // send to the server
        axiosSecure.post("/newSavedAd", savedAdInfo)
            .then(res => {
                const data = res.data;
                if (data.insertedId) {
                    setPostSaved(true)
                }
            })
            .catch(() => {
                //
            })
    }


    // conditional loading
    if (isPending || dbCurrentUserPending) {
        return <LoadingAnimation />
    }



    // getting every details of singleListing
    const { _id, addingDate, carBrand, carCondition, carName, carType, description, engineCapacity, fuelType, manufactureYear, photo, price, purchasingDate, registeredYear, sellerName, sellerPhone, sellerVerificationStatus, sellerPhoto, totalRun, transmissionType, sellStatus } = singleListing;



    // remove saved item from database
    const handleRemoveSaved = (_id) => {
        axiosSecure.delete(`/removedSavedAd/${_id}?email=${dbCurrentUser?.email}`)
            .then(res => {
                const data = res.data;
                if (data.deletedCount) {
                    setPostSaved(false)
                }
            })
            .catch(err => {
                if (err.code) {
                    setPostSaved(true)
                }
            })
    }



    // place a bid
    const handlePlaceBid = e => {
        e.preventDefault();
        const form = e.target;
        const bidderPhone = form.bidderPhone.value;
        const proposedPrice = form.proposedPrice.value;
        const bidderMessage = form.bidderMessage.value;
        const bidderName = dbCurrentUser?.name;
        const bidderEmail = dbCurrentUser?.email;
        const bidderId = dbCurrentUser?._id;
        const bidPlacedOn = todayDate;
        const productId = _id;

        const bidDetails = { bidderName, bidderEmail, bidderPhone, proposedPrice, bidderMessage, bidPlacedOn, productId, bidderId }

        axiosSecure.post("/newBid", bidDetails)
            .then(res => {
                const data = res.data;
                if (data.insertedId) {
                    successNotify("Placed your bid successfully!")
                    const modal = document.getElementById('biddingModal');
                    modal.close();
                }
            })
            .catch(err => {
                failedNotify(err.code)
            })
    }



    // Success message for successful login
    const successNotify = (message) => toast.success(`${message}`, {
        position: "top-center",
        autoClose: 1500,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
        theme: "colored",
        transition: Zoom,
    });


    // Failed notification for failed login (email-password)
    const failedNotify = (errorMessage) => toast.error(`${errorMessage}`, {
        position: "top-center",
        autoClose: 1500,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
        theme: "colored",
        transition: Zoom,
    });





    // animation
    AOS.init({
        offset: 120,
        duration: 1500,
        easing: 'ease',
        delay: 50,
    });



    return (
        <div className="container mx-auto p-5 flex flex-col justify-center items-center gap-10 font-body overflow-x-hidden">

            {/* product details */}
            <div className="flex flex-col md:flex-row justify-center items-start gap-14 w-full lg:w-5/6 mt-[80px]">

                {/* product image */}
                <div className="w-full md:w-1/2 flex justify-center items-center flex-col"
                    data-aos="fade-down"
                    data-aos-mirror="true"
                    data-aos-once="false"
                    data-aos-anchor-placement="top-bottom">
                    <img src={photo} alt={`${carName} image`} className="flex justify-center items-center" />
                    <div className="flex justify-center items-center gap-3 mt-3">
                        <p className="bg-gray text-black px-3 py-1 rounded-[4px] w-fit">{carBrand}</p>
                        <p className="bg-gray text-black px-3 py-1 rounded-[4px] w-fit">{carType}</p>
                    </div>
                    <p className="text-black font-medium mt-8 text-left w-full">
                        Description <br /> <span className="text-lightBlack font-normal">{description}</span>
                    </p>
                </div>

                {/* product description */}
                <div className="w-fit flex flex-col justify-start items-start gap-1 relative"
                    data-aos="slide-left"
                    data-aos-mirror="true"
                    data-aos-once="false"
                    data-aos-anchor-placement="top-bottom">
                    <p className="text-[14px] text-lightBlack">Posted on: {addingDate}</p>
                    <h3 className="text-2xl font-bold text-black">{carName}</h3>
                    <p className="text-xl font-bold text-sub">${price}</p>
                    <p className="mt-3 text-lightBlack font-medium">Condition: <span className="capitalize text-black font-medium">{carCondition}</span></p>
                    <p className="text-lightBlack font-medium">Total run: <span className="capitalize text-black font-medium">{totalRun} km</span></p>
                    <p className="text-lightBlack font-medium">Engine capacity: <span className="capitalize text-black font-medium">{engineCapacity} cc</span></p>
                    <p className="text-lightBlack font-medium">Fuel type: <span className="capitalize text-black font-medium">{fuelType}</span></p>
                    <p className="text-lightBlack font-medium">Year of manufacture: <span className="capitalize text-black font-medium">{manufactureYear}</span></p>
                    <p className="text-lightBlack font-medium">Purchased on: <span className="capitalize text-black font-medium">{purchasingDate}</span></p>
                    <p className="text-lightBlack font-medium">Registered on: <span className="capitalize text-black font-medium">{registeredYear}</span></p>
                    <p className="text-lightBlack font-medium">Transmission type: <span className="capitalize text-black font-medium">{transmissionType}</span></p>

                    {/* report and bookmark listing */}
                    <div className="mt-4 flex justify-center items-center gap-4">

                        {/* save ad button */}
                        {
                            !postSaved ?
                                <button onClick={handleSaveAd} className="flex justify-center items-center gap-2 text-lightBlack font-medium border-[1px] border-gray rounded px-3 py-1 hover:border-main hover:text-main duration-300"><FaRegStar />Save ad</button>
                                :
                                <button onClick={() => handleRemoveSaved(_id)} className="flex justify-center items-center gap-2 text-main font-medium border-[1px] border-main rounded px-3 py-1 hover:border-lightBlack hover:text-lightBlack duration-300"><FaStar />Saved</button>
                        }

                        {/* report ad button */}

                        {
                            sellStatus === "sold" ?
                                <button disabled className="flex justify-center items-center gap-2 text-lightBlack font-medium border-[1px] border-gray rounded px-3 py-1 disabled:opacity-40 cursor-not-allowed"><AiTwotoneLike /> Place a bid</button>
                                :
                                <button onClick={() => document.getElementById('biddingModal').showModal()}
                                    className="flex justify-center items-center gap-2 text-lightBlack font-medium border-[1px] border-gray rounded px-3 py-1 hover:border-sub hover:text-sub duration-300"><AiTwotoneLike /> Place a bid</button>
                        }

                    </div>

                    {/* show sell status if the product is sold */}
                    {
                        sellStatus === "sold" ?
                            <div className="bg-[#e70a0a] p-5 text-[18px] font-semibold text-white rounded-[100%] w-[60px] h-[60px] flex justify-center items-center absolute top-[-50px] md:top-[-100px] right-[-100px] md:left-0 -rotate-[20deg] shadow-[0_0_50px_#e70a0a63]">
                                Sold
                            </div>
                            :
                            ""
                    }
                </div>

            </div>

            {/* seller information + safety precaution */}
            <div className="w-full flex flex-col md:flex-row justify-center content-stretch items-stretch gap-5 lg:gap-10 mt-14">

                {/* seller information */}
                <div className="flex flex-col justify-center items-start gap-3 bg-[#f0f0f0] px-14 py-8 rounded w-full md:w-1/2">
                    <img src={sellerPhoto} alt={`${sellerName}'s image`} className="w-[70px] h-[70px] rounded-[50%]" />
                    <p className="text-lightBlack font-medium flex justify-start items-center gap-2 mt-3"><FaUser /> For sale by: <span className="font-semibold text-black">{sellerName}</span></p>

                    {/* conditionally show button or phone number */}
                    <p className="text-lightBlack font-medium flex justify-start items-center gap-2"><FaPhone /> Call seller:
                        <span>
                            {
                                showNumber === false ?
                                    <button onClick={() => {
                                        setShowNumber(true)
                                    }}
                                        className="bg-[#17bbec] text-white px-2 py-1 rounded">Show number</button>
                                    :
                                    <span className="font-semibold text-black">{sellerPhone}</span>
                            }
                        </span> </p>

                    {/* member verification status */}
                    <p className={`${sellerVerificationStatus !== "verified" ? "text-[red] bg-[#ffd6d6]" : "text-[green] bg-[#daffda]"} px-4 py-1 rounded-md font-medium flex justify-start items-center gap-2 capitalize`}>{sellerVerificationStatus} member</p>
                </div>


                {/* safety tips */}
                <div className="flex flex-col justify-center items-start gap-3 bg-[#e8fffb] px-14 py-8 rounded w-full md:w-1/2">
                    <p className="text-[#0a800a] text-xl font-semibold flex justify-center items-center gap-2"><SiAdguard /> Safety tips</p>
                    <ul className="list-disc pl-12 flex flex-col justify-start items-start gap-2 mt-2">
                        <li>Meet in safe and public place</li>
                        <li>{'Don\'t'} pay in advance</li>
                        <li>Try to keep things local</li>
                        <li>Never give out financial information</li>
                    </ul>
                </div>

            </div>


            {/* modal to bid on a listing */}
            <dialog id="biddingModal" className="modal modal-bottom sm:modal-middle font-heading">
                <div className="modal-box w-full flex flex-col justify-center items-center">
                    <h3 className="font-bold text-2xl text-black">Place your bid!</h3>
                    <div className="modal-action w-full">
                        <form onSubmit={handlePlaceBid} method="dialog" className="w-full flex flex-col justify-start items-start p-5 gap-2">

                            {/* name */}
                            <label className="text-lightBlack">Your name</label>
                            <input readOnly type="text" name="bidderName" id="bidderName" value={dbCurrentUser?.name} className="w-full border-[1px] border-gray focus:outline-none focus:border-lightBlack px-5 py-2 rounded-lg text-black" />

                            {/* email */}
                            <label className="text-lightBlack mt-3">Your email</label>
                            <input readOnly type="email" name="bidderEmail" id="bidderEmail" value={dbCurrentUser?.email} className="w-full border-[1px] border-gray focus:outline-none focus:border-lightBlack px-5 py-2 rounded-lg text-black" />

                            {/* phone */}
                            <label className="text-lightBlack mt-3">Your phone *</label>
                            <input required type="tel" name="bidderPhone" id="bidderPhone" placeholder="Your phone" className="w-full border-[1px] border-gray focus:outline-none focus:border-lightBlack px-5 py-2 rounded-lg text-black" />

                            {/* proposed price */}
                            <label className="text-lightBlack mt-3">Proposed price ($) *</label>
                            <input type="number" min={1000} step={10} name="proposedPrice" id="proposedPrice" defaultValue={price} className="w-full border-[1px] border-gray focus:outline-none focus:border-lightBlack px-5 py-2 rounded-lg text-black" />

                            {/* message */}
                            <label className="text-lightBlack mt-3">Message</label>
                            <textarea name="bidderMessage" placeholder="Enter message" id="bidderMessage" className="w-full border-[1px] border-gray focus:outline-none focus:border-lightBlack px-5 py-2 rounded-lg text-black"></textarea>

                            <input type="submit" value="Submit bid" className="bg-black text-white font-medium hover:bg-sub duration-500 px-4 py-2 mt-3 rounded-lg cursor-pointer" />
                        </form>

                        <ToastContainer closeButton={false} />
                    </div>
                </div>
            </dialog>


        </div>
    );
};

export default ListingDetails;