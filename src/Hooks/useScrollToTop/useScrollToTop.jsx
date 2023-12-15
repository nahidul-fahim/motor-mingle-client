import { useEffect } from "react";


const useScrollToTop = () => {

    const scrollToTop = useEffect(() => {
        window.scrollTo(0, 0);
    }, [])


    return scrollToTop;
};

export default useScrollToTop;