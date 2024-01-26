import AOS from 'aos';
import 'aos/dist/aos.css';





const Footer = () => {



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
                    <p className="font-semibold text-[14px] text-white">Copyright © 2023 - All right reserved</p>
                </aside>
            </footer>
        </div>
    );
};

export default Footer;