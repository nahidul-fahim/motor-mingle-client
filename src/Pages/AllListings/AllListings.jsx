import LoadingAnimation from "../../Components/Shared/LoadingAnimation/LoadingAnimation";
import AOS from 'aos';
import 'aos/dist/aos.css';
import SingleListing from "../../Components/Shared/SingleListing/SingleListing";
import useAllListings from "../../Hooks/useAllListings/useAllListings";


const AllListings = () => {

    // hooks and custom hooks
    const { allListingsPending, allListings, listingsRefetch } = useAllListings()


    // conditional loading
    if (allListingsPending) {
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
        <div className="container mx-auto flex flex-col justify-center items-center gap-5 p-5">
            <h2 className="text-center text-4xl md:text-5xl font-extrabold text-main  uppercase"
                data-aos="fade-down"
                data-aos-mirror="true"
                data-aos-once="false"
                data-aos-anchor-placement="top-bottom">All Listings</h2>

            {/* show all the listings */}
            <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-10 mt-[80px]">
                {
                    allListings.map((singleList, index) =>
                        <SingleListing key={index} singleList={singleList} listingsRefetch={listingsRefetch}
                        ></SingleListing>
                    )
                }
            </div>
        </div>
    );
};

export default AllListings;