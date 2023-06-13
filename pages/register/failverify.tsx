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
                        Xác minh tài khoản không thành công!
                    </div>
                    <div className={Styles.user_form_info}>
                        <img width={300} height={300}  src="../../images/failverify.png" alt="" />
                    </div>
                    <div className={Styles.user_form_info}>
                        Vui lòng chuyển tới trang
                        <a  href="http://localhost:8080/register"> Register </a>
                        để đăng ký lại.
                    </div> 
                    
                </div>
            </div>
            <Footer/>
        </>
    )
}