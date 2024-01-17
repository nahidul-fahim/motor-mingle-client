import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../useAxiosSecure/useAxiosSecure";


const useAllUsers = () => {

    // hooks and custom hooks
    const axiosSecure = useAxiosSecure();


    // fetch all products data using tanStack and axios
    const { isPending: allUsersPending, data: allUsers, allUsersRefetch } = useQuery({
        queryKey: ["all-users"],
        queryFn: async () => {
            const res = await axiosSecure.get("/allUsers")
            return res.data;
        }
    })

    return { allUsersPending, allUsers, allUsersRefetch }
};

export default useAllUsers;