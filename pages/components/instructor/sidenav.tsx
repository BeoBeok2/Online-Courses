import React, { useState } from 'react';
import { FaCog, FaUser } from 'react-icons/fa';
import Styles from '@/styles/sidenav.module.css';

const SideNav = () => {
  const [isSideNavOpen, setSideNavOpen] = useState(false);

  const handleMouseEnter = () => {
    setSideNavOpen(true);
  };

  const handleMouseLeave = () => {
    setSideNavOpen(false);
  };

  return (
    <div
      className={`${Styles.sidenav} ${isSideNavOpen ? Styles.open : ''}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <button className={Styles.toggleButton}>
        <img className={Styles.logo} width={127} height={30} src="https://elearni.wpenginepowered.com/wp-content/uploads/2018/12/logo.png" alt="" />
      </button>
      <ul className={Styles.navList}>
        <li className={Styles.navItem}>
            <a href="http://localhost:8080/intructor">Profile</a>
        </li>
        <li className={Styles.navItem}>
        <a href="http://localhost:8080/instructor/courses">Khóa học</a>
        </li>
        <li className={Styles.navItem}>
        <a href="http://localhost:8080/instructor/payment">Thanh Toán</a>
        </li>
      </ul>
      
    </div>
  );
};

export default SideNav;
