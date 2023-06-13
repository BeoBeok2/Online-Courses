import React, { useState } from 'react';
import Styles from '@/styles/TabsPage.module.css';

const TabsPage = () => {
    const [activeTab, setActiveTab] = useState('tab1');

    const handleTabChange = (tab: any) => {
        setActiveTab(tab);
    };

    return (
        <div className={Styles.container}>
            <h1 className={Styles.componentTitle}>Know why we are best</h1>
            <h3 className={Styles.componentTitle}>LEARNING VIA APP NEVER GETS EASIER</h3>
            <div className={Styles.tabs}>
                <div className={Styles.tab}>
                    <button
                        className={`${Styles.tabButton} ${activeTab === 'tab1' ? Styles.active : ''}`}
                        onClick={() => handleTabChange('tab1')}
                    >
                        <span className={Styles.tabText}>Creating a Better<br />Future for you</span>
                        <div className={Styles.tabDot} />
                    </button>
                </div>
                <div className={Styles.tab}>
                    <button
                        className={`${Styles.tabButton} ${activeTab === 'tab2' ? Styles.active : ''}`}
                        onClick={() => handleTabChange('tab2')}
                    >
                        <span className={Styles.tabText}>Learn why aLearny is<br />Best</span>
                        <div className={Styles.tabDot} />
                    </button>
                </div>
                <div className={Styles.tab}>
                    <button
                        className={`${Styles.tabButton} ${activeTab === 'tab3' ? Styles.active : ''}`}
                        onClick={() => handleTabChange('tab3')}
                    >
                        <span className={Styles.tabText}>Our Simple & Effective<br />Process</span>
                        <div className={Styles.tabDot} />
                    </button>
                </div>
            </div>

            <div className={`${Styles.tabContent} ${Styles.center}`}>
                <div id={Styles.content1} className={`${Styles.tabPanel} ${activeTab === 'tab1' ? Styles.active : ''}`}>
                    <div className={Styles.text_Content}>
                        <h2>Why Choose eLearny?</h2>
                        <p>Sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt. Labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation.</p>
                        <ul>
                            <li> <img src="../images/light-green.png" width={30} height={30} alt="" />   Creative Study Pattern</li>
                            <li> <img src="../images/rocket.png" width={30} height={30} alt="" />   Quick Crash Courses</li>
                            <li> <img src="../images/measure.png" width={30} height={30} alt="" />   Provided with Experimental Examples</li>
                            <li> <img src="../images/merit.png" width={30} height={30} alt="" />   Certification Awarded</li>
                        </ul>
                        <a href="#" target="_self" title="" className={Styles.dtScButtonMedium}>
                            Enroll Now
                        </a>
                    </div>
                    <div className={Styles.img_Content}>
                        <img src="../images/girl-ipad.jpg" alt="Image 1" className={Styles.img_first}/>
                        <img src="../images/home-tab-4.jpg" alt="Image 2" className={Styles.img_second}/>
                    </div>
                </div>
                <div id={Styles.content2} className={`${Styles.tabPanel} ${activeTab === 'tab2' ? Styles.active : ''}`}>
                    <div className={Styles.text_Content}>
                        <h2>Why Choose eLearny?</h2>
                        <p>Sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt. Labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation.</p>
                        <ul>
                            <li> <img src="../images/light-green.png" width={30} height={30} alt="" />   Creative Study Pattern</li>
                            <li> <img src="../images/rocket.png" width={30} height={30} alt="" />   Quick Crash Courses</li>
                            <li> <img src="../images/measure.png" width={30} height={30} alt="" />   Provided with Experimental Examples</li>
                            <li> <img src="../images/merit.png" width={30} height={30} alt="" />   Certification Awarded</li>
                        </ul>
                        <a href="#" target="_self" title="" className={Styles.dtScButtonMedium}>
                            Enroll Now
                        </a>
                    </div>
                    <div className={Styles.img_Content}>
                        <img src="../images/home-tab-2.jpg" alt="Image 1" className={Styles.img_first}/>
                        <img src="../images/home-tab-3.jpg" alt="Image 2" className={Styles.img_second}/>
                    </div>
                </div>
                <div id={Styles.content3} className={`${Styles.tabPanel} ${activeTab === 'tab3' ? Styles.active : ''}`}>
                    <div className={Styles.text_Content}>
                        <h2>Why Choose eLearny?</h2>
                        <p>Sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt. Labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation.</p>
                        <ul>
                            <li> <img src="../images/light-green.png" width={30} height={30} alt="" />   Creative Study Pattern</li>
                            <li> <img src="../images/rocket.png" width={30} height={30} alt="" />   Quick Crash Courses</li>
                            <li> <img src="../images/measure.png" width={30} height={30} alt="" />   Provided with Experimental Examples</li>
                            <li> <img src="../images/merit.png" width={30} height={30} alt="" />   Certification Awarded</li>
                        </ul>
                        <a href="#" target="_self" title="" className={Styles.dtScButtonMedium}>
                            Enroll Now
                        </a>
                    </div>
                    <div className={Styles.img_Content}>
                        <img src="../images/man-laptop.jpg" alt="Image 1" className={Styles.img_first}/>
                        <img src="../images/student-writing.jpg" alt="Image 2" className={Styles.img_second}/>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TabsPage;
