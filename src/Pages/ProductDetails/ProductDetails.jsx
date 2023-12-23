import { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "../../Context/AuthContext/AuthProvider";
import { Zoom, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useScrollToTop from "../../Hooks/useScrollToTop/useScrollToTop";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../Hooks/useAxiosPublic/useAxiosPublic";
import LoadingAnimation from "../../Components/Shared/LoadingAnimation/LoadingAnimation";
import useAxiosSecure from "../../Hooks/useAxiosSecure/useAxiosSecure";


const ProductDetails = () => {

    // hooks and custom hooks
    const scrollToTop = useScrollToTop()
    const axiosPublic = useAxiosPublic();
    const axiosSecure = useAxiosSecure();
    const { _id } = useParams();
    // const successNotify = useSuccessMessage();
    //Get the current user email
    const { currentUser } = useContext(AuthContext);


    // scroll to top when loaded
    useEffect(() => {
        scrollToTop();
    }, [scrollToTop])


    // fetching data using axios and tanstack
    const { isPending: productPending, data: singleProduct } = useQuery({
        queryKey: ["single-product", _id],
        queryFn: async () => {
            const res = await axiosPublic.get(`/brandProducts/${_id}`)
            return res.data;
        }
    })

    // coditional loading when data is not ready
    if (productPending) {
        return <LoadingAnimation />
    }

    // get the current user mail
    const userEmail = currentUser?.email;
    const userName = currentUser?.displayName;


    // get every single key from object
    const { productName, brandName, carType, productPrice: prodcutPriceString, description, photo } = singleProduct;

    // convert product price to number
    const productPrice = parseInt(prodcutPriceString);



    // get todays date
    const purchasedDate = new Date().toISOString().split("T")[0];

    // get current time
    const currentDate = new Date();
    const currentHours = currentDate.getHours();
    const currentMinutes = currentDate.getMinutes();
    const currentSeconds = currentDate.getSeconds();

    const purchasedTime = `${currentHours}:${currentMinutes}:${currentSeconds}`;



    // add to cart functionality
    const handleAddToCart = () => {


        // data to save to the cart info
        const cartInfo = { productName, brandName, carType, productPrice, description, photo, purchasedDate, purchasedTime, userName, userEmail };


        // send new cart data to database
        axiosSecure.post("/productsOnCart", cartInfo)
            .then(res => {
                const data = res.data;
                if (data.insertedId) {
                    successNotify("Product added to cart!")
                }
            })
            .catch(err => {
                if (err) {
                    failureNotify(err.code)
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
        transition: Zoom,
    });


    // Failed product adding message
    const failureNotify = (errorMessage) => toast.error(`${errorMessage}`, {
        position: "top-right",
        autoClose: 200,
        hideProgressBar: true,
        closeOnClick: false,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
        theme: "colored",
        transition: Zoom,
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