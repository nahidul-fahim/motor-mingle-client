import PropTypes from 'prop-types';
import { createContext, useEffect, useState } from "react";



export const websiteContentContext = createContext('');

const ContentProvider = ({ children }) => {

    const [carBrands, setCarBrands] = useState([]);
    const [loading, setLoading] = useState(true);


    //Load all the brands
    useEffect(() => {
        fetch('http://localhost:5000/brands')
            .then(res => res.json())
            .then(data => {
                setCarBrands(data);
                setLoading(false);
            })
    }, [])



    // Send props to children
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