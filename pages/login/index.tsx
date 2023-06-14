import Styles from '@/styles/login.module.css';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import { withIronSession } from "next-iron-session";
import host from '../api/host';

export default function Login() {
  interface User {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    address: string;
    avatar: string;
    lastLogin: string;
  }

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const router = useRouter();

  const handleSubmit = (event: { preventDefault: () => void }) => {
    event.preventDefault();
  
    axios({
      method: 'POST',
      url: `${host}/auth/login`,
      data: { Email: username, Password: password },
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => {
        const accessToken = res.data.accessToken;
        const user = res.data.information as User[];
  
        sessionStorage.setItem('accessToken', accessToken);
        sessionStorage.setItem('user', JSON.stringify(user));
  
        router.push('http://localhost:8080').then(() => {
          window.location.reload();
        });
      })
      .catch((err) => {
        console.log('error');
        alert(err.response.data.message);
      });
  };
  

  useEffect(() => {
    const rememberMe = localStorage.getItem('rememberMe');
    if (rememberMe === 'true') {
      setRememberMe(true);
    }
  }, []);

  return (
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
                    required />
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
                    required />
                </p>
                <p className={Styles.login_remember}>
                  <label htmlFor="rememberMe">
                    <input
                      name='rememberMe'
                      type="checkbox"
                      id='rememberMe'
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)} />  Remember Me
                  </label>
                </p>
                <p className={Styles.login_submit}>
                  <button type="submit" id={Styles.login_submit}>Log In</button>
                </p>
              </form>
              <div className={Styles.forgot_pass}>
                <a href="http://localhost:8080/forgotpassword">Forgot Password ?</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
