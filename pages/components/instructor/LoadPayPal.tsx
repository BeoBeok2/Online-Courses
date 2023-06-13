import Styles from '@/styles/LoadPayPal.module.css';

export default function LoadPayPal () {
    return(
        <>
            <div className={Styles.load_paypal}>
                <div className={Styles.load_paypal_form}>
                    <div className={Styles.load_paypal_form_title}>
                        Congratulations! Your PayPal account is now your Udemy active method of payment.
                    </div>
                </div>
                <div>
                    <a href="#" target="_self" title="" className={Styles.load_paypal_button}>
                        Return to OnlineCourses
                    </a>
                </div>
            </div>
        </>
    )
}