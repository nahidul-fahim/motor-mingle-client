import { Link, useLocation, useNavigate } from "react-router-dom";
import { BsFillEyeFill, BsFillEyeSlashFill, BsGoogle } from 'react-icons/bs';
import { MdHome } from "react-icons/md";
import { useContext, useState } from "react";
import { ToastContainer, toast, Zoom } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthContext } from "../../Context/AuthContext/AuthProvider";
import useAxiosPublic from "../../Hooks/useAxiosPublic/useAxiosPublic";



const LogIn = () => {


    // hooks and custom hooks
    const { createNewUserByGoogle, accessExistingUser } = useContext(AuthContext);
    const [showPassword, setShowPassword] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();
    const axiosPublic = useAxiosPublic();


    // get todays date
    const todayDate = new Date().toISOString().split('T')[0];


    // Toggle between show password and hide password

    const handleShowPassword = () => {
        setShowPassword(!showPassword)
    }


    //Login using email-password
    const handleLogIn = e => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;
        accessExistingUser(email, password)
            .then(() => {
                successNotify();
                // Redirect to path after login
                navigate(location?.state ? location.state : "/")
            })
            .catch(error => {
                const errorMessage = error.message;
                const errorCode = error.code;
                failedNotify(errorCode + "|" + errorMessage);
            })
    }


    //log in using Google 
    const handleGoogleSignIn = () => {
        createNewUserByGoogle()
            .then(result => {
                if (result) {

                    const data = result?.user;

                    // get the user info from google login
                    const name = data?.displayName;
                    const email = data?.email;
                    const userName = data?.displayName;
                    const photo = data?.photoURL;
                    const userCreationDate = todayDate;
                    const userType = "user";
                    const newUserInfo = { name, email, userName, photo, userCreationDate, userType }


                    // post the new user data to database
                    axiosPublic.post("/newuser", newUserInfo)
                        .then(() => {
                            //
                        })
                        // database post error
                        .catch(err => {
                            const error = err.code + "-" + err.message;
                            failedNotify(error);
                        })
                    successNotify();
                    navigate(location?.state ? location.state : "/")

                    successNotify();
                    // Redirect to path after login
                    navigate(location?.state ? location.state : "/")
                }

            })
            // firebase google-login error
            .catch(error => {
                failedNotify(error.code);
            })
    };



    // Success message for successful login
    const successNotify = () => toast.success('Login successful!', {
        position: "top-center",
        autoClose: 1500,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
        theme: "colored",
        transition: Zoom,
    });



    // Failed notification for failed login (email-password)
    const failedNotify = (errorMessage) => toast.error(`${errorMessage}`, {
        position: "top-center",
        autoClose: 1500,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
        theme: "colored",
        transition: Zoom,
    });



    return (
        <div>
            <div className="container mx-auto p-5 min-h-[100vh] flex flex-col justify-center items-center relative">

                <div className="space-y-14 flex flex-col justify-center items-center w-full font-heading">
                    <h2 className="text-3xl text-main font-bold  text-center">Login to your account</h2>

                    <form onSubmit={handleLogIn} className="flex flex-col justify-center items-center w-full md:w-2/3 lg:w-1/3 space-y-7 lg:space-y-10 px-10  font-medium">

                        <input type="email" name="email" placeholder="Email address" id="eamil" className="focus:outline-none border-b-[1px] pb-2 border-[lightgray] focus:border-main  transition-all duration-500 w-full" />

                        <div className="flex relative w-full justify-center items-center">
                            <input type={showPassword ? "text" : "password"} name="password" placeholder="Password" id="password" className="focus:outline-none border-b-[1px] pb-2 border-[lightgray] focus:border-main  transition-all duration-500 w-full" />
                            <span onClick={handleShowPassword} className="absolute right-2 text-[gray]"> {showPassword ? <BsFillEyeSlashFill /> : <BsFillEyeFill />} </span>
                        </div>

                        <input type="submit" value="Login" className="bg-main font-bold  px-4 py-2 rounded text-white hover:bg-sub duration-300 w-full" />

                        <ToastContainer closeButton={false} />

                    </form>

                    {/* back to homepage button */}
                    <Link to="/" className="absolute top-0 left-5 flex justify-center items-center gap-2 text-[18px] font-semibold hover:text-main duration-500 hover:scale-105"><MdHome /> Back to Home</Link>

                </div>


                <div className="mt-10 flex justify-center items-center flex-col w-full font-heading">
                    <button onClick={handleGoogleSignIn} className="bg-[#1fb3f8] px-4 py-2 rounded text-white  font-semibold hover:bg-sub duration-300 flex justify-center items-center gap-2"><BsGoogle /> Sign in using Google</button>
                    <div className="mt-5 flex justify-center items-center gap-1">
                        <p className="text-center  font-medium">{'Dont\'t'} have an account?</p>
                        <Link to="/signup" className="font-bold  border-t-2 border-t-[#ffffff00] border-b-2 border-main hover:text-white hover:bg-main px-2 py-1 hover:border-t-2 duration-300">Sign up</Link>
                    </div>
                </div>




            </div>
        </div>
    );
};

export default LogIn;