import Styles from '@/styles/forgotpass.module.css';
import { SetStateAction, useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { useRouter } from 'next/router';


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
        console.log(`Email: ${email}`);
        router.push('http://localhost:3000/components/forgotpassword/resultforgotpassword');
        // Gửi thông tin email và recaptchaToken lên server để xác nhận
        /* xử lí ở server,  CLIENT_ID là mã ID của ứng dụng được đăng ký{
            const { OAuth2Client } = require('google-auth-library');
            const client = new OAuth2Client(CLIENT_ID);

            async function verifyRecaptcha(recaptchaToken) {
            try {
                const ticket = await client.verifyIdToken({
                idToken: recaptchaToken,
                audience: CLIENT_ID,
                });
                const payload = ticket.getPayload();
                const userId = payload['sub'];
                // Xác nhận thành công
                return true;
            } catch (err) {
                console.error('Xác nhận Captcha thất bại:', err);
                return false;
            }
            }

            app.post('/forgot-password', async (req, res) => {
            const { email, recaptchaToken } = req.body;

            // Xác nhận Captcha
            const isCaptchaVerified = await verifyRecaptcha(recaptchaToken);
            if (!isCaptchaVerified) {
                res.status(400).send('Vui lòng xác nhận Captcha.');
                return;
            }

            // Tiếp tục quá trình quên mật khẩu
            // ...
            });
        } */
    };
    return(
        <>
            <div className={Styles.password_reset}>
                <div className={Styles.user_form}>
                    <div className={Styles.user_form_title}>
                        Forgotten Your Password?
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
                        <a className='link_login' href="http://localhost:3000/components/login/login"> Sign in </a>
                         instead.
                    </div>
                </div>
            </div>
        </>
    );
}