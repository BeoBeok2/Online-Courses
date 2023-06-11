import Styles from '@/styles/changepassword.module.css';
import { SetStateAction, useState } from 'react';
import PasswordStrengthIndicator from '../PasswordStrengthIndicator';
import Header from '../footer/header';
import Footer from '../footer/footer';
import Banner from '../banner';


export default function ChangePassword(){
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = (event: { preventDefault: () => void; }) => {
        event.preventDefault();
        if (password !== confirmPassword) {
            setError(`Mật khẩu không khớp nhau`);
        } 
        else {
            // perform password change action here
            alert(`Đổi mật khẩu thành công!`)
            console.log(`Email: ${password}`);
            setPassword('');
            setConfirmPassword('');
            setError('');
        }
    };

    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const toggleShowConfirmPassword = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };
    function handlePasswordChange(event: { target: { value: SetStateAction<string>; }; }) {
        setPassword(event.target.value);
      }
    function handleConfirmPasswordChange(event: { target: { value: SetStateAction<string>; }; }) {
        setConfirmPassword(event.target.value);
      }
    return(
        <>
            <Header/>
            <Banner title='Change Password'/>
            <div className={Styles.container}>
                <section id={Styles.primary}>
                    <div >
                        <form method='post' className={Styles.form_changepassword} onSubmit={handleSubmit}>
                            <p className={Styles.form_changepassword_info}>Enter a new password below.</p>
                            <div className={Styles.form_changepassword_new1}>
                                <label className={Styles.form_changepassword_label1}>
                                    New password <span className={Styles.required}>*</span>
                                </label>
                                <input
                                    className={Styles.form_changepassword_input1}
                                    type={showPassword ? 'text' : 'password'}
                                    value={password}
                                    onChange={handlePasswordChange} required
                                    />
                                <button type="button" onClick={toggleShowPassword} className={Styles.button_hide_pass}>
                                    {showPassword ? <img src="../../images/show-pass.jpg" width="40px" alt="hidepass" /> : <img src="../../images/hide-pass.jpg" width="40px" alt="pass" />}
                                </button>
                                <div className={Styles.checkstreng_pass}>
                                    {password && <PasswordStrengthIndicator password={password} />}
                                </div>
                            </div>
                            
                            <div className={Styles.form_changepassword_new2}>
                                <label className={Styles.form_changepassword_label2}>
                                    Re-enter new password <span className={Styles.required}>*</span>
                                </label>
                                <input
                                    className={Styles.form_changepassword_input2}
                                    type={showConfirmPassword ? 'text' : 'password'}
                                    value={confirmPassword}
                                    onChange={handleConfirmPasswordChange}
                                    />
                                <button type="button" onClick={toggleShowConfirmPassword} className={Styles.button_hide_pass}>
                                    {showConfirmPassword ? <img src="../../images/show-pass.jpg" width="40px" alt="hidepass" /> : <img src="../../images/hide-pass.jpg" width="40px" alt="pass" />}
                                </button>
                            </div>
                            <p className={Styles.changpass_save}>
                                {error && <p className={Styles.error_pass}>{error}</p>}
                                <button type="submit" id={Styles.changpass_save} value={'Save'}>Save</button>
                            </p>
                        </form>
                    </div>
                </section>
            </div>
            <Footer/>
        </>
    );
} 