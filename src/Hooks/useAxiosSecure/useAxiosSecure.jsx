import axios from "axios";
import useAuthContext from "../useAuthContext/useAuthContext";
import { useNavigate } from "react-router-dom";

// create axios instance
const axiosSecure = axios.create({
    baseURL: 'http://localhost:5000'
})


const useAxiosSecure = () => {


    // hooks and custom hooks
    const { signOutUser } = useAuthContext();
    const navigate = useNavigate();



    // axios interceptor to add token in header while request for verification in backend
    axiosSecure.interceptors.request.use(function (config) {
        const token = localStorage.getItem('access-token');
        config.headers.authorization = `Bearer ${token}`;
        console.log("intercept in request:", config.headers.authorization)
        return config;
    },
        function (error) {
            return Promise.reject(error);
        });


    // axios interceptor in response to intercept 401 and 403 status
    axiosSecure.interceptors.response.use(response => {
        return response;
    },
        async (error) => {
            const status = error?.request?.status;
            if (status === 401 || status === 403) {
                await signOutUser();
                navigate('/login');
            }
            return Promise.reject(error);
        })

    return axiosSecure;
};

export default useAxiosSecure;