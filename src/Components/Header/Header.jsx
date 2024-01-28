import { Link, NavLink } from "react-router-dom";
import { ToastContainer, toast, Zoom } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useAuthContext from "../../Hooks/useAuthContext/useAuthContext";
import useCurrentUser from "../../Hooks/useCurrentUser/useCurrentUser";


// website logo
const websiteLogo = 'https://i.ibb.co/DLF68G0/website-logo.png';


const Header = () => {


    // hooks and custom hooks
    const { currentUser, signOutUser } = useAuthContext();
    const { dbCurrentUser } = useCurrentUser();



    // handle logout
    const handleLogOut = () => {
        signOutUser()
            .then(() => {
                successNotify();
            })
            .catch(() => {
                failedNotify();
            })
    }


    // navigation bar links
    const links = <>
        {/* home */}
        <NavLink to="/"
            className={({ isActive }) => {
                return isActive ? "active-nav-menu" : "single-nav-menu"
            }}>Home</NavLink>

        {/* all listing */}
        <NavLink to="/allListings"
            className={({ isActive }) => {
                return isActive ? "active-nav-menu" : "single-nav-menu"
            }}>All listings</NavLink>
    </>


    // user dashboard links if user is signed in
    const userLinks = <>

        {
            currentUser ?
                <>
                    {/* dropdown */}
                    <div className="dropdown dropdown-bottom dropdown-end">
                        {/* avatar */}
                        <div tabIndex={0} role="button" className="avatar m-1">
                            <div className="w-10 rounded-full">
                                <img src={dbCurrentUser?.photo} alt="user photo" />
                            </div>
                        </div>
                        {/* dropdown links */}
                        <div tabIndex={0} className="dropdown-content z-[1] menu py-5 px-2 shadow rounded-box w-52 flex flex-col justify-start items-center gap-4 bg-white">
                            <p className="text-center text-[14px] font-medium capitalize text-[gray] font-heading">{dbCurrentUser?.userName}</p>
                            <Link to="/dashboard" className="hover:text-sub hover:translate-x-2  duration-300">Dashboard</Link>
                            <button onClick={handleLogOut} className="bg-sub text-white px-4 py-2 rounded-md hover:bg-main duration-300 hover:translate-x-2 font-medium">Log out</button>
                        </div>
                    </div>
                </>
                :
                <Link to="/login" className="bg-main font-heading text-white px-4 py-2 rounded-md font-medium">Login</Link>
        }

    </>



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
        <div className="container mx-auto z-[99] bg-white">

            <div className="navbar">
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
                        <img src={websiteLogo} alt="Website Logo" className="w-3/4 hover:scale-110  duration-500" />
                    </Link>
                </div>


                <div className="navbar-end flex justify-end items-center gap-4">

                    <div className="navbar-center lg:flex justify-end items-center">

                        {/* Links for desktop version */}
                        <div className="menu menu-horizontal px-1 text-base font-bold space-x-10">
                            <div className="hidden lg:flex justify-center items-center gap-7">
                                {links}
                            </div>
                            <div className="flex">
                                {userLinks}
                            </div>
                        </div>
                    </div>
                    <ToastContainer closeButton={false} />

                </div>

            </div>

        </div>
    );
};

export default Header;