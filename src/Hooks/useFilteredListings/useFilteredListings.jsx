import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../useAxiosPublic/useAxiosPublic";
import { useState } from "react";


const useFilteredListings = (currentPage) => {

    // hooks and custom hooks
    const axiosPublic = useAxiosPublic();
    const [pages, setPages] = useState(0);

    const { isPending: filteredListingPending, data: filteredListing, refetch: filteredListingRefetch } = useQuery({
        queryKey: ["filtered-listing", currentPage],
        queryFn: async () => {
            const res = await axiosPublic.get(`/filteredListings?listingPerPage=12&currentPage=${currentPage}`)
            setPages(res.data.totalPages)
            return res.data.paginatedListings;
        }
    })

    return { filteredListingPending, filteredListing, filteredListingRefetch, pages }
};

export default useFilteredListings;