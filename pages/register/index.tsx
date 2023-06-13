import Styles from '@/styles/register.module.css';
import { data } from 'autoprefixer';
import PasswordInput from '../components/user/passwordinput';
import { SetStateAction, useState } from "react";
import PasswordStrengthIndicator from '../components/user/PasswordStrengthIndicator';
import axios from 'axios';
import Skeleton from 'react-loading-skeleton';
import { useRouter } from 'next/router';
import Footer from '../components/footerheader/footer';
import Header from '../components/footerheader/header';
import Banner from '../components/footerheader/banner';

export default function Register() {
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const [username, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstname, setFirstName] = useState('');
    const [lastname, setLastName] = useState('');
    const [phonenumber, setPhoneNumber] = useState('');
    const [address, setAddress] = useState('');

    // const handleInputChange = (event: { target: { value: SetStateAction<string>; }; }) => {
    //     setPassword(event.target.value);
    // };
    
    const handleSubmit = (event: { preventDefault: () => void; }) => {
        event.preventDefault();
        setIsLoading(true);
        axios({
            method: 'POST',
            url: 'http://localhost:3000/auth/register',
            data: {
                firstName: firstname,
                lastName: lastname,
                Email: email,
                Password: password,
                PhoneNumber: phonenumber,
                Address: address
              // Thêm các trường dữ liệu khác nếu cần thiết
            },
            headers: {
              'Content-Type': 'application/json'
            }
            }).then(response => {
                console.log('ok');
                console.log(response.data);
                setIsLoading(false);
                alert('Bạn cần vào email để xác minh verify!')
                
            }).catch(error => {
                console.log('error');
                console.log(error);
                setIsLoading(false);
                alert('Bạn cần vào email để xác minh verify!')
                /* router.push('http://localhost:3000/courses/register/successverify'); */
            });
        setEmail('');
        setPassword('');
        setUserName('');
        setFirstName('');
        setLastName('');
        setPhoneNumber('');
        setAddress('');

    };
    const handleToggleClick = () => {
        setShowPassword(!showPassword);
        
    };
    
    return(
        <>
            <Header/>
            <Banner title='Courses Account' />
            <main>
                <div className={Styles.main}>
                    <form className={Styles.container} onSubmit={handleSubmit}>
                        
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
                                        <button type='button' onClick={handleToggleClick} className={Styles.button_hide_pass} >
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
                                    <div className={Styles.signup_fullname}>
                                        <p className={Styles.signup_firstname}>
                                            <label htmlFor="signup_firstname">Fisrt Name (required)</label>
                                            <input type="text" name='signup_firstname' id='signup_firstname' value={firstname} onChange={(e) => setFirstName(e.target.value)} required  />
                                        </p>
                                        <p className={Styles.signup_lastname}>
                                            <label htmlFor="signup_lastname">Last Name (required)</label>
                                            <input type="text" name='signup_lastname' id='signup_lastname' value={lastname} onChange={(e) => setLastName(e.target.value)} required  />

                                        </p>
                                    </div>
                                    <p className={Styles.field}>
                                        This field may be seen by:
                                        <span className={Styles.field_level}>Everyone</span>
                                    </p>
                                    <label htmlFor="signup_phonenumber">Phone Number (required)</label>
                                    <input type="number" name='signup_phonenumber' id='signup_phonenumber' value={phonenumber} onChange={(e) => setPhoneNumber(e.target.value)} required  />
                                    <div className={Styles.signup_address}>
                                        <label htmlFor="signup_address" >Address (required)</label>
                                        <input type="address" name='signup_address' id='signup_address' value={address} onChange={(e) => setAddress(e.target.value)} required  />
                                    </div>
                                    
                                </div>
                            </div>
                        </div>
                        <div className={Styles.submit}>
                            <button type="submit" id={Styles.submit} disabled={isLoading}>
                                {isLoading ? <Skeleton width={80} height={25} /> : 'Complete Sign Up'}   
                            </button>
                        </div>
                    </form>
                </div>
            </main>
            <Footer/>
        </>
    )
    
}