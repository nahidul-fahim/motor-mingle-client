import { useQuery } from "@tanstack/react-query";
import useAuthContext from "../useAuthContext/useAuthContext";
import useAxiosPublic from "../useAxiosPublic/useAxiosPublic";


const useCurrentUser = () => {

    // hooks
    const axiosPublic = useAxiosPublic();
    const { currentUser, authLoading } = useAuthContext();
    const userEmail = currentUser?.email;


    const { isPending: dbCurrentUserPending, data: dbCurrentUser, refetch: dbCurrentUserRefetch } = useQuery({
        queryKey: ["current-user", userEmail],
        enabled: !authLoading,
        queryFn: async () => {
            const res = await axiosPublic.get(`/currentuser?email=${userEmail}`)
            return res.data;
        }
    })

    return { dbCurrentUserPending, dbCurrentUser, dbCurrentUserRefetch }
};

export default useCurrentUser;