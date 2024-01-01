import LoadingAnimation from "../../../../Components/Shared/LoadingAnimation/LoadingAnimation";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure/useAxiosSecure";
import useCurrentUser from "../../../../Hooks/useCurrentUser/useCurrentUser";
import { CgDanger, CgCheckO } from "react-icons/cg";
import { Flip, ToastContainer, toast } from 'react-toastify';



const UserProfile = () => {


    // hooks and custom hooks
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

        axiosSecure.put(`/verificationrequest/${dbCurrentUser._id}`, verificationRequest)
            .then(res => {
                const data = res.data;
                if (data.modifiedCount > 0) {
                    successNotify("Requested for verification");
                    dbCurrentUserRefetch();
                }
            })
            .catch(err => failureNotify(err.code + "|" + err.message))
    }


    // Successful product adding message
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


    // Failed product adding message
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
        <div className="lg:min-h-[100vh] flex justify-center items-start gap-5">
            <div className="flex flex-col justify-center items-center gap-3">
                <img src={dbCurrentUser?.photo} alt="user profile photo" className="w-[100px] h-[100px] rounded-[50%]" />
                <h3 className="text-2xl font-semibold">Welcome, {dbCurrentUser?.name}</h3>
                <p className="text-lightBlack text-[16px] font-medium">{dbCurrentUser?.email}</p>
                <ToastContainer closeButton={false} />
                {
                    dbCurrentUser?.verifyStatus === "not verified" ?
                        <div className="flex flex-col justify-center items-center gap-3">
                            <p className="flex justify-center items-center gap-1 text-[18px] text-[red] font-medium"><CgDanger /> Not verified</p>
                            {
                                dbCurrentUser?.verifyStatus === "not verified" && dbCurrentUser?.verificationRequest === "requested" ?
                                    <p className="font-medium text-[orange]">Verification request pending</p>
                                    :
                                    <button onClick={handleVerificationRequest}
                                        className="bg-main px-5 py-2 rounded-[5px] text-white font-medium hover:bg-sub duration-300">Request verification
                                    </button>
                            }
                        </div>
                        :
                        <p className="flex justify-center items-center gap-1 text-[18px] text-[#0da50d] font-medium"><CgCheckO /> Not verified</p>
                }
            </div>
        </div>
    );
};

export default UserProfile;