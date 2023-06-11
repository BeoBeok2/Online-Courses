import React, { useEffect } from 'react';
declare global {
    interface Window {
      paypal: any;
    }
  }
const PayPalButton = () => {
  useEffect(() => {
    // Script PayPal
    const script = document.createElement('script');
    script.src = 'https://www.paypalobjects.com/js/external/api.js';
    script.async = true;
    script.onload = () => {
      window.paypal.use(['login'], function (login: any) {
        login.render({
          appid: 'AXfFfYQsM_Wdyomi9To5Cozx5aSxfuyl6XwVJ__YvtQqzLufcYnQH5Jr_pksY45M5qsgAI-8cpYgzTyd',
          authend: 'sandbox',
          scopes: 'https://uri.paypal.com/services/paypalattributes email',
          containerid: 'lippButton',
          responseType: 'code',
          locale: 'vi-vn',
          buttonType: 'LWP',
          buttonShape: 'pill',
          buttonSize: 'lg',
          fullPage: 'true',
          returnurl: 'https://iknowledge.vercel.app/courses'
        });
      });
    };

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return <span id="lippButton"></span>;
};

export default PayPalButton;
