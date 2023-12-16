import { useContext } from "react";
import { AuthContext } from "../../Context/AuthContext/AuthProvider";


const useAuthContext = () => {

    const info = useContext(AuthContext);

    return info;
};

export default useAuthContext;