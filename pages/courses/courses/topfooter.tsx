import Styles from '@/styles/coursesdetail.module.css';
import { title } from 'process';


export default function TopFooter () {
    return(
        <>
        <div className={Styles.main}>
            <div className={Styles.top_footer}>
                <div className={Styles.container}>
                    <div className={Styles.top_footer}>
                    <h1 className={Styles.title}>Start a Journey. Enroll Now</h1>
                    <span className={Styles.des}>LEARN SOMETHING WHEREVER YOU ARE </span>
                    </div>
                    <div className={Styles.btn_join}>Join a Course Now</div>
                </div>
            </div>
        </div>

        </>

    );
}