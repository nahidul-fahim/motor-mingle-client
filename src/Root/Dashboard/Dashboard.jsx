import { FaBars } from "react-icons/fa";
import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import useAuthContext from "../../Hooks/useAuthContext/useAuthContext";
import { MdHome } from "react-icons/md";
import { BiLogOut } from "react-icons/bi";
import useIsAdmin from "../../Hooks/useIsAdmin/useIsAdmin";
import { useEffect } from "react";


// website logo
const invertedLogo = "https://i.ibb.co/YWqCqyx/logo-inverted.png";


const Dashboard = () => {


    // hooks and custom hooks
    const { signOutUser, authLoading } = useAuthContext();
    const { isAdminPending, isAdmin } = useIsAdmin();
    const navigate = useNavigate();



    // redirect the user to different route as per user type
    useEffect(() => {
        const adminRedirect = () => {
            if (isAdmin) {
                navigate("/dashboard/statistics")
            }
        }
        const userRedirect = () => {
            navigate("/dashboard/profile")
        }
        if (!isAdminPending || !authLoading) {
            adminRedirect();
            userRedirect();
        }
    }, [isAdmin, isAdminPending, navigate, authLoading])




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



    // user dashboard links
    const userLinks = <>
        {/* user profile */}
        <NavLink to="/dashboard/profile"
            className={({ isActive }) => {
                return isActive ? "active-link-style" : "link-style"
            }}>
            Profile
        </NavLink>

        {/* sell post */}
        <NavLink to="/dashboard/sellyourcar"
            className={({ isActive }) => {
                return isActive ? "active-link-style" : "link-style"
            }}>
            Sell Your Car
        </NavLink>
    </>




    return (
        <div className="font-heading">

            <div className="drawer lg:drawer-open">

                <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content flex flex-col items-center justify-center p-5">
                    {/* Page content here */}
                    <Outlet />
                    <label htmlFor="my-drawer-2" className="drawer-button glass-background p-3 rounded-full text-white text-xl lg:hidden absolute top-4 left-5"><FaBars /></label>
                </div>

                {/* drawer sidebar */}
                <div className="drawer-side min-h-full lg:min-h-[100vh]">
                    <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>
                    <div className="menu p-4 w-[250px] h-full lg:min-h-full bg-main text-white font-medium flex flex-col justify-start items-start gap-5">

                        {/* website logo */}
                        <Link to="/" className="w-full flex justify-center items-center">
                            <img src={invertedLogo} alt="Motor mingle logo" className="w-2/4 hover:scale-110 duration-300" />
                        </Link>


                        {/* Sidebar links here */}
                        <div className="w-full flex-grow flex flex-col content-between justify-between">
                            {/* user links */}
                            <div className="w-full flex flex-col justify-start items-start gap-2">
                                {
                                    isAdmin ? adminLinks : userLinks
                                }
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