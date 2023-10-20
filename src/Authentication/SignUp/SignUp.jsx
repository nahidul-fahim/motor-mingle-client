import { Link } from "react-router-dom";
import { BsFillEyeFill, BsFillEyeSlashFill } from 'react-icons/bs';
import { useContext, useState } from "react";
import { ToastContainer, toast, Zoom } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthContext } from "../../Context/AuthContext/AuthProvider";




const SignUp = () => {

    const { createNewUser, updateProfileInfo, signOutUser } = useContext(AuthContext);


    const [showPassword, setShowPassword] = useState(false);
    const [passwordErrorMessage, setPasswordErrorMessage] = useState('');



    const handleSignUp = e => {
        e.preventDefault();
        const username = e.target.username.value;
        const email = e.target.email.value;
        const password = e.target.password.value;
        const photo = e.target.image.value;

        const regExPattern = /^(?=.*[A-Z])(?=.*[\W_]).{6,}$/;

        setPasswordErrorMessage();

        if (!regExPattern.test(password)) {
            setPasswordErrorMessage("Password should be minimum 6 characters, contain at least 1 capital letter & 1 special character");
            return;
        }

        createNewUser(email, password)
            .then(result => {
                successNotify();
                const currentUsersInfo = result.user;
                signOutUser();
                updateProfileInfo(currentUsersInfo, username, photo)
            })
            .catch(error => {
                failedNotify();
                console.log(error.code)
            });
    };




    const handleShowPassword = () => {
        setShowPassword(!showPassword)
    };


    // Account create success message

    const successNotify = () => toast.success('Account creation successfull', {
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



    // Account creation failure message

    const failedNotify = () => toast.error('Account creation failed', {
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
        <div className="container mx-auto p-5">

            <div className="space-y-14 flex flex-col justify-center items-center">
                <h2 className="text-3xl text-main font-bold text-center ">Sign up for free!</h2>

                <form onSubmit={handleSignUp} className="flex flex-col justify-center items-center w-full md:w-2/3 lg:w-1/3 space-y-7 lg:space-y-10 px-10 ">

                    <input type="text" name="name" placeholder="Full name" id="name" className="focus:outline-none border-b-[1px] pb-2 border-[lightgray] focus:border-main  transition-all duration-500 w-full" />

                    <input required type="email" name="email" placeholder="Email address" id="eamil" className="focus:outline-none border-b-[1px] pb-2 border-[lightgray] focus:border-main  transition-all duration-500 w-full" />

                    <input required type="text" name="username" placeholder="Username" id="username" className="focus:outline-none border-b-[1px] pb-2 border-[lightgray] focus:border-main  transition-all duration-500 w-full" />

                    <div className="w-full">
                        <div className="flex relative w-full justify-center items-center">
                            <input required type={showPassword ? "text" : "password"} name="password" placeholder="Password" id="password" className="focus:outline-none border-b-[1px] pb-2 border-[lightgray] focus:border-main  transition-all duration-500 w-full" />
                            <span onClick={handleShowPassword} className="absolute right-2 text-[gray]"> {showPassword ? <BsFillEyeSlashFill /> : <BsFillEyeFill />} </span>
                        </div>
                        {
                            passwordErrorMessage ? <p className="text-[14px] font-regular text-[#c73c3c]">{passwordErrorMessage}</p> : ''
                        }
                    </div>

                    <input required type="text" name="image" placeholder="Enter image URL" id="image" className="focus:outline-none border-b-[1px] pb-2 border-[lightgray] focus:border-main  transition-all duration-500 w-full" />


                    <input type="submit" value="Sign up" className="bg-main px-4 py-2 rounded text-white font-bold  hover:bg-sub duration-300 w-full" />

                    <ToastContainer closeButton={false} />

                </form>
            </div>

            <div className="flex justify-center items-center flex-col">
                <div className="mt-5 flex justify-center items-center gap-1">
                    <p className="text-center font-semibold ">Already have an account?</p>
                    <Link to="/login" className="font-bold  border-t-2 border-t-[#ffffff00] border-b-2 border-main hover:bg-main hover:text-white px-2 py-1 hover:border-t-2 duration-300">Login</Link>
                </div>
            </div>

        </div>
    );
};

export default SignUp;