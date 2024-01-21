import { useRef } from "react";
import LoadingAnimation from "../../../../Components/Shared/LoadingAnimation/LoadingAnimation";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure/useAxiosSecure";
import useCurrentUser from "../../../../Hooks/useCurrentUser/useCurrentUser";
import { CgDanger, CgCheckO } from "react-icons/cg";
import { Flip, ToastContainer, toast } from 'react-toastify';



const UserProfile = () => {


    // hooks and custom hooks
    const detailsUpdateForm = useRef(null);
    const axiosSecure = useAxiosSecure();
    const { dbCurrentUserPending, dbCurrentUser, dbCurrentUserRefetch } = useCurrentUser();



    // conditional loading
    if (dbCurrentUserPending) {
        return <LoadingAnimation />
    }

    // handle request verification
    const handleVerificationRequest = () => {

        const requestUpdate = "requested";
        const verificationRequest = { requestUpdate };

        axiosSecure.put(`/updateUserDetails/${dbCurrentUser._id}`, verificationRequest)
            .then(res => {
                const data = res.data;
                if (data.modifiedCount > 0) {
                    successNotify("Requested for verification");
                    dbCurrentUserRefetch();
                    detailsUpdateForm.current.reset();
                }
            })
            .catch(err => failureNotify(err.code + "|" + err.message))
    }



    // handle user details update
    const handleUpdateDetails = e => {
        e.preventDefault();
        const form = e.target;
        const phone = form.phone.value;
        const address = form.address.value;

        const userDetails = { phone, address };

        // send the updated details to server and db
        axiosSecure.put(`/updateUserDetails/${dbCurrentUser._id}`, userDetails)
            .then(res => {
                const data = res.data;
                if (data.modifiedCount > 0) {
                    successNotify("Details updated");
                    dbCurrentUserRefetch();
                }
            })
            .catch(err => failureNotify(err.code + "|" + err.message))
    }



    // Successful message
    const successNotify = (successMessage) => toast.success(`${successMessage}`, {
        position: "top-center",
        autoClose: 1800,
        hideProgressBar: true,
        closeOnClick: false,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
        theme: "colored",
        transition: Flip,
    });


    // Failed message
    const failureNotify = (errorMessage) => toast.error(`${errorMessage}`, {
        position: "top-center",
        autoClose: 1800,
        hideProgressBar: true,
        closeOnClick: false,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
        theme: "colored",
        transition: Flip,
    });





    return (
        <div className="lg:min-h-[100vh] w-full flex flex-col justify-start items-center gap-5">

            {/* user details and veification status */}
            <div className="flex flex-col justify-center items-center gap-3">
                <img src={dbCurrentUser?.photo} alt="user profile photo" className="w-[100px] h-[100px] rounded-[50%]" />
                <h3 className="text-2xl font-semibold">Welcome, {dbCurrentUser?.name}</h3>
                <p className="text-lightBlack text-[16px] font-medium">{dbCurrentUser?.email}</p>
                <ToastContainer closeButton={false} />


                {
                    dbCurrentUser?.verifyStatus === "not verified" || dbCurrentUser?.verifyStatus === "declined" ?
                        <div className="flex flex-col justify-center items-center gap-3">
                            <p className="flex justify-center items-center gap-1 text-[18px] text-[red] font-medium capitalize"><CgDanger /> {dbCurrentUser?.verifyStatus}</p>
                            {
                                dbCurrentUser?.verificationRequest !== "requested" ?
                                    <button onClick={handleVerificationRequest}
                                        className="bg-main px-5 py-2 rounded-[5px] text-white font-medium hover:bg-sub duration-300">Request verification
                                    </button>
                                    :
                                    <p className="font-medium text-[orange]">Verification request pending</p>
                            }
                        </div>
                        :
                        <p className="flex justify-center items-center gap-1 text-[18px] text-[#0da50d] font-medium"><CgCheckO />Verified</p>

                }
            </div>

            {/* user details update form */}
            {
                !dbCurrentUser?.address || !dbCurrentUser?.phone ?
                    <div className="mt-8 w-full">
                        <form onSubmit={handleUpdateDetails} ref={detailsUpdateForm}>
                            {/* phone number, proper address */}
                            <div className='w-full flex flex-col lg:flex-row justify-center items-center gap-8'>

                                {/* phone number */}
                                <div className='font-body flex flex-col justify-start items-start gap-3 w-full lg:w-1/3'>
                                    <label className="font-medium">Your phone number <span className='text-[red]'>*</span></label>
                                    <input required type="tel" id='phone' name='phone' placeholder='Enter your phone number' className='w-full border-[1px] border-gray px-4 py-2 rounded-[3px] focus:outline-none focus:border-lightMain' />
                                </div>

                                {/* address */}
                                <div className='font-body flex flex-col justify-start items-start gap-3 w-full lg:w-2/3'>
                                    <label>Your address <span className='text-[red]'>*</span></label>
                                    <textarea required id='address' name='address' placeholder="Enter your proper address here" className='w-full border-[1px] border-gray px-4 py-2 rounded-[3px] focus:outline-none focus:border-lightMain'>
                                    </textarea>
                                </div>
                            </div>

                            {/* submit button */}
                            <input type="submit" value="Update details" className="w-fit px-4 py-2 bg-sub mt-5 rounded-md text-white hover:bg-main duration-300 font-semibold cursor-pointer" />
                        </form>
                    </div>
                    :
                    <div className="w-full lg:w-1/2 flex flex-col justify-start items-start gap-4 bg-[#ececec] p-5 shadow-[0_0_50px_#ececec] rounded-[5px]">
                        <p className="font-medium text-lightBlack"><span className="text-black">Phone:</span> {dbCurrentUser?.phone}</p>
                        
                        <p className="font-medium text-lightBlack"><span className="text-black">Address:</span> {dbCurrentUser?.address}</p>
                    </div>
            }

        </div>
    );
};

export default UserProfile;