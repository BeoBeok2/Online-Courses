import Styles from '@/styles/forgotpass.module.css';
import Header from '../components/footerheader/header';
import Footer from '../components/footerheader/footer';
import Banner from '../components/footerheader/banner';

export default function ResultForgotPassword () {
    return(
        <>
            <Header/>
            <Banner title=''/>
            <div className={Styles.password_reset}>
                <div className={Styles.user_form}>
                    <div className={Styles.user_form_title}>
                        Success
                    </div>
                    <div className={Styles.user_form_info}>
                        We'll email you a link to reset it.
                    </div>
                    <div className={Styles.user_form_info}>
                        <p className={Styles.passwordreset_sent_info}>
                            If your email address is found in our system you should receive a reset request link shortly.
                        </p>
                        <img loading='lazy' className={Styles.passwordreset_sent_image} src="https://static.tutsplus.com/packs/media/images/courses/computer-mail-sent-0b1cf2b1dcdc8b001ce338af25ea85d8.gif" alt="" />
                    </div>
                    <div className={Styles.user_form_info}>
                        Haven't received the email? 
                        <a className='link_login' href="http://localhost:8080/forgotpassword"> Send again</a>
                    </div>
                </div>
            </div>
            <Footer/>
        </>
    )
}