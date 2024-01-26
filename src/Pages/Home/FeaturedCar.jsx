import AOS from 'aos';
import 'aos/dist/aos.css';
import useAxiosPublic from '../../Hooks/useAxiosPublic/useAxiosPublic';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { IoSpeedometerOutline } from "react-icons/io5";
import { BsFuelPumpDiesel } from "react-icons/bs";
import { TbManualGearbox } from "react-icons/tb";
import { GoArrowUpRight } from "react-icons/go";



const FeaturedCar = () => {


    const axiosPublic = useAxiosPublic();

    const { isPending: listingPending, data: listings } = useQuery({
        queryKey: ["listings"],
        queryFn: async () => {
            const res = await axiosPublic.get("/homeListings")
            return res.data;
        }
    })


    if (listingPending) {
        return <p className='text-center text-lightBlack capitalize'>loading....</p>
    }


    AOS.init({
        offset: 120,
        duration: 1200,
        easing: 'ease',
        delay: 50,
    });


    return (
        <div className='mt-[6rem] flex flex-col justify-center items-center gap-4 container mx-auto p-5'>
            <h2 className="text-3xl md:text-5xl capitalize text-main font-semibold text-center"
                data-aos="slide-down"
                data-aos-mirror="true"
                data-aos-once="false"
                data-aos-anchor-placement="top-bottom">Latest Cars</h2>
            <p className='text-center text-lightBlack'>
                A friendly collection for you. You can have a look and choose the best for you.
            </p>

            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-7 w-full mt-10'>
                {
                    listings.map(listing =>
                        <div key={listing?._id} className='flex flex-col justify-center items-start'>
                            <img src={listing?.photo} alt="" className='w-full lg:w-[330px] lg:h-[198px] rounded-t-[20px]' />
                            <div className='w-full border-x-[1px] border-b-[1px] border-[#e4e4e4] p-2 rounded-[20px]'>
                                <h3 className='mt-3 w-full px-3 text-xl text-black font-semibold border-b-[1px] pb-2 border-[#e4e4e4]'>{listing?.carName}</h3>

                                {/* car details */}
                                <div className='p-3 w-full flex justify-between items-center border-b-[1px] border-[#e4e4e4]'>

                                    {/* total km */}
                                    <div className='flex flex-col justify-center items-center gap-1'>
                                        <IoSpeedometerOutline className='text-xl text-lightBlack' />
                                        <p className='text-lightBlack font-medium text-[14px]'>{listing?.totalRun} km</p>
                                    </div>

                                    {/* fuel */}
                                    <div className='flex flex-col justify-center items-center gap-2'>
                                        <BsFuelPumpDiesel className='text-xl text-lightBlack' />
                                        <p className='text-lightBlack capitalize font-medium text-[14px]'>{listing?.fuelType}</p>
                                    </div>

                                    {/* gear type */}
                                    <div className='flex flex-col justify-center items-center gap-1'>
                                        <TbManualGearbox className='text-xl text-lightBlack' />
                                        <p className='text-lightBlack font-medium text-[14px]'>{listing?.transmissionType}</p>
                                    </div>
                                </div>

                                <div className='p-3 w-full flex justify-between items-center'>
                                    <p className='text-xl font-bold text-black'>${listing?.price}</p>
                                    <Link to={`/details/${listing?._id}`}><button className='text-sub font-semibold text-[18px] hover:text-black duration-500 flex justify-center items-center gap-1'>See Details <GoArrowUpRight /> </button></Link>
                                </div>
                            </div>
                        </div>
                    )
                }
            </div>

            <Link to={"/allListings"}><button className='bg-main px-4 py-3 rounded text-white font-semibold hover:bg-sub duration-500 mt-10'>See More</button></Link>
        </div>
    );
};

export default FeaturedCar;