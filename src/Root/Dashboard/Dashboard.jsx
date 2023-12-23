import { FaBars } from "react-icons/fa";
import { Link, NavLink, Outlet } from "react-router-dom";
import useAuthContext from "../../Hooks/useAuthContext/useAuthContext";
import { MdHome } from "react-icons/md";
import { BiLogOut } from "react-icons/bi";


// website logo
const invertedLogo = "https://i.ibb.co/YWqCqyx/logo-inverted.png";


const Dashboard = () => {


    // hooks and custom hooks
    const { signOutUser } = useAuthContext();



    // webstie navigation links
    const navbarLinks = <>
        <Link to="/" className="link-style flex justify-start items-center gap-2"><MdHome className="text-xl" /> Home</Link>
        <button onClick={() => signOutUser()} className="link-style flex justify-start items-start gap-2"><BiLogOut className="text-xl" /> Log out</button>
    </>



    // admin dashboard links
    const adminLinks = <>
        {/* statistics */}
        <NavLink to="/dashboard/statistics"
            className={({ isActive }) => {
                return isActive ? "active-link-style" : "link-style"
            }}>
            Statiscs
        </NavLink>
        <NavLink to="/dashboard/statistics"
            className={({ isActive }) => {
                return isActive ? "active-link-style" : "link-style"
            }}>
            Statiscs
        </NavLink>


        {/* all products */}
        <NavLink to="/dashboard/adminallproducts"
            className={({ isActive }) => {
                return isActive ? "active-link-style" : "link-style"
            }}>
            All Products
        </NavLink>


        {/* add new product */}
        <NavLink to="/dashboard/addProduct"
            className={({ isActive }) => {
                return isActive ? "active-link-style" : "link-style"
            }}
        >
            Add new product
        </NavLink>
    </>




    return (
        <div className="font-heading">

            <div className="drawer lg:drawer-open">

                <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content flex flex-col items-center justify-center p-5">
                    {/* Page content here */}
                    <Outlet />
                    <label htmlFor="my-drawer-2" className="drawer-button glass-background p-3 rounded-full text-white text-2xl lg:hidden"><FaBars /></label>
                </div>

                {/* drawer sidebar */}
                <div className="drawer-side">
                    <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>
                    <div className="menu p-4 w-[250px] min-h-full bg-main text-white font-medium flex flex-col justify-start items-start gap-5">

                        {/* website logo */}
                        <Link to="/" className="w-full flex justify-center items-center">
                            <img src={invertedLogo} alt="Motor mingle logo" className="w-2/4 hover:scale-110 duration-300" />
                        </Link>


                        {/* Sidebar links here */}
                        <div className="w-full flex-grow flex flex-col content-between justify-between">
                            {/* user links */}
                            <div className="w-full flex flex-col justify-start items-start gap-2">
                                {adminLinks}
                            </div>

                            {/* navbarLinks links */}
                            <div className="w-full flex flex-col justify-start items-start gap-2">
                                {navbarLinks}
                            </div>

                        </div>



                    </div>
                </div>
            </div>

        </div>
    );
};

export default Dashboard;