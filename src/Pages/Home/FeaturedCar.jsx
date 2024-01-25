import AOS from 'aos';
import 'aos/dist/aos.css';
import useAxiosPublic from '../../Hooks/useAxiosPublic/useAxiosPublic';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';


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

            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-[50px] w-full mt-10'>
                {
                    listings.map(listing =>
                        <Link to={`/details/${listing?._id}`} key={listing?._id}>
                            <div className='flex flex-col justify-center items-start gap-2'>
                                <img src={listing?.photo} alt="" className='w-[367px] h-[220px]' />
                                <p className='font-medium text-third'>{listing?.carBrand}</p>
                                <div className='flex justify-between items-center w-full'>
                                    <h3 className='text-xl text-black font-semibold'>{listing?.carName}</h3>
                                    <h3 className='text-sub font-semibold text-xl'>${listing?.price}</h3>
                                </div>
                                <p className='text-lightBlack'>Added on: {listing?.addingDate}</p>
                            </div>
                        </Link>)
                }
            </div>

            <Link to={"/allListings"}><button className='bg-main px-4 py-3 rounded text-white font-medium hover:bg-sub duration-500 mt-10'>See More</button></Link>
        </div>
    );
};

export default FeaturedCar;