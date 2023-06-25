import Head from 'next/head';
import Styles from '@/styles/checkout.module.css';
import Header from '../components/footerheader/header';
import Footer from '../components/footerheader/footer';
import Banner from '../components/footerheader/banner';


export default function PaymentSuccess () {
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