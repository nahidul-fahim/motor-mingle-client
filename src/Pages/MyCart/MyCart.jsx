import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Context/AuthContext/AuthProvider";
import SingleCartData from "./SingleCartData";



const MyCart = () => {

    const { currentUser } = useContext(AuthContext);
    const [cartData, setCartData] = useState([]);

    useEffect(() => {

        const userEmail = currentUser.email;

        fetch(`http://localhost:5000/productsOnCart/${userEmail}`)
            .then(res => res.json())
            .then(data => {
                setCartData(data);
            });
    }, [currentUser.email]);


    const remainingProducts = id => {
        const remainingAfterDelete = cartData.filter(singleCart => singleCart._id !== id);
        setCartData(remainingAfterDelete);
    };



    return (
        <div className="container mx-auto p-5 mt-[4rem]">
            <h2 className="text-5xl font-extrabold font-heading text-center uppercase text-main">My Cart</h2>
            <div>

                {
                    cartData.length === 0 ?
                        <div className="flex justify-center items-center mt-[5rem] h-[200px] lg:h-[350px]">
                            <h2 className="text-base uppercase font-bold font-heading text-center text-sub">{'Cart\'s'} empty. {'Let\'s'} fill it up!</h2>
                        </div>
                        :
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-14 mt-[6rem]">
                            {
                                cartData.map(singleCart => <SingleCartData
                                    key={singleCart._id}
                                    singleCart={singleCart}
                                    remainingProducts={remainingProducts}></SingleCartData>)
                            }
                        </div>
                }

            </div>
        </div>
    );
};

export default MyCart;