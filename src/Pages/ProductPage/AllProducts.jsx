import { useLoaderData } from "react-router-dom";
import SingleProductPage from "./SingleProductPage";


const AllProducts = () => {

    const allProducts = useLoaderData();

    return (
        <div className="grid grid-cols-1 gap-[50px] lg:gap-[80px] mt-[1rem] lg:mt-[4rem]">
            {
                allProducts.map(singleCategoryCar => <SingleProductPage
                key={singleCategoryCar._id}
                singleCategoryCar={singleCategoryCar}>
                </SingleProductPage>)
            }
        </div>
    );
};

export default AllProducts;