import Head from 'next/head';
import Styles from '@/styles/checkout.module.css';
import Header from '../components/footerheader/header';
import Footer from '../components/footerheader/footer';
import Banner from '../components/footerheader/banner';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import axios from 'axios';


export default function PaymentSuccess () {
    const router = useRouter()
    useEffect(() => {
        const asPath:string = router.asPath
        const token = asPath.slice(asPath.search('token') + 6, asPath.search('&'))
        const payerId = asPath.slice(asPath.search('PayerID') + 8)
        
        axios.post(`http://localhost:3000/payment/capture?orderId=${token}&token=${localStorage.getItem('tokenPayment')}`, {}, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('accessToken')}`
            }
        }).then(result => {
            console.log('Success!')
        }).catch(err => console.log(err))
    }, [])
    return (
        <>
            
            <Header/>
            <Banner title='' />
            <div className={Styles.payment_container}>
                <div className={Styles.payment_title}>
                    <div className={Styles.user_info}>
                        <h1>Thanh toán thành công!</h1>
                        <p>Cảm ơn bạn đã mua khóa học.</p>
                        <img width={270} height={200} src="../images/successverify.png" alt="" />
                        <br />
                        <a href='http://localhost:8080' >Home</a>
                    </div>
                </div>
            </div>
            <Footer/>
        </>
      );
};