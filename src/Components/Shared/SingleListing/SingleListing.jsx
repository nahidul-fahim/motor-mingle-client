

const SingleListing = ({ singleList }) => {

    const { carName, carBrand, photo, price, totalRun, sellerVerificationStatus } = singleList;

    return (
        <div className="flex justify-center items-center gap-5 w-full bg-[#e9e9e9] px-3 py-2 rounded-lg relative">
            <div>
                <img src={photo} alt="" className="w-[210px] h-[120px]" />
                <p className="bg-white text-black px-2 py-1 rounded absolute top-0 left-0 font-medium">{carBrand}</p>
            </div>
            <div className="flex flex-col justify-center items-start gap-1">
                <p className={`capitalize w-fit px-2 py-[2px] rounded-sm text-[14px] ${sellerVerificationStatus === "verified" ? 'bg-[#c5ffc5]' : 'bg-[#ffd6d6]'} text-black`}>{sellerVerificationStatus}</p>
                <h3 className="text-xl font-semibold">{carName}</h3>
                <p>{totalRun} km</p>
                <p className="font-medium">$ {price}</p>
            </div>
        </div>
    );
};

export default SingleListing;