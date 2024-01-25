import LoadingAnimation from "../../Components/Shared/LoadingAnimation/LoadingAnimation";
import AOS from 'aos';
import 'aos/dist/aos.css';
import SingleListing from "../../Components/Shared/SingleListing/SingleListing";
import { useEffect, useState } from "react";
import useScrollToTop from "../../Hooks/useScrollToTop/useScrollToTop";
import useAxiosPublic from "../../Hooks/useAxiosPublic/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";


const AllListings = () => {

    // hooks and custom hooks
    const axiosPublic = useAxiosPublic();
    const scrollToTop = useScrollToTop();
    const [currentPage, setCurrentPage] = useState(1);
    const [pages, setPages] = useState(0);

    // fetch data
    const { isPending: allListingsPending, data: allListings, refetch: listingsRefetch } = useQuery({
        queryKey: ["all-listings", currentPage],
        queryFn: async () => {
            const res = await axiosPublic.get(`/paginatedListings?listingPerPage=10&currentPage=${currentPage}`)
            setPages(res.data.totalPages)
            return res.data.paginatedListings;
        }
    })

    useEffect(() => {
        scrollToTop();
    }, [scrollToTop])


    // conditional loading
    if (allListingsPending) {
        return <LoadingAnimation />
    }


    // set total pages
    const totalPages = [...Array(pages).keys()];

    console.log(currentPage)



    // animation
    AOS.init({
        offset: 120,
        duration: 1500,
        easing: 'ease',
        delay: 50,
    });



    return (
        <div className="container mx-auto flex flex-col justify-center items-center gap-5 p-5">
            <h2 className="text-center text-4xl md:text-5xl font-extrabold text-main uppercase"
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