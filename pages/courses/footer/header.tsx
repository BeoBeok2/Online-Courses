import Styles from '@/styles/footer.module.css';
import { ST } from 'next/dist/shared/lib/utils';
import { useState } from 'react';
import { FaCog } from 'react-icons/fa';
import { FaFontAwesome } from 'react-icons/fa';
import Login from '../login';

export default function Header() {
    const [userEmail, setUserEmail] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [loggedIn, setLoggedIn] = useState(false);
    const [showSettingsMenu, setShowSettingsMenu] = useState(false);

    const toggleSettingsMenu = () => {
        setShowSettingsMenu(!showSettingsMenu);
    };

    const handleLogin = (email: string) => {
        setUserEmail(email);
        setLoggedIn(true);
    };
    const handleOpenModal = () => {
        setShowModal(true);
    };

    const handleLogout = () => {
        setUserEmail('');
        setLoggedIn(false);
    };
    const closeModal = () => {
        setShowModal(false);
      };
      
    return (
        <>

            <meta charSet="UTF-8" />
            <meta http-equiv="X-UA-Compatible" content="IE=edge" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />


            <link
                href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css"
                rel="stylesheet"
                integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3"
                crossOrigin="anonymous"
            />
            <script
                src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js"
                integrity="sha384-ka7Sk0Gln4gmtz2MlQnikT1wXgYsOg+OMhuP+IlRH9sENBO0LRn5q+8nbTov4+1p"
                crossOrigin="anonymous"
            ></script>

            <link
                rel="stylesheet"
                href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.3.0/css/all.min.css"
            />

            <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin='' />
            <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500&family=Lato:wght@700&family=Montserrat:ital,wght@0,500;1,300&family=Poppins:wght@400;600;700&family=Roboto:wght@100;300;400;500;700;900&family=Sen:wght@700&display=swap" rel="stylesheet"></link>


            <header>
                <div className={Styles.container} id={Styles.container_header} >
                    <div className={Styles.above_nav}>
                        <ul className={Styles.social_medial}>
                            <li><i className="fa-solid fa-g"></i></li>
                            <li><i id={Styles.fa_brands} className="fa-brands fa-facebook-f"></i></li>
                            <li><i id={Styles.fa_brands} className="fa-brands fa-twitter"></i></li>
                            <li><i id={Styles.fa_brands} className="fa-brands fa-youtube"></i></li>
                        </ul>
                        <div className={Styles.account}>
                            <div className={Styles.login}>
                                <a className="fa fa-cart" href="http://localhost:8080/courses/cart"><i className="fa fa-shopping-cart" /></a>
                            </div>
                            {loggedIn ? (
                                <div className={Styles.login}>
                                    <span>{userEmail}</span>
                                    <a className="fa fa-cog" href="#" onClick={toggleSettingsMenu}>
                                        <FaCog />
                                    </a>
                                    {showSettingsMenu && (
                                        <ul className={Styles.settingsMenu}>
                                            <li><a href="http://localhost:8080/courses/profile/settingprofile">Thông tin cá nhân</a></li>
                                            <li><a href="http://localhost:8080/courses/profile">Instructor</a></li>
                                            <li>
                                                <a
                                                    className="fa fa-user-times"
                                                    href="/logout"
                                                    onClick={handleLogout}
                                                >
                                                    Logout
                                                </a>
                                            </li>
                                        </ul>
                                    )}

                                </div>
                            ) : (
                                <div className={Styles.login}>
                                    <a
                                        className="fa fa-unlock-alt"
                                        // href="http://localhost:8080/courses/login"
                                        onClick={handleOpenModal}
                                    >
                                        Login
                                    </a>
                                    <a
                                        className="fa fa-user-plus"
                                        href="http://localhost:8080/courses/register"
                                    >
                                        Register
                                    </a>
                                </div>
                            )}
                        </div>
                    </div>
                    <div className={Styles.under_nav}>
                        <img className={Styles.logo} width={150} height={45} src="../../../images/logo1.png" alt="" />
                        <ul className={Styles.list_nav}>
                            <li>
                                <a href="http://localhost:8080">Home</a>
                                {/* <ul className={Styles.sub_menu}>
                                    <li>
                                        <a href="#!">Home II</a>
                                    </li>
                                    <li>
                                        <a href="#!">Blog</a>
                                    </li>
                                    <li>
                                        <a id={Styles.Portfolio} href="#!">Portfolio</a>
                                        <ul className={Styles.sub_menu}>
                                            <li>
                                                <a href="#!">Set I</a>
                                            </li>
                                            <li>
                                                <a href="#!">Set II</a>
                                            </li>
                                            <li>
                                                <a href="#!">Set III</a>
                                            </li>
                                            <li>
                                                <a id={Styles.Portfolio} href="#!">Set IV</a>
                                            </li>
                                        </ul>
                                    </li>
                                </ul> */}
                            </li>
                            <li>
                                <a href="#!">About</a>
                                <ul className={Styles.sub_menu}>
                                    <li>
                                        <a id={Styles.Portfolio} href="#!">Shop</a>
                                        <ul className="sub-menu">
                                            <li>
                                                <a href="http://localhost:8080/courses/courses/listcourses">Shop Courses</a>
                                            </li>
                                            <li>
                                                <a id={Styles.Portfolio} href="#">Contact</a>
                                            </li>
                                        </ul>
                                    </li>
                                </ul>
                            </li>
                            {/* <li>
                                <a href="#!">Services</a>
                            </li>
                            <li>
                                <a href="#!">Students</a>
                            </li>
                            <li>
                                <a href="#!">Why Us</a>
                            </li> */}
                            <li>
                                <a href="http://localhost:8080/courses/courses/listcourses">Courses</a>
                            </li>
                            <li>
                                <a href="#">Contact</a>
                            </li>
                        </ul>
                        <div className="Search_box">
                            <nav className="navbar bg-body-tertiary">
                                <div className="container-fluid">
                                    <form className="d-flex" role="search">
                                        <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                                        <button className="btn btn-outline-success" type="submit">Search</button>
                                    </form>
                                </div>
                            </nav>
                        </div>
                    </div>

                </div>
            </header>
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
    );
};
