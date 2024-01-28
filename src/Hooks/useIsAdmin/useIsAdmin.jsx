import { useQuery } from "@tanstack/react-query";
import useAuthContext from "../useAuthContext/useAuthContext";
import useAxiosSecure from "../useAxiosSecure/useAxiosSecure";


const useIsAdmin = () => {

    // hooks and custom hooks
    const { currentUser, authLoading } = useAuthContext();
    const axiosSecure = useAxiosSecure();

    const userEmail = currentUser?.email;


    // data fetch using tanStack query
    const { isPending: isAdminPending, data: isAdmin } = useQuery({
        queryKey: ["isAdmin", userEmail],
        enabled: !authLoading,
        queryFn: async () => {
            const res = await axiosSecure.get(`/user/admin/${userEmail}`)
            return res.data?.admin;
        }
    })

    return { isAdminPending, isAdmin }
};

export default useIsAdmin;