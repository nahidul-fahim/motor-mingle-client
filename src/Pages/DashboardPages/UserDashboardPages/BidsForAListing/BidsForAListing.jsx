import { useParams } from "react-router-dom";
import useBids from "../../../../Hooks/useBids/useBids";
import LoadingAnimation from "../../../../Components/Shared/LoadingAnimation/LoadingAnimation";


const BidsForAListing = () => {


    // hooks and custom hooks
    const { id } = useParams();
    const { bidsPending, allBids } = useBids(id);



    if (bidsPending) {
        return <LoadingAnimation />
    }




    return (
        <div className="flex flex-col justify-start items-center w-full h-full">
            <h2 className="text-center text-3xl md:text-4xl font-bold text-main  capitalize">Bids</h2>

            <div className="mt-10 w-full font-body flex flex-col justify-center items-center gap-8">
                {
                    allBids.map(bid =>
                        <div key={bid?._id} className="bg-lightMain p-10 w-full rounded-[20px] flex flex-col justify-start gap-5 items-center relative">

                            {/* bid date */}
                            <p className="text-lightBlack font-medium">Bid placed on: {bid?.bidPlacedOn}</p>


                            {/* product name and price */}
                            <div className="flex flex-col md:flex-row justify-center items-start gap-2 md:gap-5 w-full">
                                <p className="text-[18px] font-medium bg-black text-white px-5 py-2 rounded-[40px]">{bid?.productName}</p>
                                <p className="text-[18px] font-medium bg-black text-white px-5 py-2 rounded-[40px]">${bid?.productPrice}</p>
                            </div>

                            {/* bidder photo and name */}
                            <div className="flex justify-start items-center w-full">
                                <img src={bid?.bidderPhoto} alt="" className="w-[70px] h-[70px] rounded-[50%] p-2 bg-cover" />
                                <h3 className="capitalize text-[18px] font-semibold text-black">{bid?.bidderName}</h3>
                            </div>

                            {/* bidder price and message */}
                            <div className="px-5 md:px-10 flex flex-col justify-start items-start gap-3 w-full">
                                <p className="text-xl font-semibold text-lightBlack">Offered price: <span className="text-sub font-bold">${bid?.proposedPrice}</span></p>
                                <p className="text-lightBlack mt-2">{bid?.bidderMessage || "No message"}</p>
                            </div>

                            {/* bidder email and phone */}
                            <div className="flex flex-col md:flex-row justify-center items-center gap-2 md:gap-5 w-full">
                                <p className="font-medium bg-third text-white px-5 py-2 rounded-[40px]">Bidder email : {bid?.bidderEmail}</p>
                                <p className="font-medium bg-third text-white px-5 py-2 rounded-[40px]">Bidder phone : {bid?.bidderPhone}</p>
                            </div>
                        </div>)
                }
            </div>

        </div>
    );
};

export default BidsForAListing;