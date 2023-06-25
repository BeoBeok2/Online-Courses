import Styles from '@/styles/footer.module.css';
import { useEffect, useState } from 'react';
import { FaCog } from 'react-icons/fa';
import { FaFontAwesome } from 'react-icons/fa';
import Login from '../../login';

export default function Header() {
    const [userAvatar, setUserAvatar] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [loggedIn, setLoggedIn] = useState(false);
    const [isHovered, setIsHovered] = useState(false);

    const handleLogin = (email: string) => {
        // Xử lý logic đăng nhập
    };

    const handleOpenModal = () => {
        setShowModal(true);
    };

    const handleLogout = () => {
        // Xóa accessToken và user khỏi localStorage
        localStorage.removeItem('accessToken');
        localStorage.removeItem('accessToken');
        localStorage.removeItem('user');
      
        // Đặt trạng thái đăng nhập thành false
        setLoggedIn(false);
      
        // Thực hiện các bước khác sau khi đăng xuất (ví dụ: điều hướng tới trang chủ, hiển thị thông báo, vv.)
    };

    const closeModal = () => {
        setShowModal(false);
    };

    const handleAvatarHover = () => {
        setIsHovered(true);
    };

    const handleAvatarLeave = () => {
        setIsHovered(false);
    };

    useEffect(() => {
        const user = localStorage.getItem('user');
        if (user) {
            const userData = JSON.parse(user);
            setUserAvatar(userData.avatar.url);
            setLoggedIn(true);
        }
    }, []);

    return (
        <>
            {/* Các thẻ meta, link và script */}
            <header >
                <div className={Styles.container} id={Styles.container_header} >
                  
                    <div className={Styles.under_nav}>
                        <img className={Styles.logo} width={150} height={45} src="../../../images/logo1.png" alt="" />
                        <ul className={Styles.list_nav}>
                            <li>
                                <a href="http://localhost:8080">Home</a>
                            
                            </li>
                          
                          
                            <li>
                                <a href="http://localhost:8080/listcourses">Courses</a>
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
                        <div className={Styles.account}>
                            <div className={Styles.login}>
                                {loggedIn ? (
                                    <div className={Styles.avatar_container}>
                                        <img src={userAvatar} alt="Avatar" className={Styles.avatar} />
                                        <div className={Styles.menu}>
                                            <a href="http://localhost:8080/user/profile">Thông tin cá nhân</a>
                                            <a href="http://localhost:8080/instructor">Instructor</a>
                                            <a href="http://localhost:8080/cart">Cart</a>
                                            <a href="" onClick={handleLogout}>Logout</a>
                                        </div>
                                    </div>
                                ) : (
                                    <div>
                                        <a
                                            className="fa fa-unlock-alt"
                                            // href="http://localhost:8080/courses/login"
                                            onClick={handleOpenModal}
                                        >
                                            Login
                                        </a>
                                        <a
                                            className="fa fa-user-plus"
                                            href="http://localhost:8080/register"
                                        >
                                            Register
                                        </a>
                                    </div>
                                )}
                            </div>
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
