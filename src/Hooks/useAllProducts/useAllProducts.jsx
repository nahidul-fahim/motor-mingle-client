import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../useAxiosPublic/useAxiosPublic";


const useAllProducts = () => {

    // hooks and custom hooks
    const axiosPublic = useAxiosPublic();


    // fetch all products data using tanStack and axios
    const { isPending: allProductsPending, data: allProducts, refetch } = useQuery({
        queryKey: ["all-products"],
        queryFn: async () => {
            const res = await axiosPublic.get("/products")
            return res.data;
        }
    })

    return { allProductsPending, allProducts, refetch }
};

export default useAllProducts;