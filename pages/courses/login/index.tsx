import Styles from '@/styles/login.module.css';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
// import login_api from "../../api/login";
import { ok } from 'assert';
import { withIronSession } from "next-iron-session";
import { resolve } from 'path';



export default function Login (){
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);
    const router = useRouter();
    /* const [accessToken, setAccessToken] = useState(''); */


    
    useEffect(() => {
        const rememberMe = localStorage.getItem('rememberMe');
        if (rememberMe === 'true') {
            setRememberMe(true);
        }
      }, []);
      const handleSubmit =  (event: { preventDefault: () => void; }) => {
        axios({
            method: 'POST',
            url: 'http://localhost:3000/auth/login',
            data: {Email: username, Password: password},
            headers: {
                'Content-Type': 'application/json'
            }
           }).then(res => {
            
            console.log('ok');
            console.log(res);
            /* setAccessToken(res.data.accessToken); */
            const accessToken = res.data.accessToken;

            sessionStorage.setItem('accessToken',accessToken);
            console.log(accessToken);
            router.push('http://localhost:8080/courses/courses/courses');  
            
           }).catch(err => {
            console.log('error')
            alert(err.response.data.message);
            
           })

           event.preventDefault();
      }
      /*const handleSubmit = async (event: { preventDefault: () => void; }) => {
        event.preventDefault();
        try {
            const res = await axios.post("../../api/login", {
              username,
              password,
            });
            console.log(res.data);
          } catch (error) {
            console.log(error);
          }
    
        if (rememberMe) {
          localStorage.setItem('rememberMe', 'true');
        } else {
          localStorage.removeItem('rememberMe');
        }
        //router.push('http://localhost:3000/components/register/register');
      };*/
      
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
                                        value-size={20}
                                        required/>
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
                                        value-size={20}
                                        required/>
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
                                <a href="http://localhost:8080/courses/forgotpassword">Forgot Password ?</a>
                            </div>
                        </div>
                    </div>  
                </div>
            </div>
        </>
    );
}