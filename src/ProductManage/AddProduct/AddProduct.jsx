import { Flip, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AOS from 'aos';
import 'aos/dist/aos.css';

const AddProduct = () => {


    // get today's date
    const todayDate = new Date().toISOString().split('T')[0]


    const handleAddProduct = e => {
        e.preventDefault();
        const form = e.target;
        const productName = form.productName.value;
        const brandName = form.brandName.value;
        const carType = form.carType.value;
        const productPrice = form.productPrice.value;
        const rating = form.rating.value;
        const description = form.description.value;
        const photo = form.photo.value;
        const addingDate = todayDate;

        const formInfo = { productName, brandName, carType, productPrice, rating, description, photo, addingDate}

        const addingForm = document.getElementById('productAddingForm')

        // Send the data to the server and databse
        fetch('http://localhost:5000/products', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(formInfo)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                if (data.insertedId) {
                    successNotify();
                    addingForm.reset();
                }
                else {
                    failureNotify()
                }
            })
    }


    // Successful product adding message
    const successNotify = () => toast.success('New product added successfully!', {
        position: "top-center",
        autoClose: 1800,
        hideProgressBar: true,
        closeOnClick: false,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
        theme: "colored",
        transition: Flip,
    });


    // Failed product adding message
    const failureNotify = () => toast.error('Failed to add new product.', {
        position: "top-center",
        autoClose: 1800,
        hideProgressBar: true,
        closeOnClick: false,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
        theme: "colored",
        transition: Flip,
    });


    AOS.init({
        offset: 120,
        duration: 1500,
        easing: 'ease',
        delay: 50,
    });

    return (
        <div className="flex flex-col justify-center items-center w-full h-full">
            <h2 className="text-center text-4xl md:text-5xl font-extrabold text-main  uppercase"
                data-aos="slide-right"
                data-aos-mirror="true"
                data-aos-once="false"
                data-aos-anchor-placement="top-bottom">Add a new product</h2>
            <form id='productAddingForm' onSubmit={handleAddProduct}
                className="flex flex-col justify-center items-center gap-14 mt-[70px] md:mt-[80px]  text-[18px] font-medium w-full lg:w-[90%]">

                <div className="flex flex-col lg:flex-row justify-between items-center gap-[40px] lg:gap-[100px] lg:p-0 w-full">
                    <input required type="text" name="productName" id="productName" placeholder="Enter car name" className="w-full lg:w-1/2 px-5 py-3 border-b-[1px] border-lightMain focus:outline-none focus:border-sub" />
                    <input required type="text" name="brandName" id="brandName" placeholder="Enter brand name" className="w-full lg:w-1/2 px-5 py-3 border-b-[1px] border-lightMain focus:outline-none focus:border-sub" />
                </div>

                <div className="flex flex-col lg:flex-row justify-between items-center gap-[40px] lg:gap-[100px] lg:p-0 w-full">
                    <input required type="text" name="carType" id="carType" placeholder="Enter car type" className="w-full lg:w-1/3 px-5 py-3 border-b-[1px] border-lightMain focus:outline-none focus:border-sub" />
                    <input required type="number" name="productPrice" id="productPrice" min="1000" placeholder="Price ($)" className="w-full lg:w-1/3 px-5 py-3 border-b-[1px] border-lightMain focus:outline-none focus:border-sub" />
                    <input required type="number" name="rating" id="rating" min="1" max="5" step=".01" placeholder="Rating (out of 5)" className="w-full lg:w-1/3 px-5 py-3 border-b-[1px] border-lightMain focus:outline-none focus:border-sub" />
                </div>

                <textarea required rows="2" name="description" id="description" placeholder="Enter short description about the car" className="w-full px-5 py-3 border-b-[1px] border-lightMain focus:outline-none focus:border-sub" />

                <input required type="text" name="photo" id="photo" placeholder="Enter car photo URL" className="w-full px-5 py-3 border-b-[1px] border-lightMain focus:outline-none focus:border-sub" />

                <input type="submit" value="Add the Product" className="w-full lg:w-2/3 px-5 py-3 bg-sub mt-5 rounded-md text-white hover:bg-main duration-300  font-semibold text-xl  cursor-pointer" />
            </form>

            <ToastContainer closeButton={false} />

        </div>
    );
};

export default AddProduct;