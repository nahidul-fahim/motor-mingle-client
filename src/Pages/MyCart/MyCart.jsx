import { useContext } from "react";
import { AuthContext } from "../../Context/AuthContext/AuthProvider";
import SingleCartData from "./SingleCartData";
import AOS from 'aos';
import 'aos/dist/aos.css';
import useAxiosSecure from "../../Hooks/useAxiosSecure/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import LoadingAnimation from "../../Components/Shared/LoadingAnimation/LoadingAnimation";



const MyCart = () => {

    // hooks and custom hooks
    const { currentUser } = useContext(AuthContext);
    const axiosSecure = useAxiosSecure();

    // get current user mail
    const currentUserEmail = currentUser?.email;


    // data fetching
    const { isPending: cartDataPending, data: cartData, refetch } = useQuery({
        queryKey: ["cart-data", currentUserEmail],
        queryFn: async () => {
            const res = await axiosSecure.get(`/productsOnCart/${currentUserEmail}`)
            return res.data;
        }
    })


    // delete an item from cart
    const handleDelete = id => {

        axiosSecure.delete(`/productsOnCart/${id}`)
            .then(res => {
                const data = res.data;
                if (data.deletedCount > 0) {
                    refetch();
                }
            })
            .catch(err => {
                console.log(err.code, "||", err.message)
            })
    }


    // loading state for data loading
    if (cartDataPending) {
        return <LoadingAnimation />
    }


    AOS.init({
        offset: 120,
        duration: 1500,
        easing: 'ease',
        delay: 50,
    });


    return (
        <div className="container mx-auto p-5 mt-[4rem]">
            <h2 className="text-5xl font-bold  text-center capitalize text-main"
                data-aos="slide-right"
                data-aos-mirror="true"
                data-aos-once="false"
                data-aos-anchor-placement="top-bottom">My Cart</h2>
            <div>

                {
                    cartData.length === 0 ?
                        <div className="flex justify-center items-center mt-[5rem] h-[200px] lg:h-[350px]">
                            <h2 className="text-base capitalize font-bold  text-center text-sub">{'Cart\'s'} empty. {'Let\'s'} fill it up!</h2>
                        </div>
                        :
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-14 mt-[6rem]">
                            {
                                cartData.map(singleCart => <SingleCartData
                                    key={singleCart._id}
                                    singleCart={singleCart}
                                    handleDelete={handleDelete}
                                ></SingleCartData>)
                            }
                        </div>
                }

            </div>
        </div>
    );
};

export default MyCart;