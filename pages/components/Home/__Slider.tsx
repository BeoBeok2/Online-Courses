import React from 'react';
import Slider from 'react-slick';
import Styles from '@/styles/slider.module.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';


const Slide = () => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    swipeToSlide: true,
    arrows: false,
    autoplay: true,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          arrows: false,
        },
      },
    ],
  };

  return (
    <Slider {...settings}>
      <div className={Styles.slide_item}>
        <div className={Styles.slide_content}>
          <div className={Styles.left_content}>
            <h3>Course 1</h3>
            <h3>Course 2</h3>
            <h3>Course 3</h3>
            <button>Go to Courses</button>
          </div>
          <div className={Styles.right_content}>
            <img src="../images/phone-img.png" alt="Image 1" />
          </div>
        </div>
      </div>
      <div className={Styles.slide_item}>
        <div className={Styles.slide_content}>
          <div className={Styles.left_content}>
            <h3>Course 4</h3>
            <h3>Course 5</h3>
            <h3>Course 6</h3>
            <div className={Styles.btn_listcourses} >
              <a href="http://localhost:8080/courses/listcourses" className={Styles.listcourses_btn}  role="button">View Courses</a>
            </div>
          </div>
          <div className={Styles.right_content}>
            <img src="../images/phone-img.png" alt="Image 2" />
          </div>
        </div>
      </div>
    </Slider>
  );
};

export default Slide;
