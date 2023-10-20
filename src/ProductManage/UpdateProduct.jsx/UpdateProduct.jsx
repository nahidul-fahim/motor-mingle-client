import { useLoaderData } from "react-router-dom";


const UpdateProduct = () => {

    const singleProduct = useLoaderData();

    console.log(singleProduct)

    return (
        <div>
            <h1 className="text-3xl font-bold text-center mt-[10rem]">Product update page</h1>
        </div>
    );
};

export default UpdateProduct;