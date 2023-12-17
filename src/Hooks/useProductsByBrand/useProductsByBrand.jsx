import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../useAxiosPublic/useAxiosPublic";
import { useParams } from "react-router-dom";


const useProductsByBrand = () => {

    // hooks and custom hooks
    const axiosPublic = useAxiosPublic();
    const brand = useParams();
    const brandName = brand.brandName;


    // fetch all products data using tanStack and axios
    const { isPending: brandProductsPending, data: allProductsByBrand, refetch: brandProductsRefetch } = useQuery({
        queryKey: ["allBrand-products", brandName],
        queryFn: async () => {
            const res = await axiosPublic.get(`/products/${brandName}`)
            return res.data;
        }
    })


    return { brandProductsPending, allProductsByBrand, brandProductsRefetch }
};

export default useProductsByBrand;