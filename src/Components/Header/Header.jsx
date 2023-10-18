import { Link, NavLink } from "react-router-dom";
import { FaUserAlt } from "react-icons/fa";


const Header = () => {

    const websiteLogo = 'https://i.ibb.co/M5GYjtf/website-logo.png';

    const links = <>
        <NavLink to="/" className="hover:text-main duration-200">Home</NavLink>
        <NavLink to="/addProduct" className="hover:text-main duration-200">Add a Product</NavLink>
        <NavLink to="/myCart" className="hover:text-main duration-200">My Cart</NavLink>
    </>


    return (
        <div className="container mx-auto px-5">

            <div className="navbar bg-base-100">
                <div className="navbar-start">
                    <div className="dropdown">
                        <label tabIndex={0} className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                        </label>
                        <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-5 shadow bg-base-100 rounded-box w-52 font-body text-base font-medium space-y-4">
                            {links}
                        </ul>
                    </div>
                    <a>
                        <img src={websiteLogo} alt="Website Logo" className="w-2/3" />
                    </a>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1 font-body text-base font-semibold space-x-10">
                        {links}
                    </ul>
                </div>
                <div className="navbar-end flex justify-end items-center gap-4">
                    <FaUserAlt className="text-main"/>
                    <Link>
                        <button className="text-base font-body font-semibold hover:text-main duration-300">Login</button>
                    </Link>
                    <p className="text-black font-bold">|</p>
                    <Link>
                        <button className="text-base font-body font-semibold hover:text-main duration-300">Sign up</button>
                    </Link>
                </div>
            </div>

        </div>
    );
};

export default Header;