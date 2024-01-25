import { FaUser } from "react-icons/fa";
import { Link } from "react-router-dom";
import { RiDeleteBin2Fill, RiEdit2Fill, RiCheckboxCircleFill } from "react-icons/ri";
import useCurrentUser from "../../../Hooks/useCurrentUser/useCurrentUser";
import Swal from 'sweetalert2'
import useAxiosSecure from "../../../Hooks/useAxiosSecure/useAxiosSecure";


const SingleListing = ({ singleList, filteredListingRefetch }) => {

    const { _id, carName, carBrand, photo, price, totalRun, sellerVerificationStatus, sellerEmail, sellStatus } = singleList;


    // hooks
    const { dbCurrentUserPending, dbCurrentUser } = useCurrentUser();
    const axiosSecure = useAxiosSecure();


    // delete a listing
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



    // update sell status of a listing
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




    return (
        <div className="w-full flex flex-col justify-center items-center">
            <div className="flex justify-center items-center w-full px-3 py-5 rounded-lg shadow-[0_10px_10px_#e6e6e6b3]">
                <div className="flex justify-between items-center gap-6 w-full">
                    <div className="w-3/6 md:w-2/5 relative">
                        <img src={photo} alt="" className="w-[213px] h-[120px]" />
                        <p className="bg-white text-black px-2 py-1 rounded absolute top-0 left-0 font-medium">{carBrand}</p>
                    </div>
                    <div className="w-3/6 md:w-3/5 flex flex-col justify-center items-start gap-1 py-1 relative">
                        <p className={`capitalize w-fit px-2 py-[2px] rounded-sm text-[12px] ${sellerVerificationStatus === "verified" ? 'bg-[#c5ffc5] text-[green]' : 'bg-[#ffd6d6] text-[red]'} flex justify-center items-center gap-2 font-medium mb-1`}><FaUser /> {sellerVerificationStatus} seller</p>
                        <h3 className="text-[18px] md:text-xl font-semibold">{carName}</h3>
                        <p>{totalRun} km</p>
                        <p className="font-medium">${price}</p>
                        <Link to={`/details/${_id}`}><button className="mt-1 text-[14px] bg-main text-white px-3 py-1 rounded hover:bg-sub duration-500 font-medium">See Details</button></Link>
                        {
                            sellStatus === "sold" ?
                                <div className="bg-[#e70a0a] p-5 text-[18px] font-semibold text-white rounded-[100%] w-[60px] h-[60px] flex justify-center items-center absolute top-0 right-0 -rotate-[30deg] shadow-[0_0_50px_#e70a0a63]">
                                    Sold
                                </div>
                                :
                                ""
                        }
                    </div>
                </div>
            </div>

            {/* seller button when seller is logged in */}
            {
                !dbCurrentUserPending ?
                    <>
                        {
                            dbCurrentUser?.email === sellerEmail ?
                                <div className="bg-black px-3 py-1 rounded-b-[10px] flex justify-center items-center gap-3">
                                    <Link to={`/dashboard/updateListing/${_id}`}
                                    ><button className="text-white text-xl mt-[4px]"><RiEdit2Fill /> </button></Link>
                                    <button onClick={() => handleDeleteListing(_id)}
                                        className="text-white text-xl">
                                        <RiDeleteBin2Fill />
                                    </button>
                                    {
                                        !sellStatus ?
                                            <button onClick={() => handleSold(_id)}
                                                className="text-white text-[15px] font-medium flex gap-2 justify-center items-center bg-[#c70000] px-2 py-1 rounded hover:bg-black duration-500">
                                                <RiCheckboxCircleFill />Mark As Sold
                                            </button>
                                            :
                                            ""
                                    }
                                </div>
                                :
                                ""
                        }
                    </>
                    :
                    ""
            }
        </div >
    );
};

export default SingleListing;