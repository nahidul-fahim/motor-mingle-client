import { FaUser } from "react-icons/fa";
import { Link } from "react-router-dom";
import { RiDeleteBin2Fill, RiEdit2Fill } from "react-icons/ri";
import useCurrentUser from "../../../Hooks/useCurrentUser/useCurrentUser";


const SingleListing = ({ singleList }) => {

    const { _id, carName, carBrand, photo, price, totalRun, sellerVerificationStatus, sellerEmail } = singleList;


    // hooks
    const { dbCurrentUserPending, dbCurrentUser } = useCurrentUser();


    // delete a listing
    




    return (
        <div className="w-full flex flex-col justify-center items-center">
            <div className="flex justify-center items-center w-full px-3 py-5 rounded-lg shadow-[0_10px_10px_#e6e6e6b3]">
                <div className="flex justify-between items-center gap-6 w-full">
                    <div className="w-3/6 md:w-2/5 relative">
                        <img src={photo} alt="" className="w-full" />
                        <p className="bg-white text-black px-2 py-1 rounded absolute top-0 left-0 font-medium">{carBrand}</p>
                    </div>
                    <div className="w-3/6 md:w-3/5 flex flex-col justify-center items-start gap-1 py-1">
                        <p className={`capitalize w-fit px-2 py-[2px] rounded-sm text-[12px] ${sellerVerificationStatus === "verified" ? 'bg-[#c5ffc5] text-[green]' : 'bg-[#ffd6d6] text-[red]'} flex justify-center items-center gap-2 font-medium mb-1`}><FaUser /> {sellerVerificationStatus}</p>
                        <h3 className="text-[18px] md:text-xl font-semibold">{carName}</h3>
                        <p>{totalRun} km</p>
                        <p className="font-medium">$ {price}</p>
                        <Link to={`/details/${_id}`}><button className="mt-1 text-[14px] bg-main text-white px-3 py-1 rounded hover:bg-sub duration-500 font-medium">See Details</button></Link>
                    </div>
                </div>
            </div>

            {/* seller button when seller is logged in */}
            {
                !dbCurrentUserPending ?
                    <>
                        {
                            dbCurrentUser?.email === sellerEmail ?
                                <div className="bg-black px-3 py-2 rounded-b-[10px] flex justify-center items-center gap-3">
                                    <button className="text-white text-xl"><RiEdit2Fill /> </button>
                                    <button className="text-white text-xl"><RiDeleteBin2Fill /> </button>
                                </div>
                                :
                                ""
                        }
                    </>
                    :
                    ""
            }
        </div>
    );
};

export default SingleListing;