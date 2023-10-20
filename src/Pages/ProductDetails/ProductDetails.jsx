// import { useLoaderData } from "react-router-dom";

import { useParams } from "react-router-dom";


const ProductDetails = () => {

    // const detailProduct = useLoaderData();
    // console.log(detailProduct);

    const id = useParams();

    const productId = id._id;
    console.log(productId);


    fetch(`http://localhost:5000/brandProducts/${productId}`)
        .then(res => res.json())
        .then(data => {
            console.log(data)
        })


    return (
        <div>
            <h1 className="text-5xl font-bold">This is product details page</h1>
        </div>
    );
};

export default ProductDetails;