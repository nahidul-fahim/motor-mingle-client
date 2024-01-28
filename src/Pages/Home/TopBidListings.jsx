import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../Hooks/useAxiosPublic/useAxiosPublic";
import SingleListing from "../../Components/Shared/SingleListing/SingleListing";
import { Link } from "react-router-dom";
import { FaArrowRightLong } from "react-icons/fa6";


const TopBidListings = () => {

    // hooks and custom hooks
    const axiosPublic = useAxiosPublic();


    // data fetch
    const { isPending: listingPending, data: listings } = useQuery({
        queryKey: ["topBid-listings"],
        queryFn: async () => {
            const res = await axiosPublic.get("/topBidHomeListings")
            return res.data;
        }
    })


    if (listingPending) {
        return <p className='text-center text-lightBlack capitalize'>loading....</p>
    }



    return (
        <div className='mt-[6rem] flex flex-col justify-center items-center gap-4 container mx-auto p-5'>
            <h2 className="text-3xl md:text-5xl capitalize text-main font-semibold text-center"
                data-aos="slide-down"
                data-aos-mirror="true"
                data-aos-once="false"
                data-aos-anchor-placement="top-bottom">The Most Loved</h2>
            <p className='text-center text-lightBlack'>
                The most traded car refers to the vehicle with the highest amount of bids.
            </p>

            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-7 w-full mt-10'>
                {
                    listings.map(singleList =>

                        // single listing style 
                        <SingleListing key={singleList?._id} singleList={singleList}
                        ></SingleListing>
                    )
                }
            </div>

            <Link to={"/allListings"}>
                <button className='group bg-main px-4 py-3 rounded text-white font-semibold hover:bg-sub duration-500 mt-10 flex justify-center items-center gap-2'>
                    <span>See More</span>
                    <FaArrowRightLong className="hidden group-hover:flex duration-500" />
                </button>
            </Link>
        </div>
    );
};

export default TopBidListings;