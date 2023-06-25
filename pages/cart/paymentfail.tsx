import Head from 'next/head';
import Styles from '@/styles/checkout.module.css';
import Header from '../components/footerheader/header';
import Footer from '../components/footerheader/footer';
import Banner from '../components/footerheader/banner';


export default function PaymentFail () {
    return (
        <>
            
            <Header/>
            <Banner title='' />
            <div className={Styles.payment_container}>
                <div className={Styles.payment_title}>
                    <div className={Styles.user_info}>
                        <h1>Thanh toán thất bại!</h1>
                        <p>Rất xin lỗi bạn nhưng hình như có vấn đề trong việc thanh toán. Bạn vui lòng thanh toán lại.</p>
                        <img width={270} height={240} src="../images/failverify.png" alt="" />
                        <br />
                        <a href='http://localhost:8080/cart' >Cart</a>
                    </div>
                </div>
            </div>
            <Footer/>
        </>
      );
};