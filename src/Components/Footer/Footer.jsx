import AOS from 'aos';
import 'aos/dist/aos.css';





const Footer = () => {

    // get year
    const currentYear = new Date().getFullYear();



    AOS.init({
        offset: 120,
        duration: 1200,
        easing: 'ease',
        delay: 50,
    });



    return (
        <div className="bg-main mt-[6rem]">
            <footer className="footer footer-center p-10 text-primary-content">
                <aside>
                    <img src="https://i.ibb.co/KwNQzqq/logo-inverted.png" alt=""
                        data-aos="zoom-in"
                        data-aos-mirror="true"
                        data-aos-once="false"
                        data-aos-anchor-placement="top-bottom" />
                    <p className="font-bold text-xl text-white mt-5">
                        Motor Mingle
                    </p>
                    <p className="font-semibold text-[14px] text-white">Copyright © {currentYear} - All right reserved</p>
                    <p className='text-sub font-semibold  mt-5'>Developed by Nahid</p>
                    <div className='flex justify-center items-center gap-5 text-white'>
                        <a href='https://nahidul-islam-fahim.web.app' target='_blank' rel="noreferrer" className='single-nav-menu'>Portfolio</a>
                        <a href='https://www.linkedin.com/in/iamnahidul-islam/' target='_blank' rel="noreferrer" className='single-nav-menu'>LinkedIn</a>
                        <a href='https://github.com/nahidul-fahim' target='_blank' rel="noreferrer" className='single-nav-menu'>Github</a>
                    </div>
                </aside>
            </footer>
        </div>
    );
};

export default Footer;