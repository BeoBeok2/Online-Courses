import Styles from '@/styles/login.module.css';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';


export default function Login (){
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);
    const router = useRouter();
    useEffect(() => {
        const rememberMe = localStorage.getItem('rememberMe');
        if (rememberMe === 'true') {
            setRememberMe(true);
        }
      }, []);
      const handleSubmit = async (event: { preventDefault: () => void; }) => {
        event.preventDefault();
        
        // TODO: Gọi API đăng nhập ở đây
        // TODO: Xử lý lỗi nếu có
    
        if (rememberMe) {
          localStorage.setItem('rememberMe', 'true');
        } else {
          localStorage.removeItem('rememberMe');
        }
        console.log(`UserName: ${username}`);
        console.log(`Password: ${password}`);
        router.push('http://localhost:3000/components/register/register');
      };
    return(
        <>
            <div className={Styles.page_login}>
                <div className={Styles.dtlms_login_container}>
                    <div className={Styles.dtlms_login_form}>
                        <div className={Styles.dtlms_login_form_holder}>
                            <div className={Styles.title_login}>
                                <h2>    
                                    <span>
                                        Welcome!<strong>Login</strong>
                                    </span>
                                </h2>
                            </div>
                            <form name='loginform' id='loginform' onSubmit={handleSubmit} method='post'>
                                <p className={Styles.login_username}>
                                    <label htmlFor="user_login">Username or Email Address</label>
                                    <input 
                                        type="text" 
                                        placeholder="Username or Email" 
                                        value={username} 
                                        onChange={(e) => setUsername(e.target.value)} 
                                        name='log' id='user_login' 
                                        autoComplete='username' 
                                        className='input' 
                                        value-size={20}/>
                                </p>
                                <p className={Styles.login_password}>
                                    <label htmlFor="user_pass">Password</label>
                                    <input 
                                        type="password" 
                                        name='pwd' 
                                        id='user_pass' 
                                        placeholder="Password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        autoComplete='password' 
                                        className='input' 
                                        value-size={20}/>
                                </p>
                                <p className={Styles.login_remember}>
                                    <label htmlFor="rememberMe">
                                        <input 
                                            name='rememberMe' 
                                            type="checkbox" 
                                            id='rememberMe' 
                                            checked={rememberMe} 
                                            onChange={(e) => setRememberMe(e.target.checked)}/>  Remember Me
                                    </label>
                                </p>
                                <p className={Styles.login_submit}>
                                    <button type="submit" id={Styles.login_submit}>Log In</button>
                                </p>
                            </form>
                            <div className={Styles.forgot_pass}>
                                <a href="http://localhost:3000/components/forgotpassword/forgotpassword">Forgot Password ?</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}