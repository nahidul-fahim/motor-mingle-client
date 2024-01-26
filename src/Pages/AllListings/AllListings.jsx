import LoadingAnimation from "../../Components/Shared/LoadingAnimation/LoadingAnimation";
import AOS from 'aos';
import 'aos/dist/aos.css';
import SingleListing from "../../Components/Shared/SingleListing/SingleListing";
import { useEffect, useState } from "react";
import useScrollToTop from "../../Hooks/useScrollToTop/useScrollToTop";
import useFilteredListings from "../../Hooks/useFilteredListings/useFilteredListings";


const AllListings = () => {

    // hooks and custom hooks
    const scrollToTop = useScrollToTop();
    const [currentPage, setCurrentPage] = useState(1);
    const { filteredListingPending, filteredListing, filteredListingRefetch, pages } = useFilteredListings(currentPage);




    useEffect(() => {
        scrollToTop();
    }, [scrollToTop])


    // conditional loading
    if (filteredListingPending) {
        return <LoadingAnimation />
    }


    // set total pages
    const totalPages = [...Array(pages).keys()];


    // animation
    AOS.init({
        offset: 120,
        duration: 1500,
        easing: 'ease',
        delay: 50,
    });



    return (
        <div className="container mx-auto flex flex-col justify-center items-center gap-5 p-5">
            <h2 className="text-center text-4xl md:text-5xl font-bold text-main capitalize"
                data-aos="fade-down"
                data-aos-mirror="true"
                data-aos-once="false"
                data-aos-anchor-placement="top-bottom">All Listings</h2>

            {/* show all the listings */}
            <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mt-[50px]">
                {
                    filteredListing.map((singleList, index) =>
                        <SingleListing key={index} singleList={singleList} filteredListingRefetch={filteredListingRefetch}
                        ></SingleListing>
                    )
                }
            </div>

            {/* pagination */}
            <div className="flex justify-center items-center gap-3 mt-10">
                {
                    totalPages.map(page =>
                        <button key={page}
                            onClick={() => setCurrentPage(page + 1)}
                            className={`border-[1px] border-sub w-[35px] h-[35px] hover:bg-sub hover:text-white duration-300 font-medium ${currentPage === page + 1 ? 'bg-sub text-white' : 'bg-white text-sub'}`}>
                            {page + 1}
                        </button>)
                }
            </div>
        </div>
    );
};

export default AllListings;