import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure/useAxiosSecure";
import LoadingAnimation from "../../../../Components/Shared/LoadingAnimation/LoadingAnimation";


const AllUsers = () => {

    // hooks and custom hooks
    const axiosSecure = useAxiosSecure();


    // fetch all user data
    const { isPending, data: allUsers, refetch } = useQuery({
        queryKey: ["all-users"],
        queryFn: async () => {
            const res = await axiosSecure.get("allusers")
            return res.data
        }
    })


    // update user verification status
    const handleVerificationRequest = (id, status) => {
        const updatedVerifyStatus = status;
        const requestUpdate = "responded";
        const updateStatus = { updatedVerifyStatus, requestUpdate };

        // update verification status in the userlist database
        axiosSecure.put(`/updateuserdetails/${id}`, updateStatus)
            .then(res => {
                const data = res.data;
                if (data.modifiedCount > 0) {
                    refetch();
                    console.log("status updated")
                }
            })
            .catch(err => console.log(err.code + "||" + err.message))


        // update verification status in the product listing database
        axiosSecure.put(`/updatesellerverification/${id}`, updateStatus)
            .then(() => {
                //
            })
            .catch(err => console.log(err.code + "||" + err.message))
    }



    if (isPending) {
        return <LoadingAnimation />
    }




    return (
        <div className="lg:min-h-[100vh] flex flex-col justify-start items-center gap-5 w-full">
            <h2 className="text-center text-4xl md:text-5xl font-extrabold text-main  uppercase">All User List</h2>


            {/* all user list table */}
            <div className="overflow-x-auto w-full mt-8">
                <table className="table font-body text-center">
                    {/* head */}
                    <thead>
                        <tr className="text-[15px] text-white bg-main">
                            <th>#</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Verify Status</th>
                            <th>Request</th>
                        </tr>
                    </thead>

                    <tbody>
                        {
                            allUsers?.map((singleUser, index) =>
                                <tr key={index}>
                                    {/* serial */}
                                    <td>{index + 1}</td>

                                    {/* name, image and id */}
                                    <td>
                                        <div className="flex items-center gap-3">
                                            <div className="avatar">
                                                <div className="mask mask-squircle rounded-[50%] w-12 h-12">
                                                    <img src={singleUser?.photo} alt="User photo" />
                                                </div>
                                            </div>
                                            <div>
                                                <div className="font-bold">{singleUser?.name}</div>
                                                <div className="text-[13px] opacity-70">{singleUser?._id}</div>
                                            </div>
                                        </div>
                                    </td>

                                    {/* email */}
                                    <td className="font-medium">{singleUser?.email}</td>

                                    {/* verify status */}
                                    <td className={`capitalize ${singleUser?.verifyStatus === "verified" ? 'text-[#1a9c1a]' : 'text-[#f51c1c]'} font-medium`}>{singleUser?.verifyStatus}</td>

                                    {/* verification request */}
                                    <td>
                                        {
                                            singleUser?.verificationRequest === "requested" && singleUser?.verifyStatus !== "verified" ?
                                                <div className="flex flex-col justify-center items-center gap-2">
                                                    <button onClick={() => handleVerificationRequest(singleUser?._id, "verified")}
                                                        className="bg-[#088008] text-white px-2 py-1 rounded-[2px] font-medium">Verify</button>
                                                    <button onClick={() => handleVerificationRequest(singleUser?._id, "declined")}
                                                        className="bg-[#dd1616] text-white px-2 py-1 rounded-[2px] font-medium">Decline</button>
                                                </div>
                                                :
                                                <p>No request</p>
                                        }
                                    </td>
                                </tr>)
                        }
                    </tbody>

                </table>
            </div>




        </div>
    );
};

export default AllUsers;