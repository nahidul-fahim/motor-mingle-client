import { useParams } from "react-router-dom";
import useAxiosPublic from "../../Hooks/useAxiosPublic/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import LoadingAnimation from "../../Components/Shared/LoadingAnimation/LoadingAnimation";
import AOS from 'aos';
import 'aos/dist/aos.css';
import { FaUser, FaPhone } from "react-icons/fa";
import { SiAdguard } from "react-icons/si";
import { useEffect, useState } from "react";
import useScrollToTop from "../../Hooks/useScrollToTop/useScrollToTop";



const ListingDetails = () => {

    // hooks and custom hooks
    const axiosPublic = useAxiosPublic();
    const { id } = useParams();
    const [showNumber, setShowNumber] = useState(false);
    const scrollToTop = useScrollToTop()



    // scroll to top at inital loading
    useEffect(() => {
        scrollToTop();
    }, [scrollToTop])


    // data fetching
    const { isPending, data: singleListing } = useQuery({
        queryKey: ["single-listing", id],
        queryFn: async () => {
            const res = await axiosPublic.get(`/singlelisting/${id}`);
            return res.data;
        }
    })


    // conditional loading
    if (isPending) {
        return <LoadingAnimation />
    }

    console.log(singleListing)

    const { addingDate, carBrand, carCondition, carName, carType, description, engineCapacity, fuelType, manufactureYear, photo, price, purchasingDate, registeredYear, sellerName, sellerPhone, sellerVerificationStatus, sellerPhoto, totalRun, transmissionType } = singleListing;



    // animation
    AOS.init({
        offset: 120,
        duration: 1500,
        easing: 'ease',
        delay: 50,
    });




    return (
        <div className="container mx-auto p-5 flex flex-col justify-center items-center gap-10 font-body">

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
                <div className="w-fit flex flex-col justify-start items-start gap-1"
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


        </div>
    );
};

export default ListingDetails;