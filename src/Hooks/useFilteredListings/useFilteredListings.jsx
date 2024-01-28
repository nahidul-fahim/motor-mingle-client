import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../useAxiosPublic/useAxiosPublic";
import { useState } from "react";


const useFilteredListings = (currentPage, carCondition, carBrand, carPrice) => {

    // hooks and custom hooks
    const axiosPublic = useAxiosPublic();
    const [pages, setPages] = useState(0);


    const { isPending: filteredListingPending, data: filteredListing, refetch: filteredListingRefetch } = useQuery({
        queryKey: ["filtered-listing", currentPage, carCondition, carBrand, carPrice],
        queryFn: async () => {
            const res = await axiosPublic.get(`/filteredListings?listingPerPage=12&currentPage=${currentPage}&carCondition=${carCondition}&carBrand=${carBrand}&carPrice=${carPrice}`)
            setPages(res.data.totalPages)
            return res.data.filteredListings;
        }
    })

    return { filteredListingPending, filteredListing, filteredListingRefetch, pages }
};

export default useFilteredListings;