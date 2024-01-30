import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../useAxiosSecure/useAxiosSecure";


const useBids = (productId) => {


    const axiosSecure = useAxiosSecure();


    const { isPending: bidsPending, data: allBids } = useQuery({
        queryKey: ["all-bids", productId],
        queryFn: async () => {
            const res = await axiosSecure.get(`/allBidsForProduct/${productId}`)
            return res.data;
        }
    })


    return { bidsPending, allBids }
};

export default useBids;