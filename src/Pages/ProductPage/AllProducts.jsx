import ShortViewProduct from "./ShortViewProduct";
import useAllProducts from "../../Hooks/useAllProducts/useAllProducts";
import LoadingAnimation from "../../Components/Shared/LoadingAnimation/LoadingAnimation";


const AllProducts = () => {

    // get all the products from all products custom hook
    const { allProductsPending, allProducts } = useAllProducts();


    // condtional loading for all products
    if (allProductsPending) {
        return <LoadingAnimation />
    }


    return (
        <div className="mt-[4rem]">
            <h2 className="text-5xl font-extrabold text-center uppercase text-main"
                data-aos="slide-right"
                data-aos-mirror="true"
                data-aos-once="false"
                data-aos-anchor-placement="top-bottom">All Products</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-14 mt-[5rem]">
                {
                    allProducts.map(singleProduct => <ShortViewProduct
                        key={singleProduct._id}
                        singleProduct={singleProduct}>
                    </ShortViewProduct>)
                }
            </div>
        </div>
    );
};

export default AllProducts;