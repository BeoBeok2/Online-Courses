import Styles from '@/styles/forgotpass.module.css';
import axios from 'axios';
import router, { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import Header from '../footer/header';
import Footer from '../footer/footer';
import Banner from '../banner';
import Login from '../login';

export default function ResultForgotPassword () {
    const [isVeify, setVerify] = useState(false)
    const [isToken, setToken] = useState(null)
    const router = useRouter()
    const { token = "" } = router.query;
    const [showModal, setShowModal] = useState(false);
    
    const handleOpenModal = () => {
        setShowModal(true);
    };
    const closeModal = () => {
        setShowModal(false);
      };
    function callapi(){
        if(token != '')
            axios({

                method: 'PATCH',
                url: `http://localhost:3000/auth/account/${token}`,
                
                headers: {
                'Content-Type': 'application/json'
                }
                }).then(response => {
                    console.log('ok');
                    console.log(response.data);
                    setVerify(true);
                    
                }).catch(error => {
                    console.log('error');
                    console.log(error);
                    
                    /* router.push('http://localhost:3000/courses/register/successverify'); */
                });
    }
    
    useEffect(() => {
        callapi();
        
    },[token])  

    return(
        
        <>
            <Header/>
            <Banner title=''/>
            <div className={Styles.password_reset}>
                <div className={Styles.user_form}>
                    <div className={Styles.user_form_title}>
                        Bạn đã đăng ký thàng công tài khoản!
                    </div>
                    <div className={Styles.user_form_info}>
                        <img width={270} height={200} src="../../images/successverify.png" alt="" />
                    </div>
                    <div className={Styles.user_form_info}>
                        Vui lòng 
                        <a className='link_login'  onClick={handleOpenModal}> Sign in </a>
                         để đăng nhập.
                    </div>
                    
                </div>
            </div>
            
            <Footer/>
            {showModal && (
                <div className={Styles.modalOverlay}>
                    <div className={Styles.modalContent}>
                        {/* Nội dung của trang login sẽ được đặt ở đây */}
                        {/* Ví dụ: */}
                        <Login />
                        <div className={Styles.closeButton} onClick={closeModal}>
                          <img src="../../../images/close.png" alt="close" width={30} height={30} />
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}