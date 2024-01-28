import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure/useAxiosSecure";
import useCurrentUser from "../../../../Hooks/useCurrentUser/useCurrentUser";
import LoadingAnimation from "../../../../Components/Shared/LoadingAnimation/LoadingAnimation";
import AOS from 'aos';
import 'aos/dist/aos.css';
import SingleListing from "../../../../Components/Shared/SingleListing/SingleListing";
import Lottie from "lottie-react";
import carLottie from "../../../../assets/carLottie.json"


const SavedListings = () => {

    // hooks and custom hooks

    // get current user and email
    const { dbCurrentUser } = useCurrentUser();
    const email = dbCurrentUser?.email;

    // axios
    const axiosSecure = useAxiosSecure();

    // data fetch using Tan Stack
    const { isPending: savedListingsPending, data: savedListings, refetch: savedListingsRefetch } = useQuery({
        queryKey: ["saved-listingsByUser", email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/savedAdsList/${email}`)
            return res.data;
        }
    })


    // conditional loading
    if (savedListingsPending) {
        return <LoadingAnimation />
    }



    // animation
    AOS.init({
        offset: 120,
        duration: 1500,
        easing: 'ease',
        delay: 50,
    });


    return (

        <div className="flex flex-col justify-start items-center w-full h-full">
            <h2 className="text-center text-4xl md:text-5xl font-bold text-main  capitalize"
                data-aos="fade-up"
                data-aos-mirror="true"
                data-aos-once="false"
                data-aos-anchor-placement="top-bottom">Saved Listings</h2>


            {/* show the listings */}
            {
                savedListings.length === 0 ?
                    <div className="w-full h-full flex flex-col justify-center items-center">
                        <Lottie animationData={carLottie} />
                        <h3 className="text-4xl font-bold text-lightBlack text-center">No data found!</h3>
                    </div>
                    :
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-center items-center gap-10 mt-[80px] w-full">
                        {
                            savedListings.map(singleList => <SingleListing key={singleList?._id} singleList={singleList} filteredListingRefetch={savedListingsRefetch}></SingleListing>
                            )
                        }
                    </div>
            }

        </div>
    );
};

export default SavedListings;