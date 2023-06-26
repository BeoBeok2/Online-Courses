import Styles from '@/styles/coursesdetail.module.css';
import Head from 'next/head';
import Review from '../../components/course/review';
import TopFooter from '../../components/footerheader/topfooter';
import Banner from '../../components/footerheader/banner';
import Header from '../../components/footerheader/header';
import Footer from '../../components/footerheader/footer';
import { useEffect, useState } from 'react';
import axios from 'axios';
import host from '@/pages/api/host';
import { useRouter } from 'next/router';
import VideoPlayer from '@/pages/components/course/videoplayer';

interface RelatedCourse {
  id: string;
  title: string;
  requirement: string;
  level: string;
  description: string;
  language: string;
  price: {
    value: string;
    currency: string;
  };
  NumReviews: string;
  AvgRating: string;
  thumbnail: {
    url: string;
    width: string;
    height: string;
  };
  instructor: {
    id: string;
  };
}

interface Lecture {
  id: string;
  title: string;
  content: string;
  video: any;
}

interface Section {
  id: string;
  title: string;
  lectures: Lecture[];
}

interface Price {
  value: string;
  currency: string;
}

interface Thumbnail {
  url: string;
  width: string;
  height: string;
}

interface Avatar {
  url: string;
  width: string;
  height: string;
}

interface Instructor {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  website: string;
  linkedin: string;
  youtube: string;
  bio: string;
  avt: Avatar;
}

interface Course {
  id: string;
  title: string;
  level: string;
  sections: Section[];
  description: string;
  language: string;
  price: Price;
  NumReviews: string;
  AvgRating: string;
  thumbnail: Thumbnail;
  instructor: Instructor;
}

const CourseDetail: React.FC = () => {
  // const [showModal, setShowModal] = useState(false);
  // const [videoSource, setVideoSource] = useState('');

  // const openModal = (source: any) => {
  //   setVideoSource(source);
  //   setShowModal(true);
  // };

  // const closeModal = () => {
  //   setVideoSource('');
  //   setShowModal(false);
  // };
  // const videoIde = '3lwpE5x_DCI';
  const [relatedcourses, setRelatedCourses] = useState<RelatedCourse[]>([]);
  const [course, setCourse] = useState<Course | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [videoId, setVideoId] = useState('');
  const [showMenu, setShowMenu] = useState(false);
  const [visibleSections, setVisibleSections] = useState<string[]>([]);
  const [activeLecture, setActiveLecture] = useState<Lecture | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleSection = (sectionId: string) => {
    if (visibleSections.includes(sectionId)) {
      setVisibleSections(visibleSections.filter((id) => id !== sectionId));
    } else {
      setVisibleSections([...visibleSections, sectionId]);
    }
  };

  const openModal = (lecture: Lecture) => {
    setActiveLecture(lecture);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setActiveLecture(null);
    setIsModalOpen(false);
  };
  const router = useRouter();
  const { id } = router.query;
  function callAPI(id: any) {
    
    axios({
      method: 'GET',
      url: `${host}/courses/${id}`,
    })
      .then(response => {
        const course = response.data.course as Course;

        setCourse(course);
        console.log(course);
      })
      .catch(error => {
        console.log(error);
        router.push('http://localhost:8080/components/error');
      });
  }
  useEffect(() => {
    if (id) {
      callAPI(id);
    }
  }, [id]);
  const loadRelatedCourses = () => {
    axios
      .get(`${host}/courses?pageSize=3&page=1`)
      .then((response) => {
        const relatedcourses = response.data.courses as RelatedCourse[];
        setRelatedCourses(relatedcourses);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    if (course) {
      loadRelatedCourses();
    }
  }, [course]);
  function truncateDescription(description: string, maxLength: number) {
    if (description.length <= maxLength) {
      return description;
    }
    return `${description.substr(0, maxLength)}...`;
  }
  // const toggleMenu = () => {
  //   setShowMenu(!showMenu);
  // };

  // const openModal = (id: string) => {
  //   if (videoId === id) {
  //     refreshModal();
  //     return;
  //   }

  //   setVideoId(id);
  //   setShowModal(true);
  // };

  // const closeModal = () => {
  //   setVideoId('');
  //   setShowModal(false);
  // };

  // const refreshModal = () => {
  //   setShowModal(false);
  //   setTimeout(() => {
  //     setShowModal(true);
  //   }, 100);
  // };
  let accessToken: string | null = null;
  if (typeof window !== 'undefined') {
    accessToken = localStorage.getItem('accessToken');
}
const handleAddToCart = () => {
  axios
    .post(
      'http://localhost:3000/cart',
      {
        courseId: course?.id, // courseId của khóa học được truyền vào từ props hoặc trạng thái của trang chi tiết khóa học
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    )
    .then((result) => {
      console.log(result);
      // Xử lý thành công - ví dụ: hiển thị thông báo, cập nhật trạng thái, vv.
    })
    .catch((err) => {
      console.log(err);
      // Xử lý lỗi - ví dụ: hiển thị thông báo lỗi, vv.
    });
};


  if (!course) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Head>

        <meta name="viewport" content="width=device-width, initial-scale=1.0" />

        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.3.0/css/all.min.css"
        />

        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin='' />
        <link
          href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500&family=Lato:wght@700&family=Montserrat:ital,wght@0,500;1,300&family=Poppins:wght@400;600;700&family=Roboto:wght@100;300;400;500;700;900&family=Sen:wght@700&display=swap"
          rel="stylesheet"
        />
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0/dist/css/bootstrap.min.css"
        />
      </Head>
      <Header />

      <div className={Styles.main}>
        <Banner title='Courses Detail' />
        {/* ======= Course =============== */}
        {course && (
          <div className={Styles.course} key={course.id}>
            <div className={Styles.container}>
              <div className={Styles.left_content}>
                <div className={Styles.stamp}>
                  <i className="fa-sharp fa-solid fa-star"></i> <span>{course.level}</span>
                </div>
                <div className={Styles.left_title}>
                  <h1>{course.title}</h1>
                  <span className={Styles.des_title}>{course.price.value} {course.price.currency}</span>
                </div>
                <div className={Styles.info}>
                  <div className={Styles.avatar}>
                    <img src={course.instructor.avt.url} alt="avatar" />
                    <p className={Styles.name_avatar}>{course.instructor.firstName} {course.instructor.lastName}</p>
                  </div>
                  <div className={Styles.slot}>
                    <i className="fa-solid fa-book"></i>
                    <p className={Styles.des_slot}>Bài học</p>
                  </div>
                  <div className={Styles.review}>
                    <i className="fa-solid fa-star" id={Styles.fa_review}></i>
                    <i className="fa-solid fa-star" id={Styles.fa_review}></i>
                    <i className="fa-solid fa-star" id={Styles.fa_review}></i>
                    <i className="fa-solid fa-star" id={Styles.fa_review}></i>
                    <i className="fa-solid fa-star" id={Styles.fa_review}></i>
                    {/* <p>( 6 review )</p> */}
                  </div>
                </div>
                <div className={Styles.share_course}>
                  <p className="des-course">Share this Course:</p>
                  <div className={Styles.social_medial}>
                    <i className="fa-brands fa-facebook-f" id={Styles.fa_icon}></i>
                    <i className="fa-brands fa-twitter" id={Styles.fa_icon}></i>
                    <i className="fa-brands fa-google-plus-g" id={Styles.fa_icon}></i>
                  </div>
                </div>
              </div>
              <div className={Styles.right_content}>
                <div className={Styles.btn_cart} onClick={() => handleAddToCart()}>
                  <i className="fa-solid fa-cart-shopping"></i>
                  Add to Cart
                </div>
              </div>
            </div>
          </div>
        )}
        {/* <!-- ====== list product ========= --> */}
        <ul className={Styles.list_nav}>
          <li className={Styles.supp1}>01 Curriculum</li>
          <li className={Styles.supp2}>02 Course Info</li>
          <li className={Styles.supp3}>03 About</li>
          <li className={Styles.supp4}>04 Members</li>
        </ul>
        {/* <!-- =========== info-list========= --> */}

        <div className={Styles.info_list}>
          {course && (
            <div className={Styles.container}>
              <span className={Styles.title_info}>Curriculum</span>
              {course && course.sections && course.sections.map((section) => (
                <div key={section.id} className={Styles.body}>
                  <h1
                    className={Styles.title_sub}
                    onClick={() => toggleSection(section.id)}
                  >
                    {section.title}
                  </h1>
                  {visibleSections.includes(section.id) && (
                    <ul className={Styles.des_sub}>
                      {section.lectures.map((lecture) => (
                        <li key={lecture.id} onClick={() => openModal(lecture)}>
                          <ul>
                            <li>{lecture.title}</li>
                            {/* Add your logic to display the lecture content or video here */}

                          </ul>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
              {isModalOpen && activeLecture && (
                <div className={Styles.modal}>
                  <div className={Styles.modalContent}>
                    <div id={Styles.dtlms_course_curriculum_popup} className={Styles.dtlmsCourseCurriculumPopup + ' ' + Styles.dtlmsCourseCurriculumPopupQuiz}>
                      <h2 id={Styles.activeLecture_title}>{activeLecture.title}</h2>
                      <div className={Styles.dtlmsCloseCourseCurriculumPopup} onClick={closeModal}>
                        <img src="../../../../images/close.png" alt="close" width={30} height={30} />
                      </div>
                      <div className={Styles.dtlmsCourseCurriculumPopupHeader}>


                        {/* <p>{activeLecture.content}</p> */}
                        <VideoPlayer videoUrl={activeLecture.video} />
                      </div>
                    </div>
                  </div>
                </div>
              )}





            </div>
          )}
        </div>
        <div className={Styles.author}>
          <div className={Styles.container}>
            <div className={Styles.block}>
              <div className={Styles.top_content}>
                <h1 className={Styles.title}>Related Courses</h1>
                <span className={Styles.des}>COURSES YOU MIGHT BE INTERESTED IN</span>
              </div>
            </div>
            <div className={Styles.bot_content}>
              {relatedcourses.map((relatedCourse) => (
                <div className={Styles.course_item} key={relatedCourse.id}>
                  <a href={`http://localhost:8080/listcourses/coursedetail/${relatedCourse.id}`}><img src={relatedCourse.thumbnail.url} alt="" /></a>
                  <div className={Styles.info}>
                  <div className={Styles.author_sub}>
                      <span className={Styles.avatar}>
                        <div>
                          <span className={Styles.price}>
                            {course.price.value} {course.price.currency}
                            
                          </span>
                        </div>
                      </span>
                    </div>
                    <div className={Styles.stamp}>
                      <i className="fa-sharp fa-solid fa-star"></i> <span>{relatedCourse.level}</span>
                    </div>
                    
                    <p className={Styles.sub}>{relatedCourse.title}</p>
                    
                    <span className={Styles.des}>{truncateDescription(relatedCourse.description, 100)}</span>
                    <p className={Styles.des_sub}>
                      {relatedCourse.requirement}
                    </p>

                    <div className={Styles.btn}>Add to Cart</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>


        <Review />
        <TopFooter />
      </div>
      <Footer />
    </>

  );
}
export default CourseDetail;