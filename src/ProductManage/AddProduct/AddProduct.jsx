import { Flip, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddProduct = () => {


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

        const formInfo = { productName, brandName, carType, productPrice, rating, description, photo }
        console.log(formInfo)

        const addingForm = document.getElementById('productAddingForm')

        // Send the data to the server and databse
        fetch('https://motor-mingle-server.vercel.app/products', {
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


    return (
        <div className="container mx-auto p-5 mt-[70px] md:mt-[80px]">
            <h2 className="text-center text-4xl md:text-5xl font-extrabold text-main  uppercase">Add a new product</h2>
            <form id='productAddingForm' onSubmit={handleAddProduct}
                className="flex flex-col justify-center items-center gap-14 mt-[70px] md:mt-[80px]  text-[18px] font-medium">

                <div className="flex flex-col lg:flex-row justify-between items-center gap-[40px] lg:gap-[100px] w-full lg:w-2/3 lg:p-0">
                    <input required type="text" name="productName" id="productName" placeholder="Enter car name" className="w-full lg:w-1/2 px-5 py-3 border-b-[1px] border-[#ff2c8f38] focus:outline-none focus:border-[#ff2c8ff6]" />
                    <input required type="text" name="brandName" id="brandName" placeholder="Enter brand name" className="w-full lg:w-1/2 px-5 py-3 border-b-[1px] border-[#ff2c8f38] focus:outline-none focus:border-[#ff2c8ff6]" />
                </div>

                <div className="flex flex-col lg:flex-row justify-between items-center gap-[40px] lg:gap-[100px] w-full lg:w-2/3 lg:p-0">
                    <input required type="text" name="carType" id="carType" placeholder="Enter car type" className="w-full lg:w-1/2 px-5 py-3 border-b-[1px] border-[#ff2c8f38] focus:outline-none focus:border-[#ff2c8ff6]" />
                    <input required type="number" name="productPrice" id="productPrice" min="1000" placeholder="Price ($)" className="w-full lg:w-1/2 px-5 py-3 border-b-[1px] border-[#ff2c8f38] focus:outline-none focus:border-[#ff2c8ff6]" />
                    <input required type="number" name="rating" id="rating" min="1" max="5" step=".01" placeholder="Rating (out of 5)" className="w-full lg:w-1/2 px-5 py-3 border-b-[1px] border-[#ff2c8f38] focus:outline-none focus:border-[#ff2c8ff6]" />
                </div>

                <textarea required rows="2" name="description" id="description" placeholder="Enter short description about the car" className="w-full lg:w-2/3 px-5 py-3 border-b-[1px] border-[#ff2c8f38] focus:outline-none focus:border-[#ff2c8ff6]" />

                <input required type="text" name="photo" id="photo" placeholder="Enter car photo URL" className="w-full lg:w-2/3 px-5 py-3 border-b-[1px] border-[#ff2c8f38] focus:outline-none focus:border-[#ff2c8ff6]" />

                <input type="submit" value="Add the Product" className="w-full lg:w-2/3 px-5 py-3 bg-sub mt-5 rounded-md text-white hover:bg-main duration-300  font-semibold text-xl" />
            </form>

            <ToastContainer closeButton={false} />

        </div>
    );
};

export default AddProduct;