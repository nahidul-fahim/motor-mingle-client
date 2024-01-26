import { FaUser } from "react-icons/fa";
import { Link } from "react-router-dom";
import { RiDeleteBin2Fill, RiEdit2Fill, RiCheckboxCircleFill } from "react-icons/ri";
import useCurrentUser from "../../../Hooks/useCurrentUser/useCurrentUser";
import Swal from 'sweetalert2'
import useAxiosSecure from "../../../Hooks/useAxiosSecure/useAxiosSecure";
import { IoSpeedometerOutline } from "react-icons/io5";
import { BsFuelPumpDiesel } from "react-icons/bs";
import { TbManualGearbox } from "react-icons/tb";
import { GoArrowUpRight } from "react-icons/go";
import AOS from 'aos';
import 'aos/dist/aos.css';


const SingleListing = ({ singleList, filteredListingRefetch }) => {


    // hooks
    const { dbCurrentUserPending, dbCurrentUser } = useCurrentUser();
    const axiosSecure = useAxiosSecure();


    // delete a singleList
    const handleDeleteListing = id => {
        Swal.fire({
            title: "Are you sure to delete?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#e60017",
            cancelButtonColor: "#383838",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {

                axiosSecure.delete(`/allCarsListing/${id}`)
                    .then(res => {
                        const data = res.data;
                        if (data.deletedCount) {
                            filteredListingRefetch();
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your file has been deleted.",
                                icon: "success"
                            });
                        }
                    })
                    .catch(err => {
                        Swal.fire({
                            position: "top-end",
                            icon: "error",
                            title: `${err.code}`,
                            showConfirmButton: false,
                            timer: 1500
                        });
                    })
            }
        });
    }



    // update sell status of a singleList
    const handleSold = id => {

        const sellStatus = "sold";
        const updateSellInfo = { sellStatus };

        Swal.fire({
            title: "Is it sold?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#e60017",
            cancelButtonColor: "#383838",
            confirmButtonText: "Yes, sold!"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.put(`/updateSellStatus/${id}`, updateSellInfo)
                    .then(res => {
                        const data = res.data;
                        if (data.modifiedCount) {
                            filteredListingRefetch();
                            Swal.fire({
                                title: "Sold!",
                                icon: "success"
                            });
                        }
                    })
                    .catch(err => {
                        Swal.fire({
                            position: "top-end",
                            icon: "error",
                            title: `${err.code}`,
                            showConfirmButton: false,
                            timer: 1500
                        });
                    })
            }
        });
    }


    // animation
    AOS.init({
        offset: 120,
        duration: 1500,
        easing: 'ease',
        delay: 50,
    });




    return (
        <div key={singleList?._id} className='flex flex-col justify-center items-start relative'
            data-aos="fade-up"
            data-aos-mirror="true"
            data-aos-once="false"
            data-aos-anchor-placement="top-bottom">

            <img src={singleList?.photo} alt="" className='w-full lg:w-[330px] lg:h-[198px] rounded-t-[20px]' />

            <div className='w-full border-x-[1px] border-b-[1px] border-[#e4e4e4] p-2 rounded-[20px]'>
                <h3 className='mt-3 w-full px-3 text-xl text-black font-semibold border-b-[1px] pb-2 border-[#e4e4e4]'>{singleList?.carName}</h3>

                {/* car details */}
                <div className='p-3 w-full flex justify-between items-center border-b-[1px] border-[#e4e4e4]'>

                    {/* total km */}
                    <div className='flex flex-col justify-center items-center gap-1'>
                        <IoSpeedometerOutline className='text-xl text-lightBlack' />
                        <p className='text-lightBlack font-medium text-[14px]'>{singleList?.totalRun} km</p>
                    </div>

                    {/* fuel */}
                    <div className='flex flex-col justify-center items-center gap-2'>
                        <BsFuelPumpDiesel className='text-xl text-lightBlack' />
                        <p className='text-lightBlack capitalize font-medium text-[14px]'>{singleList?.fuelType}</p>
                    </div>

                    {/* transmission type */}
                    <div className='flex flex-col justify-center items-center gap-1'>
                        <TbManualGearbox className='text-xl text-lightBlack' />
                        <p className='text-lightBlack font-medium text-[14px]'>{singleList?.transmissionType}</p>
                    </div>
                </div>

                {/* price and detail button */}
                <div className='p-3 w-full flex justify-between items-center'>
                    <p className='text-xl font-bold text-black'>${singleList?.price}</p>
                    <Link to={`/details/${singleList?._id}`}><button className='text-sub font-semibold text-[18px] hover:text-black duration-500 flex justify-center items-center gap-1'>See Details <GoArrowUpRight /> </button></Link>
                </div>
            </div>

            {
                singleList?.sellStatus === "sold" ?
                    <div className="bg-[#e70a0a] p-5 text-[18px] font-semibold text-white rounded-[100%] w-[70px] h-[70px] flex justify-center items-center absolute bottom-[65%] left-[40%] right-0 -rotate-[30deg] shadow-[0_0_50px_#e70a0a63]">
                        Sold
                    </div>
                    :
                    ""
            }
        </div>
    );
};

export default SingleListing;