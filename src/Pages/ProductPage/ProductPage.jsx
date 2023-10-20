import { useLoaderData } from "react-router-dom";
import SingleProductPage from "./SingleProductPage";
import AdvertisementCarousel from "./AdvertisementCarousel";


const ProductPage = () => {

    const allCarsByCategory = useLoaderData();


    return (
        <div className="container mx-auto">
            <AdvertisementCarousel />
            <div className="container mx-auto p-5 mt-[3rem] lg:mt-[5rem]">
                {
                    allCarsByCategory.length === 0 ?
                        <div className="flex flex-col justify-center items-center h-full mt-[5rem]">
                            <img src="https://i.ibb.co/bsZ94bt/oops.png" alt="" className="lg:w-1/3" />
                            <h1 className="font-extrabold text-2xl md:text-4xl font-heading text-main text-center uppercase">No product available!</h1>
                        </div>
                        :
                        <div className="grid grid-cols-1 gap-[80px]">
                            {
                                allCarsByCategory.map(singleCategoryCar => <SingleProductPage
                                    key={singleCategoryCar._id}
                                    singleCategoryCar={singleCategoryCar}>
                                </SingleProductPage>)
                            }
                        </div>
                }
            </div>
        </div>
    );
};

export default ProductPage;