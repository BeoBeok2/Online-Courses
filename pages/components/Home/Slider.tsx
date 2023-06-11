import React, { useState, useEffect } from 'react';
import Styles from '@/styles/slider.module.css';

const Slider = () => {
  const [offsetX, setOffsetX] = useState(0);
  const [offsetY, setOffsetY] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [showSlider, setShowSlider] = useState(false);
  

  useEffect(() => {
    // Delay before showing the slider
    const timer = setTimeout(() => {
      setShowSlider(true);
    }, 1000);

    // Clean up the timer
    return () => clearTimeout(timer);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { clientX, clientY } = e;
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const offsetX = ((clientX - left) / width - 0.5) * 2;
    const offsetY = ((clientY - top) / height - 0.5) * 2;
    setOffsetX(offsetX);
    setOffsetY(offsetY);
  };

  const handleMouseLeave = () => {
    setOffsetX(0);
    setOffsetY(0);
  };

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className={`${Styles.slider_container} ${showSlider ? Styles.show : ''}`} onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}>
      <div className={`${Styles.text_container} ${showSlider ? Styles.fadeIn : ''}`}>
        {currentPage === 1 && (
          <React.Fragment>
            <div className={Styles.icon}>
              <img src="../images/mouse.png" alt="" />
            </div>
            <h1>Online Courses for all</h1>
            <h2>Online Lessons</h2>
            <h2>Live Courses</h2>
            <h2>Certified Lessons</h2>
            <div className={Styles.btn_listcourses}>
              <a href="http://localhost:8080/courses/courses/listcourses" className={Styles.listcourses_btn} role="button">
                <i className="fas fa-eye"></i> View Courses
              </a>
            </div>
          </React.Fragment>
        )}
      </div>

      <div>
        {currentPage === 1 && (
          <div
            className={Styles.image_container}
            style={{ transform: `translate(-50%, -50%) perspective(1000px) rotateX(${offsetY * 30}deg) rotateY(${offsetX * 30}deg)` }}
          >
            <img src="../images/phone-img.png" alt="iPhone" />
          </div>
        )}
        {currentPage === 2 && (
          <div className={Styles.image_background}>
            <img src="../images/bg1.jpg" alt="iPhone" />
          </div>
        )}

        {currentPage === 2 && (
          <div className={`${Styles.page2_background} ${showSlider ? Styles.fadeIn : ''}`}>
            <div className={`${Styles.page2_content} ${showSlider ? Styles.fadeIn : ''}`}>
              <h1>Learn Anything</h1>
              <h2>Over 1900 Online Courses</h2>
              <div className={Styles.btn_listcourses} >
                <a href="http://localhost:8080/courses/listcourses" className={Styles.listcourses_btn} id={Styles.page2_btn} role="button">
                    <i className="fas fa-search"></i> Discover Courses
                </a>
                <a href="http://localhost:8080/courses/listcourses" className={Styles.listcourses_btn} id={Styles.page2_btn2} role="button">
                    <i className="fas fa-comments"></i> Talk to Us
                </a>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className={`${Styles.pagination} ${showSlider ? Styles.fadeIn : ''}`}>
        <span className={currentPage === 1 ? Styles.active : ''} onClick={() => handlePageChange(1)}></span>
        <span className={currentPage === 2 ? Styles.active : ''} onClick={() => handlePageChange(2)}></span>
      </div>
    </div>
  );
};

export default Slider;

