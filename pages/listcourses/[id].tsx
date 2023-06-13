import Styles from '@/styles/coursesdetail.module.css';
import Head from 'next/head';
import Review from '../components/course/review';
import TopFooter from '../components/footerheader/topfooter';
import Banner from '../components/footerheader/banner';
import Header from '../components/footerheader/header';
import Footer from '../components/footerheader/footer';
import { useState } from 'react';
import ReactPlayer from 'react-player';
import YouTube from 'react-youtube';

export default function CourseDetail() {
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
  const [showModal, setShowModal] = useState(false);
  const [videoId, setVideoId] = useState('');
  const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const openModal = (id: string) => {
    if (videoId === id) {
      refreshModal();
      return;
    }

    setVideoId(id);
    setShowModal(true);
  };

  const closeModal = () => {
    setVideoId('');
    setShowModal(false);
  };

  const refreshModal = () => {
    setShowModal(false);
    setTimeout(() => {
      setShowModal(true);
    }, 100);
  };

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
      </Head>
      <Header />
      <div className={Styles.main}>
        <Banner title='Courses Detail' />
        {/* ======= Course =============== */}
        <div className={Styles.course}>
          <div className={Styles.container}>
            <div className={Styles.left_content}>
              <div className={Styles.stamp}>
                <i className="fa-sharp fa-solid fa-star"></i> <span>Beginner</span>
              </div>
              <div className={Styles.left_title}>
                <h1>Lập trình với C#</h1>
                <span className={Styles.des_title}>₹10</span>
              </div>
              <div className={Styles.info}>
                <div className={Styles.avatar}>
                  <img src="../../../images/rv-avt3.jpg" alt="avatar" />
                  <p className={Styles.name_avatar}>Văn Bảo</p>
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
                  <p>( 6 review )</p>
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
              <div className={Styles.btn_cart}>
                <i className="fa-solid fa-cart-shopping"></i>
                Add to Cart
              </div>
            </div>
          </div>
        </div>
        {/* <!-- ====== list product ========= --> */}
        <ul className={Styles.list_nav}>
          <li className={Styles.supp1}>01 Curriculum</li>
          <li className={Styles.supp2}>02 Course Info</li>
          <li className={Styles.supp3}>03 About</li>
          <li className={Styles.supp4}>04 Members</li>
        </ul>
        {/* <!-- =========== info-list========= --> */}
        <div className={Styles.info_list}>
          <div className={Styles.container}>
            <span className={Styles.title_info}>Curriculum</span>
            <div className={Styles.body}>
              <h1 className={Styles.title_sub}>01. Lorem ipsum dolor sit amet, consectetur</h1>
              <ul className={Styles.des_sub} onClick={() => openModal('3lwpE5x_DCI')}>
                <li>a.Aliquam Massa Turpis</li>
                <li><i className="fa-solid fa-file-word"></i></li>
                <li><i className="fa-solid fa-clock" id={Styles.fa_clock}> 2 hrs</i></li>
              </ul>


              {showModal && (
                <div className={Styles.modal}>
                  <div className={Styles.modalContent}>
                    <div id={Styles.dtlms_course_curriculum_popup} className={Styles.dtlmsCourseCurriculumPopup + ' ' + Styles.dtlmsCourseCurriculumPopupQuiz}>
                      <div className={Styles.dtlmsCourseCurriculumPopupHeader}>
                        <h2>Bước đầu làm quen với C# (45 mins) <br /> </h2>
                        {/* <br />
                        <h3>General Knowledge Quiz</h3> */}
                        <div className={Styles.dtlmsRefreshCourseCurriculum} onClick={refreshModal}>
                          <img src="../../../../images/refresh.png" alt="refresh" width={30} height={30} />
                        </div>
                        <div className={Styles.dtlmsCloseCourseCurriculumPopup} onClick={closeModal}>
                          <img src="../../../../images/close.png" alt="close" width={30} height={30} />
                        </div>
                      </div>

                      <div className={Styles.body_modal}>
                        <div className={Styles.dtlmsColumn + ' ' + Styles.dtlmsOneFifth + ' ' + Styles.first}>
                          <h5 className={Styles.dtlmsToggle + ' ' + Styles.active} onClick={toggleMenu}>
                            <a href="#">Lesson</a>
                            <img src="../../../../images/menu.png" alt="menu" width={30} height={30} />
                          </h5>
                          <div className={Styles.dtlmsToggleContent} style={{ display: 'block' }}>
                            {showMenu && (
                              <ul className={Styles.dtlmsCurriculumList}>
                                <ul className={Styles.des_sub} id={Styles.fix_lesson} onClick={() => openModal('a6URIZWEBsA')}>
                                  <li>a.Bước đầu làm quen với C#</li>
                                  <li><i className="fa-solid fa-clock" id={Styles.fa_clock}> 45 mins</i></li>
                                </ul>
                                <hr />
                                <ul className={Styles.des_sub} id={Styles.fix_lesson} onClick={() => openModal('3lwpE5x_DCI')}>
                                  <li>b.Thực hành trên C#</li>
                                  <li><i className="fa-solid fa-clock" id={Styles.fa_clock}> 2 hour</i></li>
                                </ul>
                                <hr />
                                <ul className={Styles.des_sub} id={Styles.fix_lesson} onClick={() => openModal('kvi9bIWtLBg')}>
                                  <li>c.Ứng dụng các chức năng</li>
                                  <li><i className="fa-solid fa-clock" id={Styles.fa_clock}> 30 mins</i></li>
                                </ul>
                              </ul>
                            )}
                          </div>
                        </div>

                        <div className={Styles.dtlmsColumn + ' ' + Styles.dtlmsFourFifth}>
                          <div className={` ${Styles.scrollable}`} >
                            <div className={Styles.videoWrapper}>
                              <YouTube videoId={videoId} />
                              {/* <YouTube videoId={videoIde} /> */}
                            </div>
                            <p>Sed porttitor eros id leo ultrices, et venenatis felis pellentesque. Praesent gravida dui eget accumsan interdum. Maecenas posuere risus sit amet fringilla fermentum. Maecenas eget ipsum sed leo egestas auctor eget sed sapien. Quisque porta dignissim odio in ultrices. Morbi viverra, ipsum non congue cursus, neque justo lobortis nisi, nec accumsan purus orci dictum mi.</p>
                            <p>Nulla sem leo, lobortis eu volutpat vel, cursus vitae ligula. In placerat odio eu risus bibendum, nec ornare augue sagittis. Ut feugiat metus vel diam molestie ultrices. Phasellus vitae ante vel mi elementum ultrices. Pellentesque interdum, dolor quis rutrum cursus, ante sem aliquam turpis, at luctus velit nibh nec ante. Nunc augue leo, pharetra ut ultricies eget, volutpat in orci. Nunc fermentum magna lobortis metus vulputate gravida. Nam at tortor id ante vestibulum egestas. Vivamus pulvinar tortor non rhoncus condimentum. Nunc eu dui arcu. Donec varius scelerisque nisi ac ornare. Etiam auctor, erat in ullamcorper lobortis, metus ante ornare ante, eget lobortis eros risus quis quam. Ut consectetur molestie suscipit.</p>
                            <p>Integer interdum at sapien vitae egestas. Suspendisse commodo hendrerit convallis. Etiam faucibus eget quam non lobortis. Vivamus convallis id erat id pulvinar. Suspendisse sollicitudin pretium lobortis. Curabitur sed purus eu ipsum posuere interdum in a sapien. Proin dictum auctor auctor. Aenean at est facilisis, aliquam dolor non, ultricies nisi. Nullam sodales neque a euismod aliquet. Ut vel vulputate nibh, sed gravida nisl. Pellentesque eu orci et nunc condimentum fermentum. Donec dictum eros id libero consequat vestibulum.</p>
                            <p>Proin dictum ultricies dolor, sit amet pulvinar risus elementum et. Nunc accumsan placerat gravida. Pellentesque nec velit viverra, dignissim turpis et, pharetra metus. Vivamus sit amet ligula eget felis semper sagittis eu sed turpis. Aenean suscipit sagittis dui vel sagittis. Phasellus et rhoncus odio. Mauris dignissim euismod sapien, sit amet egestas quam dictum in. Mauris auctor sapien nec semper tempor. Sed tempus volutpat nisl ut mattis. Vestibulum dapibus tortor felis, ac sagittis lacus tristique a.</p>
                            <p>Pellentesque et eros facilisis, eleifend augue feugiat, placerat mauris. Nam vehicula est nec varius volutpat. Nulla vitae risus id magna vehicula posuere. Aenean eget ullamcorper nisl, eu egestas enim. Pellentesque tortor felis, porttitor ut dignissim et, scelerisque ut turpis. Pellentesque nec arcu eget dolor molestie sollicitudin.</p>
                            <p>In pharetra egestas tempor. Suspendisse id arcu et sapien varius suscipit. Quisque porttitor, augue sed facilisis rutrum, odio arcu luctus diam, nec lobortis mi ante non sapien. Morbi at sapien sed nulla consectetur tristique. Sed a dictum augue. Nam gravida interdum sapien blandit ornare. Sed id quam ac sem scelerisque hendrerit. Suspendisse vel lectus porta, iaculis risus sed, pulvinar massa. Mauris cursus neque tortor, ac vehicula lorem ultrices at.</p>
                          </div>
                        </div>
                      </div>
                      {/* <div id="dtlms-ajax-load-image" style={{ display: 'none' }}>
                        <div className={Styles.dtlmsLoaderInner}>
                          <div className={Styles.dtlmsLoading}></div>
                          <div className={Styles.dtlmsPad}>
                            <div className={Styles.dtlmsLine + ' ' + Styles.dtlmsLine1}></div>
                            <div className={Styles.dtlmsLine + ' ' + Styles.dtlmsLine2}></div>
                            <div className={Styles.dtlmsLine + ' ' + Styles.dtlmsLine3}></div>
                          </div>
                        </div>
                      </div> */}
                    </div>
                  </div>
                </div>


              )}

            </div>
          </div>
        </div>

        {/* <!-- ========== author =========== --> */}
        <div className={Styles.author}>
          <div className={Styles.container}>
            <div className={Styles.block}>
              <div className={Styles.top_content}>
                <h1 className={Styles.title}>Related Courses</h1>
                <span className={Styles.des}>COURSES YOU MIGHT BE INTERESTED IN</span>
              </div>
            </div>
            <div className={Styles.bot_content}>
              {/* <!-- course 1 --> */}
              <div className={Styles.course_item}>
                <a href=""><img src="./assets/img/course-1.jpg" alt="" /></a>
                <div className={Styles.info}>
                  <div className={Styles.stamp}>
                    <i className="fa-sharp fa-solid fa-star"></i> <span>FEATURE</span>
                  </div>
                  <p className={Styles.des}>Law & Order</p>
                  <span className={Styles.sub}>Introduction to e-commerce</span>
                  <p className={Styles.des_sub}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ...
                  </p>
                  <div className={Styles.author_sub}>
                    <div className={Styles.avatar}>
                      <img src="./assets/img/avata-1.jpg" alt="avatar" />
                      <p className={Styles.name_avatar}>Jason Statemen</p>
                      <span className={Styles.price}>₹35</span>
                    </div>
                  </div>
                  <div className={Styles.btn}>Add to Cart</div>
                </div>
              </div>
              {/* <!-- course 2 --> */}
              <div id="height: 615px" className={Styles.course_item}>
                <a href=""><img src="./assets/img/course-2.jpg" alt="" /></a>
                <div className={Styles.info}>
                  <p className={Styles.des}>Law & Order</p>
                  <span className={Styles.sub}>Course With Drip Feed Curriculum</span>

                  <p className={Styles.des_sub}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ...
                  </p>
                  <div className={Styles.author_sub}>
                    <div className={Styles.avatar}>
                      <img src="./assets/img/avata.jpg" alt="avatar" />
                      <p className={Styles.name_avatar}>Ram</p>
                      <span className={Styles.price}>₹20</span>
                    </div>
                  </div>
                  <div className={Styles.btn}>Add to Cart</div>
                </div>
              </div>
              {/* <!-- course 3 --> */}
              <div id="height: 635px" className={Styles.course_item}>
                <a href=""><img src="./assets/img/course-3.jpg" alt="" /></a>
                <div className={Styles.info}>
                  <p className={Styles.des}>
                    Medical, Offers & Prizes, Professional Video Demos
                  </p>
                  <span className={Styles.sub}>Course With Related Courses</span>
                  <p className={Styles.des_sub}>
                    Sed ut perspiciatis unde omnis iste natus error sit voluptatem
                    ...
                  </p>
                  <div className={Styles.author_sub}>
                    <div className={Styles.avatar}>
                      <img src="./assets/img/avata.jpg" alt="avatar" />
                      <p className={Styles.name_avatar}>Ram</p>
                      <span className={Styles.price}>₹35</span>
                    </div>
                  </div>
                  <div className={Styles.btn} id={Styles.btn_2}>Add to Cart</div>
                </div>
              </div>
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