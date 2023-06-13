import Styles from '@/styles/coursesdetail.module.css';


export default function Review () {
    return(
        <>
        <div className={Styles.main}>
            <div className={Styles.reviewer}>
                <div className={Styles.container}>
                    <div className={Styles.cover_top}>
                    <div className={Styles.top_content}>
                        <h1 className={Styles.title}>eLearny’s Testimonials</h1>
                        <p className={Styles.des}>WHAT STUDENTS THINK OF US</p>
                    </div>
                    </div>
                    <div className={Styles.bot_content}>
                        {/* <!-- rv-1 --> */}
                        <div className={Styles.review_item}>
                            <div className={Styles.rv_avatar}>
                                <img src="./assets/img/re-avt1.jpg" alt="avatar" />
                            </div>
                            <div className={Styles.name}>Lauren Ralph</div>
                            <p className={Styles.des}>Music Student</p>
                            <p className={Styles.quote}>
                            "Sed do eiusmod tempor incididunt. Labore et dolore magna aliqua.
                            Ut enim ad minim veniam."
                            </p>
                        </div>
                        {/* <!-- rv-2 --> */}
                        <div className={Styles.review_item} id={Styles.rv_item2}>
                            <div className={Styles.rv_avatar}>
                                <img src="./assets/img/rv-avt2.jpg" alt="avatar" />
                            </div>
                            <div className={Styles.name}>Stan Lee</div>
                            <p className={Styles.des}>eLearny Student</p>
                            <p className={Styles.quote}>
                            "Sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                            incididunt. Labore et dolore magna aliqua."
                            </p>
                        </div>
                        {/* <!-- rv-3 --> */}
                        <div className={Styles.review_item}>
                            <div className={Styles.rv_avatar}>
                            <img src="./assets/img/re-avt1.jpg" alt="avatar" />
                            </div>
                            <div className={Styles.name}>Lauren Ralph</div>
                            <p className={Styles.des}>Music Student</p>
                            <p className={Styles.quote}>
                            "Sed do eiusmod tempor incididunt. Labore et dolore magna aliqua.
                            Ut enim ad minim veniam."
                            </p>
                        </div>
                    </div>
                    <div className={Styles.dots}>
                    <span className={Styles.dot_active}></span>
                    <span className={Styles.dot}></span>
                    <span className={Styles.dot}></span>
                    <span className={Styles.dot}></span>
                    </div>
                </div>
            </div>
            <hr />
        </div>
        </>
    );
}