import SingleCarBrand from "./SingleCarBrand";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../Hooks/useAxiosPublic/useAxiosPublic";
import LoadingAnimation from "../../Components/Shared/LoadingAnimation/LoadingAnimation";


const CarBrands = () => {

    // hooks and custom hooks
    const axiosPublic = useAxiosPublic();


    const { isPending: brandsPending, data: allCarBrands } = useQuery({
        queryKey: ["allCar-brands"],
        queryFn: async () => {
            const res = await axiosPublic.get("/brands")
            return res.data;
        }
    })


    // conditional loading for brands data to load
    if (brandsPending) {
        return <LoadingAnimation />
    }




    return (
        <div className="container mx-auto p-5 mt-[5rem]">
            <h1 className="text-4xl md:text-5xl font-bold  text-center text-main uppercase mb-[4rem]">Choose your brand</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                {
                    allCarBrands.map(carBrand => <SingleCarBrand
                        key={carBrand._id}
                        carBrand={carBrand}
                    ></SingleCarBrand>)
                }
            </div>
        </div>
    );
};

export default CarBrands;