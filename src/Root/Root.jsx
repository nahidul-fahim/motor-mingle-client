import { Outlet } from "react-router-dom";
import Header from "../Components/Header/Header";
import Footer from "../Components/Footer/Footer";


const Root = () => {
    return (
        <div className="font-heading">
            <Header />
            <Outlet />
            <Footer />
        </div>
    );
};

export default Root;