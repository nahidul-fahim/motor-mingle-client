import LoadingAnimation from "../../Components/Shared/LoadingAnimation/LoadingAnimation";
import AOS from 'aos';
import 'aos/dist/aos.css';
import SingleListing from "../../Components/Shared/SingleListing/SingleListing";
import { useEffect, useState } from "react";
import useScrollToTop from "../../Hooks/useScrollToTop/useScrollToTop";
import useFilteredListings from "../../Hooks/useFilteredListings/useFilteredListings";
import Lottie from "lottie-react";
import carLottie from "../../assets/carLottie.json"


const allCarBrands = ["Acura", "Alfa Romeo", "Aston Martin", "Audi", "Bentley", "BMW", "Bugatti", "Buick", "Cadillac", "Chevrolet", "Chrysler", "Citroën", "Dodge", "Ferrari", "Fiat", "Ford", "Genesis", "GMC", "Honda", "Hyundai", "Infiniti", "Jaguar", "Jeep", "Kia", "Lamborghini", "Land Rover", "Lexus", "Lincoln", "Lotus", "Maserati", "Mazda", "McLaren", "Mercedes-Benz", "Mini", "Mitsubishi", "Nissan", "Pagani", "Peugeot", "Porsche", "Ram", "Rolls-Royce", "Subaru", "Suzuki", "Tesla", "Toyota", "Volkswagen", "Volvo"];


const AllListings = () => {

    // hooks and custom hooks
    const scrollToTop = useScrollToTop();
    const [currentPage, setCurrentPage] = useState(1);
    const [carCondition, setCarCondition] = useState(sessionStorage.getItem("carCondition") || "all");
    const [carBrand, setCarBrand] = useState(sessionStorage.getItem("carBrand") || "all");
    const [carPrice, setCarPrice] = useState(sessionStorage.getItem("carPrice") || "all");
    const { filteredListingPending, filteredListing, filteredListingRefetch, pages } = useFilteredListings(currentPage, carCondition, carBrand, carPrice);



    useEffect(() => {
        scrollToTop();
        sessionStorage.clear();
    }, [scrollToTop])


    // conditional loading
    if (filteredListingPending) {
        return <LoadingAnimation />
    }


    // set total pages
    const totalPages = [...Array(pages).keys()];


    // animation
    AOS.init({
        offset: 120,
        duration: 1500,
        easing: 'ease',
        delay: 50,
    });



    return (
        <div className="container mx-auto flex flex-col justify-center items-center gap-5 p-5">
            <h2 className="text-center text-4xl md:text-5xl font-bold text-main capitalize"
                data-aos="fade-down"
                data-aos-mirror="true"
                data-aos-once="false"
                data-aos-anchor-placement="top-bottom">All Listings</h2>

            {/* filtering options */}
            <div className="w-full flex flex-col md:flex-row justify-start items-start gap-2 md:justify-end md:items-center md:gap-8 lg:gap-10 mt-[20px] md:mt-[30px] lg:mt-[50px]">

                {/* car condition */}
                <div className="flex flex-row md:flex-col justify-start items-center md:items-start gap-3 md:gap-2">
                    <label className="text-lightBlack">Car condition</label>
                    <select
                        id='carCondition'
                        onChange={(e) => {
                            const selectedValue = e.target.value;
                            setCarCondition(selectedValue)
                        }}
                        defaultValue={carCondition} name='carCondition' className='text-lightBlack border-[1px] border-gray px-2 py-1 rounded focus:outline-none'>
                        <option disabled value="">Choose car condition</option>
                        <option value="all">All</option>
                        <option value="super fresh">Super Fresh</option>
                        <option value="fresh">Fresh</option>
                        <option value="moderate">Moderate</option>
                    </select>
                </div>

                {/* car brand */}
                <div className="flex flex-row md:flex-col justify-start items-center md:items-start gap-3 md:gap-2">
                    <label className="text-lightBlack">Car brand</label>
                    <select id='carBrand' name='carBrand' defaultValue={carBrand}
                        onChange={(e) => {
                            const selectedValue = e.target.value;
                            setCarBrand(selectedValue)
                        }}
                        className='text-lightBlack border-[1px] border-gray px-2 py-1 rounded focus:outline-none'>
                        <option disabled value="">Choose car brand</option>
                        <option value="all">All</option>
                        {
                            allCarBrands.map((carBrand, index) =>
                                <option key={index} value={carBrand} className='capitalize'>{carBrand}</option>)
                        }
                    </select>
                </div>

                {/* car price */}
                <div className="flex flex-row md:flex-col justify-start items-center md:items-start gap-3 md:gap-2">
                    <label className="text-lightBlack">Price range</label>
                    <select id='carPrice' defaultValue={carPrice} name='carPrice'
                        onChange={(e) => {
                            const selectedValue = e.target.value;
                            setCarPrice(selectedValue)
                        }}
                        className='text-lightBlack border-[1px] border-gray px-2 py-1 rounded focus:outline-none'>
                        <option disabled value={""}>Select price range</option>
                        <option value="all">All</option>
                        <option value="1000-1999">$1000 - $1999</option>
                        <option value="2000-3999">$2000 - $3999</option>
                        <option value="4000-5999">$4000 - $5999</option>
                        <option value="6000-7999">$6000 - $7999</option>
                        <option value="8000+">$8000 - above</option>
                    </select>
                </div>
            </div>


            {/* show all the listings */}
            {
                filteredListing.length > 0 && !filteredListingPending ?

                    <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mt-[20px]">
                        {/* listing cards */}
                        {
                            filteredListing.map((singleList, index) =>
                                <SingleListing key={index} singleList={singleList} filteredListingRefetch={filteredListingRefetch}
                                ></SingleListing>
                            )
                        }
                    </div>

                    :
                    <div className="w-full h-full flex flex-col justify-center items-center">
                        <Lottie animationData={carLottie} />
                        <h3 className="text-4xl font-bold text-lightBlack text-center">Oops! No data found!</h3>
                    </div>
            }


            {/* pagination */}
            <div className="flex justify-center items-center gap-3 mt-10">
                {
                    totalPages.map(page =>
                        <button key={page}
                            onClick={() => setCurrentPage(page + 1)}
                            className={`border-[1px] border-sub w-[35px] h-[35px] hover:bg-sub hover:text-white duration-300 font-medium ${currentPage === page + 1 ? 'bg-sub text-white' : 'bg-white text-sub'}`}>
                            {page + 1}
                        </button>)
                }
            </div>
        </div >
    );
};

export default AllListings;