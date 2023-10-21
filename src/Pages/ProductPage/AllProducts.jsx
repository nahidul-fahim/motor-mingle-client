import { useLoaderData } from "react-router-dom";
import SingleProductPage from "./SingleProductPage";


const AllProducts = () => {

    const allProducts = useLoaderData();

    console.log(allProducts);

    return (
        <div>
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