import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Context/AuthContext/AuthProvider";
import SingleCartData from "./SingleCartData";
import AOS from 'aos';
import 'aos/dist/aos.css';



const MyCart = () => {

    const { currentUser } = useContext(AuthContext);
    const [cartData, setCartData] = useState([]);


    useEffect(() => {

        const userEmail = currentUser.email;

        fetch(`https://motor-mingle-server.vercel.app/productsOnCart/${userEmail}`)
            .then(res => res.json())
            .then(data => {
                setCartData(data);
            });
    }, [currentUser.email]);


    const remainingProducts = id => {
        const remainingAfterDelete = cartData.filter(singleCart => singleCart._id !== id);
        setCartData(remainingAfterDelete);
    };

    AOS.init({
        offset: 120,
        duration: 1500,
        easing: 'ease',
        delay: 50,
    });


    return (
        <div className="container mx-auto p-5 mt-[4rem]">
            <h2 className="text-5xl font-extrabold  text-center uppercase text-main"
                data-aos="slide-right"
                data-aos-mirror="true"
                data-aos-once="false"
                data-aos-anchor-placement="top-bottom">My Cart</h2>
            <div>

                {
                    cartData.length === 0 ?
                        <div className="flex justify-center items-center mt-[5rem] h-[200px] lg:h-[350px]">
                            <h2 className="text-base uppercase font-bold  text-center text-sub">{'Cart\'s'} empty. {'Let\'s'} fill it up!</h2>
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