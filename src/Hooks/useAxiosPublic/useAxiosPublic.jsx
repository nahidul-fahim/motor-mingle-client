import axios from "axios";

// create axios instance
const axiosPublic = axios.create({
    baseURL: 'http://localhost:5000'
})


const useAxiosPublic = () => {
    return axiosPublic;
};

export default useAxiosPublic;