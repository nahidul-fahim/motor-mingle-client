import PropTypes from 'prop-types';
import { createContext, useEffect, useState } from "react";



export const websiteContentContext = createContext('');

const ContentProvider = ({children}) => {

    const [carBrands, setCarBrands] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('https://motor-mingle-server-j07tt86md-nahidul-islams-projects.vercel.app/brands')
            .then(res => res.json())
            .then(data => {
                setCarBrands(data);
                setLoading(false);
            })
    }, [])


    const allContentInfo = { carBrands, loading };

    return (
        <websiteContentContext.Provider value={allContentInfo}>
            {children}
        </websiteContentContext.Provider>
    );
};

export default ContentProvider;


ContentProvider.propTypes = {
    children: PropTypes.object,
}