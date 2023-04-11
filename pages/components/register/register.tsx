import Styles from '@/styles/register.module.css';
import { data } from 'autoprefixer';
import PasswordInput from "../passwordinput";
import { SetStateAction, useState } from "react";
import PasswordStrengthIndicator from '../PasswordStrengthIndicator';


export default function Register() {
    const [showPassword, setShowPassword] = useState(false);

    const [username, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');

    // const handleInputChange = (event: { target: { value: SetStateAction<string>; }; }) => {
    //     setPassword(event.target.value);
    // };
    const handleToggleClick = () => {
        setShowPassword(!showPassword);
    };
    const handleSubmit = (event: { preventDefault: () => void; }) => {
        event.preventDefault();
        console.log('Form submitted!');
        console.log(`UserName: ${username}`);
        console.log(`Email: ${email}`);
        console.log(`Password: ${password}`);
        console.log(`Name: ${name}`);
        setEmail('');
        setPassword('');
        setUserName('');
        setName('');
    };
    return(
        <>
            
            <main>
                <div className={Styles.main}>
                    <form className={Styles.container} onSubmit={handleSubmit}>
                        <section id={Styles.primary} >
                            
                            <aside className={Styles.feedback}>
                                <span className={Styles.icon} aria-hidden="true">
                                    <img src="../../images/icon-chuy.png"width="20px" alt="" />
                                </span>
                                <p>Registering for this site is easy. Just fill in the fields below, and we’ll get a new account set up for you in no time.</p>
                            </aside>
                        </section>
                        <br />
                        <div className={Styles.formregister}>
                            <div className={Styles.layoutwrap}>
                                <div className={Styles.account}>
                                    <h2 className={Styles.h2}>Account Details</h2>
                                    <label htmlFor="signup_username">Username (required)</label>
                                    <input type="text" name='signup_username' id='signup_username' value={username} onChange={(e) => setUserName(e.target.value)} required />
                                    <label htmlFor="signup_email">Email Address (required)</label>
                                    <input type="email" name='signup_email' id='signup_email' value={email} onChange={(e) => setEmail(e.target.value)} required />
                                    <label htmlFor="pass1">Choose a Password (required)</label>
                                    <div className={Styles.passwordwrap}>
                                        <input 
                                            type={showPassword ? "text" : "password"}
                                            id={Styles.pass1}
                                            name='signup_password'
                                            value={password}
                                            placeholder='Nhập pass'
                                            onChange={(e) => setPassword(e.target.value)}
                                            spellCheck="false" 
                                            autoComplete='off' 
                                            aria-autocomplete='list'
                                            
                                        />
                                        <button onClick={handleToggleClick} className={Styles.button_hide_pass} >
                                            {showPassword ? <img src="../../images/hide-pass.jpg" width="40px" alt="hidepass" /> : <img src="../../images/show-pass.jpg" width="40px" alt="pass" />}
                                        </button>
                                    </div>
                                    <div>
                                        {password && <PasswordStrengthIndicator password={password} />}
                                    </div>
                                    <p className={Styles.des_hint}>
                                        Hint: The password should be at least twelve characters long. To make it stronger, use upper and lower case letters, numbers, and symbols like ! " ? $ % ^ & ).
                                    </p>
                                </div>
                                <div className={Styles.profile}>
                                    <h2 className={Styles.h2}>Profile Details</h2>
                                    <label htmlFor="signup_name">Name (required)</label>
                                    <input type="text" name='signup_name' id='signup_name' value={name} onChange={(e) => setName(e.target.value)} required  />
                                    <p className={Styles.field}>
                                        This field may be seen by:
                                        <span className={Styles.field_level}>Everyone</span>
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className={Styles.submit}>
                            <button type="submit" id={Styles.submit}>Complete Sign Up</button>
                        </div>
                    </form>
                </div>
            </main>
        </>
    )
    
}