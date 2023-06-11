import React from 'react';
import Styles from '@/styles/CounterSection.module.css';

const CounterSection = () => {
  return (
   <>
    <div className={Styles.counterSection}>
      <div className={`${Styles.column} ${Styles.fadeInLeft}`} data-delay="500">
        <div className={Styles.counter}>
          <div className={Styles.counterIconHolder}>
            <img
              src="https://elearni.wpenginepowered.com/wp-content/uploads/2018/12/desktop.png"
              alt=""
              width={110}
              height={110}
              decoding="async"
              loading="lazy"
            />
          </div>
          <div className={Styles.counterNumber} data-value="1600" data-append="+ Topics">
            1600
          </div>
          <h4 className={Styles.counterTitle}>Learn Anything</h4>
        </div>
      </div>

      <div className={`${Styles.column} ${Styles.fadeInUp}`} data-delay="600">
        <div className={Styles.counter}>
          <div className={Styles.counterIconHolder}>
            <img
              src="https://elearni.wpenginepowered.com/wp-content/uploads/2018/12/student-genius.png"
              alt=""
              width={110}
              height={110}
              decoding="async"
              loading="lazy"
            />
          </div>
          <div className={Styles.counterNumber} data-value="1900" data-append="+ Students">
            1900
          </div>
          <h4 className={Styles.counterTitle}>Future Genius</h4>
        </div>
      </div>

      <div className={`${Styles.column} ${Styles.fadeInDown}`} data-delay="700">
        <div className={Styles.counter}>
          <div className={Styles.counterIconHolder}>
            <img
              src="https://elearni.wpenginepowered.com/wp-content/uploads/2018/12/tests-taken.png"
              alt=""
              width={110}
              height={110}
              decoding="async"
              loading="lazy"
            />
          </div>
          <div className={Styles.counterNumber} data-value="15900" data-append="Tests Taken">
            15900
          </div>
          <h4 className={Styles.counterTitle}>Thats a lot</h4>
        </div>
      </div>

      <div className={`${Styles.column} ${Styles.fadeInRight}`} data-delay="800">
        <div className={Styles.counter}>
          <div className={Styles.counterIconHolder}>
            <img
              src="https://elearni.wpenginepowered.com/wp-content/uploads/2018/12/apple.png"
              alt=""
              width={110}
              height={110}
              decoding="async"
              loading="lazy"
            />
          </div>
          <div className={Styles.counterNumber} data-value="250" data-append="+ Instructors">
            250
          </div>
          <h4 className={Styles.counterTitle}>All trained professionals</h4>
        </div>
      </div>
    </div>
    </> 
  );
};

export default CounterSection;
