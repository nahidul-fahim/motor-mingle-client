import axios from "axios";


// create axios instance
const axiosSecure = axios.create({
    baseURL: 'http://localhost:5000'
})


const useAxiosSecure = () => {
    return axiosSecure;
};

export default useAxiosSecure;