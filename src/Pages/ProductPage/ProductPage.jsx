import { useState } from "react";
import { useParams } from "react-router-dom";
import SingleProductPage from "./SingleProductPage";


const ProductPage = () => {

    const [categoryCars, setCategoryCars] = useState([]);
    const { brandName } = useParams();
    const [loading, setLoading] = useState(true);


    fetch(`http://localhost:5000/products/${brandName}`)
        .then(res => res.json())
        .then(data => {
            setCategoryCars(data);
            setLoading(false);
        })

    if (loading) {
        return <span className="loading loading-dots loading-lg container mx-auto flex justify-center items-center h-[100vh]"></span>
    }

    return (
        <div className="container mx-auto p-5">
            <div>
                {
                    categoryCars.length === 0 ?
                        <div className="flex flex-col justify-center items-center h-full mt-[5rem]">
                            <img src="https://i.ibb.co/bsZ94bt/oops.png" alt="" className="lg:w-1/3" />
                            <h1 className="font-extrabold text-2xl md:text-4xl font-heading text-main text-center uppercase">No product available!</h1>
                        </div>
                        :
                        <div  className="grid grid-cols-1 gap-[80px]">
                            {
                                categoryCars.map(singleCategoryCar => <SingleProductPage
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