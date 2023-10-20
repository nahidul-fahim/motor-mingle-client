// import { useState } from "react";
// import { useParams } from "react-router-dom";

import { useLoaderData } from "react-router-dom";


const ProductDetails = () => {

    const singleProduct = useLoaderData();
    console.log(singleProduct)

    const { productName, brandName, carType, productPrice, description, photo } = singleProduct;


    return (
        <div className="container mx-auto p-5 md:p-10 lg:p-5 mt-[5rem]">
            <div className="flex flex-col justify-center items-center">

                <div className="flex justify-center items-center w-full lg:w-2/3 mx-auto">
                    <div className="px-10 py-3 border-y-2 border-l-2 border-lightMain w-full md:w-1/2">
                        <h3 className="text-xl font-bold font-body text-sub">Car name</h3>
                    </div>
                    <div className="px-10 py-3 border-y-2 border-x-2 border-lightMain w-full md:w-1/2">
                        <h3 className="text-xl font-bold font-body text-main ">{productName}</h3>
                    </div>
                </div>


                <div className="flex justify-center items-center w-full lg:w-2/3 mx-auto border-b-2 border-x-2 border-lightMain">

                    <div className="px-10 py-3 w-1/2">
                        <h3 className="text-xl font-bold font-body text-sub">Brand name</h3>
                    </div>
                    <div className="px-10 py-3 w-1/2 border-l-2 border-lightMain">
                        <h3 className="text-xl font-bold font-body text-main">{brandName}</h3>
                    </div>

                </div>

                <div className="flex justify-center items-center w-full lg:w-2/3 mx-auto border-b-2 border-x-2 border-lightMain">

                    <div className="px-10 py-3 w-1/2 ">
                        <h3 className="text-xl font-bold font-body text-sub">Car type</h3>
                    </div>
                    <div className="px-10 py-3 w-1/2 border-l-2 border-lightMain">
                        <h3 className="text-xl font-bold font-body text-main">{carType}</h3>
                    </div>

                </div>

                <div className="flex justify-center items-center w-full lg:w-2/3 mx-auto border-b-2 border-x-2 border-lightMain">

                    <div className="px-10 py-3 w-1/2">
                        <h3 className="text-xl font-bold font-body text-sub">Price</h3>
                    </div>
                    <div className="px-10 py-3 w-1/2 border-l-2 border-lightMain">
                        <h3 className="text-xl font-bold font-body text-main">${productPrice}</h3>
                    </div>

                </div>

                <div className="flex flex-col text-center justify-center items-center w-full lg:w-2/3 mx-auto border-b-2 border-x-2 border-lightMain py-8 px-5 font-medium text-[gray]">
                    <img src={photo} alt="" />
                    <p>{description}</p>
                    <button className="bg-main px-5 py-3 text-base font-heading font-semibold text-white hover:bg-sub rounded-md duration-300 mt-8">Add to Cart</button>
                </div>



            </div>
        </div>
    );
};

export default ProductDetails;