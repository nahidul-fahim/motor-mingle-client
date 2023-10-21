import PropTypes from 'prop-types';
import { createContext, useEffect, useState } from "react";



export const websiteContentContext = createContext('');

const ContentProvider = ({ children }) => {

    const [carBrands, setCarBrands] = useState([]);
    const [loading, setLoading] = useState(true);


    //Load all the brands
    useEffect(() => {
        fetch('https://motor-mingle-server.vercel.app/brands')
            .then(res => res.json())
            .then(data => {
                setCarBrands(data);
                setLoading(false);
            })
    }, [])


    // Dark-light theme toggling function
    const [isLightMode, setIsLightMode] = useState(true);

    const toggleTheme = () => {
        setIsLightMode(!isLightMode);
    };


    const setDarkMode = () => {
        document.querySelector("html").setAttribute('data-theme', 'dark');
    }
    const setLightMode = () => {
        document.querySelector("html").setAttribute('data-theme', 'light');
    }


    isLightMode ? setLightMode() : setDarkMode();




    // Send props to children
    const allContentInfo = { carBrands, loading, toggleTheme };

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