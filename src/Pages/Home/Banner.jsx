import AOS from 'aos';
import 'aos/dist/aos.css';
import { FaSearch } from "react-icons/fa";


const bannerImg = "https://i.ibb.co/bdDtPCd/slider51.png";

const Banner = () => {


    let allCarBrands = ["Acura", "Alfa Romeo", "Aston Martin", "Audi", "Bentley", "BMW", "Bugatti", "Buick", "Cadillac", "Chevrolet", "Chrysler", "Citroën", "Dodge", "Ferrari", "Fiat", "Ford", "Genesis", "GMC", "Honda", "Hyundai", "Infiniti", "Jaguar", "Jeep", "Kia", "Lamborghini", "Land Rover", "Lexus", "Lincoln", "Lotus", "Maserati", "Mazda", "McLaren", "Mercedes-Benz", "Mini", "Mitsubishi", "Nissan", "Pagani", "Peugeot", "Porsche", "Ram", "Rolls-Royce", "Subaru", "Suzuki", "Tesla", "Toyota", "Volkswagen", "Volvo"];



    // handle home search
    const handleHomeSearch = e => {
        e.preventDefault();
        console.log("searched")
    }




    // animation
    AOS.init({
        offset: 120,
        duration: 1500,
        easing: 'ease',
        delay: 50,
    });





    return (
        <div className="min-h-calc-100vh-70 bg-contain"
            style={{
                backgroundImage: `linear-gradient(to bottom, #d1dcff00, #FFFFFF00), url(${bannerImg})`,
                backgroundRepeat: 'no-repeat',
                backgroundSize: '',
                backgroundPosition: 'bottom'
            }}>
            <div className="container mx-auto p-5 h-full flex flex-col justify-start items-center font-body gap-4">
                <p className="text-main text-[18px] mt-[50px]"
                    data-aos="zoom-in"
                    data-aos-mirror="true"
                    data-aos-once="false"
                    data-aos-anchor-placement="top-bottom">The dream place for car buy and sell</p>
                <h1 className="text-black text-6xl lg:text-7xl font-bold text-center"
                    data-aos="fade-down"
                    data-aos-mirror="true"
                    data-aos-once="false"
                    data-aos-anchor-placement="top-bottom">Find Your Dream Car</h1>

                {/* filtered car search */}
                <form onSubmit={handleHomeSearch}
                    className='w-[80%] flex justify-between items-center mt-12 bg-white p-4 shadow-[0_0_70px_#cfcfcf] rounded-[80px]'>

                    {/* car condition */}
                    <select required id='carCondition' defaultValue={"Choose car condition"} name='carCondition' className='px-4 py-2 flex justify-between items-center rounded-[3px] focus:outline-none'>
                        <option disabled>Choose car condition</option>
                        <option value="super fresh">Super Fresh</option>
                        <option value="fresh">Fresh</option>
                        <option value="moderate">Moderate</option>
                    </select>

                    {/* car brand */}
                    <select required id='carBrand' name='carBrand' className='px-4 py-2 rounded-[3px] focus:outline-none'>
                        {
                            allCarBrands.map((carBrand, index) =>
                                <option key={index} value={carBrand} className='capitalize'>{carBrand}</option>)
                        }
                    </select>

                    {/* price range */}
                    <select required id='carPrice' defaultValue={"Select price range"} name='carPrice' className='px-4 py-2 rounded-[3px] focus:outline-none'>
                        <option disabled>Select price range</option>
                        <option value="1000-1999">$1000 - $1999</option>
                        <option value="2000-3999">$2000 - $3999</option>
                        <option value="4000-5999">$4000 - $5999</option>
                        <option value="6000-8000">$6000 - $7999</option>
                        <option value="8000+">$8000 - above</option>
                    </select>

                    {/* submit button */}
                    <button type="submit" className='bg-sub text-white p-5 rounded-[100%] font-bold hover:bg-white hover:text-sub duration-500'>
                    <FaSearch className='text-xl'/>
                </button>


            </form>




        </div>

        </div >
    );
};

export default Banner;