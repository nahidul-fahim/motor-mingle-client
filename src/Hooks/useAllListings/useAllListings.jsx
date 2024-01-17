import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../useAxiosPublic/useAxiosPublic";


const useAllListings = () => {

    // hooks and custom hooks
    const axiosPublic = useAxiosPublic();


    // fetch all products data using tanStack and axios
    const { isPending: allListingsPending, data: allListings, listingsRefetch } = useQuery({
        queryKey: ["all-listings"],
        queryFn: async () => {
            const res = await axiosPublic.get("/allListings")
            return res.data;
        }
    })

    return { allListingsPending, allListings, listingsRefetch }
};

export default useAllListings;