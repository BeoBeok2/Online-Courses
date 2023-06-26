import React, { useState } from 'react';
import Styles from '@/styles/payment.module.css';

import SideNav from '@/pages/components/instructor/sidenav';
import PayPalButton from '@/pages/components/instructor/PayPalButton';
export default function Payment() {
 


    return (
        <>
            <SideNav />
            <div className={Styles.container}>
            <div className={Styles.heading}>
                    <h1>Payment</h1>
                    <p>Vui lòng đăng nhập tài khoản PayPal</p>
                    <PayPalButton/>
                </div>
            </div>
        </>
    );
}
