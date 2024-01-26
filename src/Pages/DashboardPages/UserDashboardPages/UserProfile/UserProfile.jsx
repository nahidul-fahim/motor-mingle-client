import { useRef, useState } from "react";
import LoadingAnimation from "../../../../Components/Shared/LoadingAnimation/LoadingAnimation";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure/useAxiosSecure";
import useCurrentUser from "../../../../Hooks/useCurrentUser/useCurrentUser";
import { CgDanger, CgCheckO } from "react-icons/cg";
import { Flip, ToastContainer, toast } from 'react-toastify';
import { useQuery } from "@tanstack/react-query";
import { FaStar } from "react-icons/fa";




const UserProfile = () => {


    // hooks and custom hooks
    const detailsUpdateForm = useRef(null);
    const feedbackForm = useRef(null);
    const axiosSecure = useAxiosSecure();
    const [feedbackRecorded, setFeedbackRecorded] = useState(false);
    const { dbCurrentUserPending, dbCurrentUser, dbCurrentUserRefetch } = useCurrentUser();


    // get feedback by the user
    const { isPending: feedbackPending, data: singleFeedback, refetch: feedbackRefetch } = useQuery({
        queryKey: ["user-feedback", dbCurrentUser._id, feedbackRecorded],
        queryFn: async () => {
            const res = await axiosSecure.get(`/singleFeedback/${dbCurrentUser._id}`)
            return res.data;
        }
    })



    // conditional loading
    if (dbCurrentUserPending || feedbackPending) {
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


    // get today's date
    const todayDate = new Date().toDateString().slice(4);



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



    // handle feedback submit by user
    const handleFeedbackSubmit = e => {
        e.preventDefault();
        const form = e.target;
        const ratingByUser = form.ratingByUser.value;
        const feedBack = form.feedbackByUser.value;
        const feedbackBy = dbCurrentUser._id;
        const feedbackProvidingDate = todayDate;
        const feedbackProvider = dbCurrentUser?.name;
        const feedbackProviderEmail = dbCurrentUser?.email;
        const feedbackProviderPhoto = dbCurrentUser?.photo;

        const feedbackDetails = { ratingByUser, feedBack, feedbackBy, feedbackProvidingDate, feedbackProvider, feedbackProviderEmail, feedbackProviderPhoto };

        // send the feedback to server and db
        axiosSecure.post("/userFeedback", feedbackDetails)
            .then(res => {
                const data = res.data;
                if (data.insertedId) {
                    setFeedbackRecorded(!feedbackRecorded);
                    successNotify("Feedback recorded");
                    feedbackForm.current.reset();
                    feedbackRefetch();
                }
            })
            .catch(err => failureNotify(err.code))
    }



    // Successful message
    const successNotify = (successMessage) => toast.success(`${successMessage}`, {
        position: "bottom-right",
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
        position: "bottom-right",
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

            {/* user details and verification status */}
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

            {/* parent container for details and review input */}
            <div className="w-full flex flex-col md:flex-row justify-center md:justify-between items-center gap-10 mt-8">

                {/* user details section */}
                <div className="w-full md:w-1/2 self-stretch">
                    {/* user details update form */}
                    {
                        !dbCurrentUser?.address || !dbCurrentUser?.phone ?
                            <div className="w-full flex flex-col justify-start items-start gap-5">

                                <h3 className="text-black text-2xl font-bold">Please provide your details</h3>

                                <form onSubmit={handleUpdateDetails} ref={detailsUpdateForm}
                                    className="w-full">
                                    {/* phone number, proper address */}
                                    <div className='w-full flex flex-col justify-start items-start gap-8'>

                                        {/* phone number */}
                                        <div className='font-body flex flex-col justify-start items-start gap-3 w-full'>
                                            <label className="font-medium">Your phone number <span className='text-[red]'>*</span></label>
                                            <input required type="tel" id='phone' name='phone' placeholder='Enter your phone number' className='w-full border-[1px] border-gray px-4 py-2 rounded-[3px] focus:outline-none focus:border-lightMain' />
                                        </div>

                                        {/* address */}
                                        <div className='font-body flex flex-col justify-start items-start gap-3 w-full'>
                                            <label>Your address <span className='text-[red]'>*</span></label>
                                            <textarea required id='address' name='address' placeholder="Enter your proper address here" className='w-full border-[1px] border-gray px-4 py-2 rounded-[3px] focus:outline-none focus:border-lightMain'>
                                            </textarea>
                                        </div>
                                    </div>

                                    {/* submit button */}
                                    <input type="submit" value="Update details" className="w-fit px-4 py-2 bg-black mt-5 rounded-md text-white hover:bg-sub duration-300 font-semibold cursor-pointer" />
                                </form>
                            </div>
                            :
                            <div className="w-full h-full flex flex-col justify-center items-start gap-4 bg-[#ececec] p-5 shadow-[0_0_50px_#ececec] rounded-[5px]">
                                <h3 className="text-black text-2xl font-bold">Your Address</h3>

                                <p className="font-medium text-lightBlack"><span className="text-black">Phone:</span> {dbCurrentUser?.phone}</p>

                                <p className="font-medium text-lightBlack"><span className="text-black">Address:</span> {dbCurrentUser?.address}</p>
                            </div>
                    }
                </div>


                <div className="w-full md:w-1/2 self-stretch">
                    {
                        singleFeedback ?
                            <div className="w-full h-full flex flex-col justify-center items-start gap-4 bg-[#ececec] p-5 shadow-[0_0_50px_#ececec] rounded-[5px]">
                                <h3 className="text-black text-2xl font-bold">Your feedback</h3>

                                <p className="font-medium text-lightBlack flex justify-center items-center gap-1"><span className="text-black">Rating:</span> {singleFeedback?.ratingByUser} <FaStar /> </p>

                                <p className="font-medium text-lightBlack"><span className="text-black">Feedback:</span> {singleFeedback?.feedBack}</p>

                                <p className="font-medium text-lightBlack"><span className="text-black">Provided on:</span> {singleFeedback?.feedbackProvidingDate}</p>
                            </div>
                            :
                            <div className="w-full flex flex-col justify-start items-start gap-5">
                                <h3 className="text-black text-2xl font-bold">We value your feedback</h3>

                                <form onSubmit={handleFeedbackSubmit} ref={feedbackForm}
                                    className="w-full">
                                    {/* rating and feedback */}
                                    <div className='w-full flex flex-col justify-start items-start gap-8'>

                                        {/* rating */}
                                        <div className='font-body flex flex-col justify-start items-start gap-3 w-full'>
                                            <label className="font-medium">Provide a rating <span className='text-[red]'>*</span></label>
                                            <select required id='ratingByUser' name='ratingByUser' defaultValue={""} className='w-full border-[1px] border-gray px-4 py-2 rounded-[3px] focus:outline-none focus:border-lightMain'>
                                                <option disabled value="">Choose rating</option>
                                                <option value="1">&#9733;</option>
                                                <option value="2">&#9733; &#9733;</option>
                                                <option value="3">&#9733; &#9733; &#9733;</option>
                                                <option value="4">&#9733; &#9733; &#9733; &#9733;</option>
                                                <option value="5">&#9733; &#9733; &#9733; &#9733; &#9733;</option>
                                            </select>
                                        </div>

                                        {/* feedback */}
                                        <div className='font-body flex flex-col justify-start items-start gap-3 w-full'>
                                            <label>Provide your feedback <span className='text-[red]'>*</span></label>
                                            <textarea required id='feedbackByUser' name='feedbackByUser' placeholder="Your valuable feedback about out platform" className='w-full border-[1px] border-gray px-4 py-2 rounded-[3px] focus:outline-none focus:border-lightMain'>
                                            </textarea>
                                        </div>
                                    </div>

                                    {/* submit button */}
                                    <input type="submit" value="Submit feedback" className="w-fit px-4 py-2 bg-black mt-5 rounded-md text-white hover:bg-sub duration-300 font-semibold cursor-pointer" />
                                </form>
                            </div>
                    }
                </div>



            </div>

        </div>
    );
};

export default UserProfile;