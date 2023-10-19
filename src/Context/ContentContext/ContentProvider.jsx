import { createContext, useEffect, useState } from "react";



export const websiteContentContext = createContext('');

const ContentProvider = ({children}) => {

    const [carBrands, setCarBrands] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('http://localhost:5000/brands')
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