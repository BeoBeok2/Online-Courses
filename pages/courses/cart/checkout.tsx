import Head from 'next/head';
import Styles from '@/styles/checkout.module.css';
import Header from '../footer/header';
import Footer from '../footer/footer';
import Banner from '../banner';
import axios from 'axios';
import { useEffect, useState } from 'react';
import PayPalButton from './PayPalButton';


export default function Checkout () {
    const [loggedIn, setLoggedIn] = useState(false);
    const [userName, setUserName] = useState('');
    const [paymentDetails, setPaymentDetails] = useState('');

    useEffect(() => {
        // Gọi API kiểm tra trạng thái đăng nhập khi component được tải
        checkLoginStatus();
        fetchPaymentDetails();
    }, []);

    const checkLoginStatus = async () => {
        try {
        // Gọi API kiểm tra trạng thái đăng nhập
        const response = await axios.get('/api/check-login');
        if (response.data.loggedIn) {
            setLoggedIn(true);
            setUserName(response.data.userName);
        }
        } catch (error) {
        console.log(error);
        }
    };
    const fetchPaymentDetails = async () => {
        try {
          const response = await axios.get('/api/payment-details');
          setPaymentDetails(response.data.paymentDetails);
        } catch (error) {
          console.log(error);
        }
      };
    const handlePayButtonClick = async () => {
        try {
        // Gọi API hoàn tất thanh toán
        const response = await axios.post('/api/complete-payment');
        // Xử lý các dữ liệu cần thiết từ response.data

        // Hiển thị thông báo thành công hoặc chuyển hướng
        } catch (error) {
        console.log(error);
        }
    };
    return (
        <>
            
            <Head>
                <meta charSet="UTF-8"/>
                <meta http-equiv="X-UA-Compatible" content="IE=edge"/>
                <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
                
            </Head>
            <Header/>
            <Banner title='Checkout' />
            <div className={Styles.payment_container}>
                <h1 className={Styles.payment_title}>Thanh toán</h1>
                <div className={Styles.payment_content}>
                    <div className={Styles.payment_method}>
                            <h2 className={Styles.method_title}>Phương thức thanh toán</h2>
                            {/* Hiển thị phương thức thanh toán (ví dụ: PayPal) */}
                            <div className={Styles.paypal_container}>
                                <input type="radio" className={Styles.paypal_button} checked />
                                <img
                                    src="../../images/PayPal-Logo.png"
                                    alt="PayPal Logo"
                                    className={Styles.paypal_logo}
                                />
                               
                            </div>
                    </div>
                    <div className={Styles.user_info}>
                        {loggedIn && (
                            <div className={Styles.user_greeting}>
                            <span className={Styles.greeting_text}>Xin chào, {userName}!</span>
                            </div>
                        )}
                        {!loggedIn && (
                            //button đăng nhập paypal ở đây
                            <PayPalButton/>
                        )}
                    </div>
                </div>
                
                <div className={Styles.payment_content}>
                    <div className={Styles.payment_details}>
                    <div className={Styles.payment_summary}>
                        <h2 className={Styles.summary_title}>Tóm tắt thanh toán</h2>
                        {/* Hiển thị chi tiết thanh toán */}
                        <div  className={Styles.summary_details}>
                            <div className={Styles.price_section}>
                                <span className={Styles.price_label}>Giá gốc:</span>
                                <span className={Styles.original_price}>$10</span>
                            </div>
                            <hr className={Styles.price_divider} />
                            <div className={Styles.price_section}>
                                <span className={Styles.price_label}>Giá sau khi giảm:</span>
                                <span className={Styles.discounted_price}>$10</span>
                            </div>
                        </div>
                        <div className={Styles.summary_details}>{paymentDetails}</div>
                    </div>

                    

                    <button
                        className={`pay_button ${loggedIn ? 'visible' : 'hidden'}`}
                        onClick={handlePayButtonClick}
                        id={Styles.pay_button}
                    >
                        Xác nhận thanh toán
                    </button>
                    </div>
                </div>
            </div>
            <Footer/>
        </>
      );
};
