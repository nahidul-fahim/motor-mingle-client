// loading animation gif
const loadingAnimation = "https://i.ibb.co/rZG4j5T/loading-Animation.gif";


const LoadingAnimation = () => {
    return (
        <div className='h-[100vh] w-full flex justify-center items-center'>
            <img src={loadingAnimation} alt="Loading Animation" />
        </div>
    );
};

export default LoadingAnimation;