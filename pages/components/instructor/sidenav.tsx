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
      <a href="http://localhost:8080/">

      <button className={Styles.toggleButton}>

        <img
          className={`${Styles.logo} ${isSideNavOpen ? Styles.logoHover : ''}`}
          src={isSideNavOpen ? "../../../images/logo1.png" : "../../../favicon.ico"}
          alt=""
        />
      </button>
      </a>

      <ul className={Styles.navList}>
        <li className={Styles.navItem}>
          <a href="http://localhost:8080/instructor">Profile</a>
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
