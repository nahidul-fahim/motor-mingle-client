import { Link } from "react-router-dom";


const ErrorPage = () => {
    return (
        <div className="container mx-auto p-5 flex flex-col justify-center items-center gap-0 h-[100vh]">
            <h1 className="text-2xl lg:text-4xl font-bold text-center ">Oops! That page can’t be found.</h1>
            <h1 className="text-[10rem] lg:text-[18rem] font-bold  text-center text-main">4<span className="text-sub">0</span>4</h1>
            <Link to="/"><button className="bg-main px-5 py-3 text-xl font-bold  text-white rounded-md hover:bg-sub duration-300 hover:shadow-[0_60px_40px_#ff00624d]">Back to Home</button></Link>
        </div>
    );
};

export default ErrorPage;