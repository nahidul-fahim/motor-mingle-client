import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure/useAxiosSecure";
import useCurrentUser from "../../../../Hooks/useCurrentUser/useCurrentUser";
import LoadingAnimation from "../../../../Components/Shared/LoadingAnimation/LoadingAnimation";
import AOS from 'aos';
import 'aos/dist/aos.css';
import { Link } from "react-router-dom";


const SavedListings = () => {

    // hooks and custom hooks

    // get current user and email
    const { dbCurrentUser } = useCurrentUser();
    const email = dbCurrentUser?.email;

    // axios
    const axiosSecure = useAxiosSecure();

    // data fetch using Tan Stack
    const { isPending: savedListingsPending, data: savedListings } = useQuery({
        queryKey: ["saved-listings", email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/savedAdsList/${email}`)
            return res.data;
        }
    })


    // conditional loading
    if (savedListingsPending) {
        return <LoadingAnimation />
    }


    console.log(savedListings);


    // animation
    AOS.init({
        offset: 120,
        duration: 1500,
        easing: 'ease',
        delay: 50,
    });


    return (

        <div className="flex flex-col justify-start items-center w-full h-full">
            <h2 className="text-center text-4xl md:text-5xl font-extrabold text-main  uppercase"
                data-aos="slide-right"
                data-aos-mirror="true"
                data-aos-once="false"
                data-aos-anchor-placement="top-bottom">Saved Listings</h2>

            {/* show the listings */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-center items-center gap-10 mt-[80px] w-full">
                {
                    savedListings.map(listing =>
                        <Link key={listing?._id} to={`/details/${listing?.singleAdId}`}>
                            <div className="flex flex-col justify-center items-center gap-4">
                                <img src={listing?.photo} alt="" className="w-[200px] h-[114px] bg-cover" />
                                <h3 className="text-lightBlack text-xl font-semibold">{listing?.carName}</h3>
                            </div>
                        </Link>
                    )
                }
            </div>
        </div>
    );
};

export default SavedListings;