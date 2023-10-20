import { useContext } from "react";
import { websiteContentContext } from "../../Context/ContentContext/ContentProvider";
import SingleCarBrand from "./SingleCarBrand";


const CarBrands = () => {

    const { carBrands, loading } = useContext(websiteContentContext);

    if (loading) {
        return <span className="loading loading-dots loading-lg container mx-auto flex justify-center items-center h-[100vh]"></span>
    }

    return (
        <div className="container mx-auto p-5 mt-[5rem]">
            <h1 className="text-4xl md:text-5xl font-bold  text-center text-main uppercase mb-[4rem]">Choose your brand</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                {
                    carBrands.map(carBrand => <SingleCarBrand
                        key={carBrand._id}
                        carBrand={carBrand}
                    ></SingleCarBrand>)
                }
            </div>
        </div>
    );
};

export default CarBrands;