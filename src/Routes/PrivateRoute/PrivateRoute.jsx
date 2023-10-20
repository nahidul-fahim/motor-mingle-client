import { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import { AuthContext } from '../../Context/AuthContext/AuthProvider';




const PrivateRoute = ({children}) => {

    const {currentUser, authLoading} = useContext(AuthContext);
    const location = useLocation();

    if (authLoading) {
        return <span className="loading loading-dots loading-lg container mx-auto flex justify-center items-center h-[100vh]"></span>
    }

    if(currentUser) {
        return children;
    }

    return ( <Navigate state={location.pathname} to="/login"></Navigate>
    );
};

export default PrivateRoute;

PrivateRoute.propTypes = {
    children: PropTypes.node,
}