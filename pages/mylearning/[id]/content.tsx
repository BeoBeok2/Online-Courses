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
  video: {
    url: string
  }
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
    console.log(lecture)
    setActiveLecture(lecture);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setActiveLecture(null);
    setIsModalOpen(false);
  };
  const router = useRouter();
  const { id } = router.query;
  let accessToken: string | null = null;
  function callAPI(id: any) {
    axios({
     method: 'POST',
      url: `${host}/courses/content/${id}`,
      headers: { Authorization: `Bearer ${accessToken}` },

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
    if (typeof window !== 'undefined') {
        accessToken = localStorage.getItem('accessToken');
    }
    if (id) {
      callAPI(id);
    }
  }, [id]);

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
      <Header></Header>
        <h1>My Learning</h1>
      <div className={Styles.main}>
        
        {/* <!-- =========== info-list========= --> */}

        <div className={Styles.info_list}>
          {course && (
            <div className={Styles.container}>
              <span className={Styles.title_info}>Curriculum</span>
              {course && course.sections && course.sections.map((section, index) => (
                <div key={section.id} className={Styles.body}>
                  <h1
                    className={Styles.title_sub}
                    onClick={() => toggleSection(section.id)}
                  >
                    Section {index+1}: {section.title}
                  </h1>
                  {visibleSections.includes(section.id) && (
                    <ul style={{display: "block"}} className={Styles.des_sub}>
                      {section.lectures.map((lecture, index) => (
                        <li key={lecture.id} onClick={() => openModal(lecture)}>
                          <ul >
                            <li className={Styles.lecture} style={{listStyle: "none", display: "block", padding: "20px 10px"}}>{index+1}. {lecture.title}</li>
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
                        <VideoPlayer videoUrl={activeLecture.video.url} />
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
    
      </div>
      <Footer />
    </>

  );
}
export default CourseDetail;