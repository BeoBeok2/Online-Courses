import Styles from '@/styles/footer.module.css';
import { ST } from 'next/dist/shared/lib/utils';


export default function Footer () {

    
    return (
        <>
                    <meta charSet="UTF-8" />
                    <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
                    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                    <link
                        href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css"
                        rel="stylesheet"
                        integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3"
                        crossOrigin="anonymous"
                    />
                    <link
                        rel="stylesheet"
                        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.3.0/css/all.min.css"
                    />
            
            <div className={Styles.footer_header}>
            <div className={Styles.spaceline}> <br /></div>
                <div className={Styles.first_foot}>
                    <div className={Styles.container}>
                        <div className={Styles.title_left}>
                            <p>Get hands on the <span className={Styles.Special}>Great Course</span>s you like</p>
                        </div>
                        <div className={Styles.title_right}>
                            <div className={Styles.content_left}>Follow us on</div>
                            <div className={Styles.content_right}>
                                <ul className={Styles.social_medial}>
                                    <li><i id={Styles.fa_brands} className= "fa-brands fa-facebook-f"></i></li>
                                    <li><i id={Styles.fa_brands} className= "fa-brands fa-twitter"></i></li>
                                    <li><i id={Styles.fa_brands} className= "fa-brands fa-google"></i></li>
                                    <li><i id={Styles.fa_brands} className= "fa-brands fa-vimeo-v"></i></li>
                                    <li><i id={Styles.fa_brands} className= "fa-brands fa-instagram"></i></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={Styles.space}> <br /></div>
                <footer className="text-center text-lg-start bg-white text-muted">
                    <section className="all-help">
                        <div id="text-center text-md-start mt-5" className={Styles.container}>
                            <div className="row mt-3">
                                <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mb-4">
                                    <h6 className="fw-bold mb-4" id={Styles.text_uppercase}>
                                    Links
                                    </h6>
                                    <p className={Styles.links}>
                                        <a href="#!" className={Styles.tex_reset}>Courses</a>
                                    </p>
                                    <p className={Styles.links}>
                                        <a href="#!" className={Styles.tex_reset}>Tutors</a>
                                    </p>
                                    <p className={Styles.links}>
                                        <a href="#!" className={Styles.tex_reset}>Quiz & Tests</a>
                                    </p>
                                
                                </div>
                                <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mb-4">
                                    <h6 className="fw-bold mb-4" id={Styles.text_uppercase}>
                                    Company
                                    </h6>
                                    <p className={Styles.links}>
                                        <a href="#!" className={Styles.tex_reset}>About</a>
                                    </p>
                                    <p className={Styles.links}>
                                        <a href="#!" className={Styles.tex_reset}>Talk To Us</a>
                                    </p>
                                    <p className={Styles.links}>
                                        <a href="#!" className={Styles.tex_reset}>Help</a>
                                    </p>
                                </div>

                                <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4">
                                    <h6 className="fw-bold mb-4" id={Styles.text_uppercase}>Contact us
                                    </h6>
                                    <p><i className="fas fa-home me-3 text-secondary"></i><strong>Address:</strong> Thủ Đức Campus HuTech</p>
                                    <p><i className="fas fa-envelope me-3 text-secondary"></i><strong>Email:</strong>elearny@example.com</p>
                                    <p><i className="fas fa-phone me-3 text-secondary"></i> <strong>Phone:</strong> +3233-332-334</p>
                                
                                </div>
                            </div>
                        </div>
                    </section>
                    <div className={Styles.space}> <br /></div>
                </footer>
            </div>
        </>
      );
};
