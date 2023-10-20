import { Link, NavLink } from "react-router-dom";
import { FaUserAlt } from "react-icons/fa";
import { useContext } from "react";
import { AuthContext } from "../../Context/AuthContext/AuthProvider";
import { ToastContainer, toast, Zoom } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Header = () => {

    const { signOutUser, currentUser } = useContext(AuthContext);

    const websiteLogo = 'https://i.ibb.co/M5GYjtf/website-logo.png';


    const links = <>
        <NavLink to="/" className="hover:text-main duration-200">Home</NavLink>
        <NavLink to="/addProduct" className="hover:text-main duration-200">Add a Product</NavLink>
        <NavLink to="/myCart" className="hover:text-main duration-200">My Cart</NavLink>
    </>


    const handleLogOut = () => {
        signOutUser()
            .then(() => {
                successNotify();
            })
            .catch(() => {
                failedNotify();
            })
    }


    // signout notify
    const successNotify = () => toast.success('Logged out!', {
        position: "top-right",
        autoClose: 300,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
        theme: "colored",
        transition: Zoom,
    });


    // Fail notify
    const failedNotify = () => toast.error('Could not log out', {
        position: "top-right",
        autoClose: 300,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
        theme: "colored",
        transition: Zoom,
    });


    return (
        <div className="mx-auto">

            <div className="py-2 pr-5 bg-main">
                {
                    currentUser ? <div className="flex justify-end items-center gap-3 lg:gap-5">
                        <img src={currentUser?.photoURL} alt="" className="w-[35px] h-[35px] rounded-full bg-cover" />
                        <p className="text-[12px] md:text-[13px] lg:text-[14px] font-semibold text-[#ffffff] ">{currentUser?.displayName}</p>
                        <button onClick={handleLogOut} className="text-white bg-[#00000044] px-2 py-1 rounded  font-bold hover:text-sub hover:bg-white duration-300">Log out</button>
                    </div>
                        :
                        <div className="flex justify-end items-center gap-4">
                            <FaUserAlt className="text-main" />
                            <Link to="/login">
                                <button className="text-white bg-[#00000044] px-2 py-1 rounded  font-bold hover:text-sub hover:bg-white duration-300">Login</button>
                            </Link>
                            
                            <Link to="/signup">
                                <button className="text-white bg-[#00000044] px-2 py-1 rounded  font-bold hover:text-sub hover:bg-white duration-300">Sign up</button>
                            </Link>
                        </div>
                }
            </div>

            <div className="navbar bg-base-100">
                <div className="navbar-start">
                    <div className="dropdown">
                        <label tabIndex={0} className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                        </label>
                        <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-5 shadow bg-base-100 rounded-box w-52  text-base font-semibold space-y-4">
                            {links}
                        </ul>
                    </div>
                    <Link to="/">
                        <img src={websiteLogo} alt="Website Logo" className="w-2/3 hover:scale-125 duration-300" />
                    </Link>
                </div>


                <div className="navbar-end flex justify-end items-center gap-4">

                    <div className="navbar-center hidden lg:flex">
                        <ul className="menu menu-horizontal px-1  text-base font-bold space-x-10">
                            {links}
                        </ul>
                    </div>
                    <ToastContainer closeButton={false} />

                </div>

            </div>

        </div>
    );
};

export default Header;