

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

        const formInfo = {productName, brandName, carType, productPrice, rating, description}
        console.log(formInfo)
    }



    return (
        <div className="container mx-auto p-5 mt-[100px]">
            <h2 className="text-center text-5xl font-extrabold text-main font-heading uppercase">Add a new product</h2>
            <form onSubmit={handleAddProduct}
                className="flex flex-col justify-center items-center gap-14 mt-[100px] font-body text-[18px] font-medium">

                <div className="flex justify-between items-center gap-[100px] w-2/3">
                    <input type="text" name="productName" id="productName" placeholder="Enter car name" className="w-1/2 px-5 py-3 border-b-[1px] border-[#ff2c8f38] focus:outline-none focus:border-[#ff2c8ff6]" />
                    <input type="text" name="brandName" id="brandName" placeholder="Enter brand name" className="w-1/2 px-5 py-3 border-b-[1px] border-[#ff2c8f38] focus:outline-none focus:border-[#ff2c8ff6]" />
                </div>

                <div className="flex justify-between items-center gap-[100px] w-2/3">
                    <input type="text" name="carType" id="carType" placeholder="Enter car type" className="w-1/2 px-5 py-3 border-b-[1px] border-[#ff2c8f38] focus:outline-none focus:border-[#ff2c8ff6]" />
                    <input type="number" name="productPrice" id="productPrice" min="1000" placeholder="Price ($)" className="w-1/2 px-5 py-3 border-b-[1px] border-[#ff2c8f38] focus:outline-none focus:border-[#ff2c8ff6]" />
                    <input type="number" name="rating" id="rating" min="1" max="5" placeholder="Rating" className="w-1/2 px-5 py-3 border-b-[1px] border-[#ff2c8f38] focus:outline-none focus:border-[#ff2c8ff6]"/>
                </div>

                <textarea rows="2" name="description" id="description" placeholder="Enter short description about the car" className="w-2/3 px-5 py-3 border-b-[1px] border-[#ff2c8f38] focus:outline-none focus:border-[#ff2c8ff6]" />

                <input type="submit" value="Add the Product" className="w-2/3 px-5 py-3 bg-sub mt-5 rounded-md text-white hover:bg-main duration-300 font-heading font-semibold text-xl"/>
            </form>
        </div>
    );
};

export default AddProduct;