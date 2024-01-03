import { Link } from "react-router-dom";


const SingleListing = ({ singleList }) => {

    const { _id, carName, carBrand, photo, price, totalRun, sellerVerificationStatus } = singleList;

    return (
        <div className="flex justify-between items-center gap-6 w-full bg-[#e9e9e9] px-3 py-1 rounded-lg relative">
            <div className="w-3/6 md:w-2/5">
                <img src={photo} alt="" className="w-full" />
                <p className="bg-white text-black px-2 py-1 rounded absolute top-0 left-0 font-medium">{carBrand}</p>
            </div>
            <div className="w-3/6 md:w-3/5 flex flex-col justify-center items-start gap-1 py-1">
                <p className={`capitalize w-fit px-2 py-[2px] rounded-sm text-[14px] ${sellerVerificationStatus === "verified" ? 'bg-[#c5ffc5] text-[green]' : 'bg-[#ffd6d6] text-[red]'}`}>{sellerVerificationStatus}</p>
                <h3 className="text-[18px] md:text-xl font-semibold">{carName}</h3>
                <p>{totalRun} km</p>
                <p className="font-medium">$ {price}</p>
                <Link to={`/details/${_id}`}><button className="mt-1 text-[14px] bg-main text-white px-3 py-1 rounded hover:bg-sub duration-500">See Details</button></Link>
            </div>
        </div>
    );
};

export default SingleListing;