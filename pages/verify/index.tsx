import Styles from '@/styles/forgotpass.module.css';
import { SetStateAction, useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { useRouter } from 'next/router';
import Header from '../components/footerheader/header';
import Footer from '../components/footerheader/footer';
import Banner from '../components/footerheader/banner';
import host from '../api/host';
import axios from 'axios';


export default function ForgotPassword () {
    const [email, setEmail] = useState("");
    const [recaptchaToken, setRecaptchaToken] = useState("");
    const router = useRouter();

    const handleEmailChange = (event: { target: { value: SetStateAction<string>; }; }) => {
        setEmail(event.target.value);
    };

     const handleRecaptchaChange = (value: string | null) => {
        const token = value || '';
        setRecaptchaToken(token);
    }; 
    
    const handleSubmit = async (event: { preventDefault: () => void; }) => {
        event.preventDefault();
     
        axios.post(`${host}/auth/account`, {
                "email": email, 
        }).then(result => {
            console.log(result)
        router.push('http://localhost:8080/verify/success');

        }).catch(err => console.log(err))
        
    };
    return(
        <>
            <Header/>
            <Banner title='Verify Account'/>
            <div className={Styles.password_reset}>
                <div className={Styles.user_form}>
                    <div className={Styles.user_form_title}>
                        Enter your email to verify account
                    </div>
                    <div className={Styles.user_form_info}>
                        We'll email you a link to reset it.
                    </div>
                    <form className={Styles.password_reset_form } onSubmit={handleSubmit}  method='post'>
                        <fieldset className={Styles.field_set_email}>
                            <input className={Styles.input_field} type="email"  required value={email} name="email_forgot" placeholder='Your Email Address' id="email" onChange={handleEmailChange}/>
                        </fieldset>
                        { <ReCAPTCHA
                            sitekey="YOUR_SITE_KEY"
                            onChange={handleRecaptchaChange}
                            className={Styles.form_captcha}
                        /> }
                        <button className={Styles.submit_forgotpass} type="submit" /*disabled={!recaptchaToken}*/ onClick={() => console.log(recaptchaToken)} formAction=''>
                            Send Email
                            <img src="../../../images/icon-email.png" alt="icon-mail" width={20} height={20}/>
                        </button>
                    </form>
                    <div className={Styles.user_form_info}>
                        Just remembered?
                        <a className='link_login' href="http://localhost:8080"> Sign in </a>
                         instead.
                    </div>
                </div>
            </div>
            <Footer/>
        </>
    );
}