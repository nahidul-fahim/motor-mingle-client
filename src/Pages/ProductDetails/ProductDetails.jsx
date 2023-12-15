import { useContext, useEffect } from "react";
import { useLoaderData } from "react-router-dom";
import { AuthContext } from "../../Context/AuthContext/AuthProvider";
import { Flip, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const ProductDetails = () => {

    const singleProduct = useLoaderData();
    const { productName, brandName, carType, productPrice, description, photo } = singleProduct;

    //Get the current user email
    const { currentUser } = useContext(AuthContext);
    const currentUserEmail = currentUser.email;


    // scroll to top when loaded
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])


    const handleAddToCart = () => {
        // e.preventDefault();
        const cartInfo = { productName, brandName, carType, productPrice, description, photo, currentUserEmail };

        // Send the cart info to the database
        fetch('http://localhost:5000/productsOnCart', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(cartInfo),
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.insertedId) {
                    successNotify()
                }
                else {
                    failureNotify()
                }
            })
    }



    // Successful product adding message
    const successNotify = () => toast.success('Product added to cart successfully!', {
        position: "top-right",
        autoClose: 200,
        hideProgressBar: true,
        closeOnClick: false,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
        theme: "colored",
        transition: Flip,
    });


    // Failed product adding message
    const failureNotify = () => toast.error('Failed to add to the cart.', {
        position: "top-right",
        autoClose: 200,
        hideProgressBar: true,
        closeOnClick: false,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
        theme: "colored",
        transition: Flip,
    });



    return (
        <div className="container mx-auto p-5 md:p-10 lg:p-5 mt-[5rem]">
            <div className="flex flex-col justify-center items-center">

                <div className="flex justify-center items-center w-full lg:w-2/3 mx-auto">
                    <div className="px-10 py-3 border-y-2 border-l-2 border-lightMain w-full md:w-1/2">
                        <h3 className="text-xl font-bold  text-second">Car name</h3>
                    </div>
                    <div className="px-10 py-3 border-y-2 border-x-2 border-lightMain w-full md:w-1/2">
                        <h3 className="text-xl font-bold text-main ">{productName}</h3>
                    </div>
                </div>


                <div className="flex justify-center items-center w-full lg:w-2/3 mx-auto border-b-2 border-x-2 border-lightMain">

                    <div className="px-10 py-3 w-1/2">
                        <h3 className="text-xl font-bold  text-second">Brand name</h3>
                    </div>
                    <div className="px-10 py-3 w-1/2 border-l-2 border-lightMain">
                        <h3 className="text-xl font-bold  text-main">{brandName}</h3>
                    </div>

                </div>

                <div className="flex justify-center items-center w-full lg:w-2/3 mx-auto border-b-2 border-x-2 border-lightMain">

                    <div className="px-10 py-3 w-1/2 ">
                        <h3 className="text-xl font-bold  text-second">Car type</h3>
                    </div>
                    <div className="px-10 py-3 w-1/2 border-l-2 border-lightMain">
                        <h3 className="text-xl font-bold  text-main">{carType}</h3>
                    </div>

                </div>

                <div className="flex justify-center items-center w-full lg:w-2/3 mx-auto border-b-2 border-x-2 border-lightMain">

                    <div className="px-10 py-3 w-1/2">
                        <h3 className="text-xl font-bold  text-second">Price</h3>
                    </div>
                    <div className="px-10 py-3 w-1/2 border-l-2 border-lightMain">
                        <h3 className="text-xl font-bold  text-main">${productPrice}</h3>
                    </div>

                </div>

                <div className="flex flex-col text-center justify-center items-center w-full lg:w-2/3 mx-auto border-b-2 border-x-2 border-lightMain py-8 px-5 font-medium text-[gray]">
                    <img src={photo} alt="" />
                    <p>{description}</p>
                    <button onClick={handleAddToCart} className="bg-main px-5 py-3 text-base  font-semibold text-white hover:bg-sub rounded-md duration-300 mt-8">Add to Cart</button>
                </div>

                <ToastContainer closeButton={false} />


            </div>
        </div>
    );
};

export default ProductDetails;