import 'react-toastify/dist/ReactToastify.css';
import { Zoom, toast } from 'react-toastify';




const useSuccessMessage = () => {

    const successNotify = (successMessage) => toast.success(`${successMessage}`, {
        position: "top-right",
        autoClose: 200,
        hideProgressBar: true,
        closeOnClick: false,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
        theme: "colored",
        transition: Zoom,
    });



    return successNotify();
};

export default useSuccessMessage;