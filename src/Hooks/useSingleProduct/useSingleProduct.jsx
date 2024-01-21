import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../useAxiosSecure/useAxiosSecure";


const useSingleProduct = (id) => {

    //hooks and custom hooks
    const axiosSecure = useAxiosSecure();


    //fetch data using tanstack
    const { isPending: singleProductPending, data: singleProduct } = useQuery({
        queryKey: ["single-product", id],
        queryFn: async () => {
            const res = await axiosSecure.get(`/singleProduct?id=${id}`)
            return res.data
        }
    })


    return { singleProductPending, singleProduct }
};

export default useSingleProduct;