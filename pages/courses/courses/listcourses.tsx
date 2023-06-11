import Styles from '@/styles/listcourses.module.css';
/* import Courses from './courses'; */
import Header from '../footer/header';
import Footer from '../footer/footer';
import Banner from '../banner';
import axios from 'axios';
import { useRouter } from 'next/router';
import { ReactElement, JSXElementConstructor, ReactFragment, ReactPortal, useState, useEffect, SetStateAction } from 'react';

interface Course {
    id: string;
    title: string;
    description: string;
    imageUrl: string;
    price: string;
    currency: string;
    level: string;
    language: string;
    duration: string;
    thumbnail: {
        url: string;
        width: string;
        height: string;
    };
}
export default function ListCourses() {
    interface Course {
        id: string;
        title: string;
        description: string;
        imageUrl: string;
        price: string;
        currency: string;
        level: string;
        language: string;
        duration: string;
        thumbnail: {
            url: string;
            width: string;
            height: string;
        };
    }


    const [courses, setCourses] = useState<Course[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);

    let accessToken: string | null = null;
    let isMounted = true;

    if (typeof window !== 'undefined') {
        accessToken = sessionStorage.getItem('accessToken');
    }

    function handlePageChange(newPage: number) {
        setCurrentPage(newPage);
    }

    function callAPI(pageSize: number, page: number) {
        axios({
            method: 'GET',
            url: `http://localhost:3000/courses?pageSize=${pageSize}&page=${page}`,
            headers: { Authorization: `Bearer ${accessToken}` },
        })
            .then(response => {
                console.log(response.data.courses);
                if ('courses' in response.data) {
                    const courses = response.data.courses as Course[];
                    const coursesWithSelectedFields = courses.map(course => ({
                        id: course.id,
                        title: course.title,
                        description: course.description,
                        imageUrl: course.thumbnail.url,
                        price: course.price,
                        currency: course.currency,
                        level: course.level,
                        language: course.language,
                        duration: course.duration,
                        thumbnail: {
                            url: course.thumbnail.url,
                            width: course.thumbnail.width,
                            height: course.thumbnail.height,
                        },
                    }));
                    setCourses(coursesWithSelectedFields);
                    setTotalPages(Math.ceil(response.data.totalCourses / pageSize));
                }
            })
            .catch(error => {
                if (error.response && error.response.status === 401) {
                    alert(error.response.data.message + '. Xin vui lòng đăng nhập lại!');
                    console.log(error.response.data.message);
                    sessionStorage.removeItem('accessToken');
                    router.push('http://localhost:8080/courses/login');
                }
            });
    }

    useEffect(() => {
        callAPI(3, currentPage);
        setIsLoading(false);
        return () => {
            // cleanup function to prevent state update on unmounted component
            isMounted = false;
        };
    }, [currentPage]);

    if (isLoading) {
        return <div>Loading...</div>;
    }
    return (
        <>
            <Header />
            <Banner title='List Courses' />
            {/* <div className={Styles.main_courses}>
                <div className={Styles.list_courses_container}>
                    <div className={Styles.list_courses_items}>
                        {courses.map(course => (
                            <div className={Styles.courseslist_wrapper_item} key={course.id}>
                                <div className={Styles.courseslist_image}>
                                    <a
                                        href={`http://localhost:8080/courses/courses/listcourses/${course.id}`}
                                        title='Courses A'
                                    >
                                        <img
                                            src="https://elearni.wpengine.com/wp-content/uploads/2014/08/course-10.jpg"
                                            alt=""
                                            width='100%'
                                            className={Styles.courses_image}
                                            alt-decoding='async'
                                            loading='lazy'
                                        />
                                    </a>
                                </div>
                                <div className={Styles.courseslist_details}>
                                    <div className={Styles.courseslist_details_inner}>
                                        <div className={Styles.courseslisting_featured}>
                                            <span className={Styles.courseslisting_featured_text}>
                                                {course.level}
                                            </span>
                                        </div>
                                        <h5>
                                            <a href={`http://localhost:8080/courses/courses/listcourses/${course.id}`}>
                                                {course.title}
                                            </a>
                                        </h5>
                                        <div className={Styles.courseslist_description}>
                                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ...
                                        </div>
                                        <div className={Styles.courseslist_metadata_holder}>
                                            <div className={Styles.courseslist_author_image}>
                                                <a href="#">
                                                    <img
                                                        src={course.imageUrl}
                                                        alt=""
                                                        className='avatar'
                                                        width={150}
                                                        height={150}
                                                        loading='lazy'
                                                        decoding='async'
                                                    />
                                                </a>
                                            </div>
                                            <div className={Styles.courseslist_author_description}>
                                                <p>
                                                    <a href="#" rel='author'>
                                                        Hoàng Phúc
                                                    </a>
                                                    <span></span>
                                                </p>
                                            </div>
                                        </div>
                                        <div className={Styles.coursesdetails_price}>
                                            <span className={Styles.price_status}>
                                                <ins>
                                                    <span className={Styles.price_amount}>
                                                        {course.price}
                                                        <span className={Styles.price_current_symbol}>$</span>
                                                    </span>
                                                </ins>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className={Styles.pagination}>
                        <ul className={Styles.page_numbers}>
                            {Array.from({ length: totalPages }, (_, index) => {
                                const pageNum = index + 1;
                                const isActive = pageNum === currentPage;
                                return (
                                    <li key={pageNum}>
                                        {isActive ? (
                                            <span aria-current='page' id='page_numbers_current' className={Styles.page_numbers}>
                                                {pageNum}
                                            </span>
                                        ) : (
                                            <a href={`#${pageNum}`} className={Styles.page_numbers} onClick={() => handlePageChange(pageNum)}>
                                                {pageNum}
                                            </a>
                                        )}
                                    </li>
                                );
                            })}
                        </ul>
                        <div className={Styles.next_port}>
                            {currentPage !== totalPages && (
                                <a href={`#${currentPage + 1}`} onClick={() => handlePageChange(currentPage + 1)}>
                                    Next&nbsp;
                                </a>
                            )}
                        </div>
                    </div>
                </div>
            </div> */}
            <div className={Styles.main_courses}>
                <div className={Styles.list_courses_container}>
                    <div className={Styles.list_courses_items}>
                        
                            <div className={Styles.courseslist_wrapper_item} >
                                <div className={Styles.courseslist_image}>
                                    <a
                                        href='http://localhost:8080/courses/courses/listcourses/1'
                                        title='Courses A'
                                    >
                                        <img
                                            src="../../images/course-2.jpg"
                                            alt=""
                                            width='100%'
                                            className={Styles.courses_image}
                                            alt-decoding='async'
                                            loading='lazy'
                                        />
                                    </a>
                                </div>
                                <div className={Styles.courseslist_details}>
                                    <div className={Styles.courseslist_details_inner}>
                                        <div className={Styles.courseslisting_featured}>
                                            <span className={Styles.courseslisting_featured_text}>
                                                Beginner
                                            </span>
                                        </div>
                                        <h5>
                                            <a href='http://localhost:8080/courses/courses/listcourses/1'>
                                                Begin Designner
                                            </a>
                                        </h5>
                                        <div className={Styles.courseslist_description}>
                                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ...
                                        </div>
                                        <div className={Styles.courseslist_metadata_holder}>
                                            <div className={Styles.courseslist_author_image}>
                                                <a href="#">
                                                    <img
                                                        src="../../images/re-avt1.jpg"
                                                        alt=""
                                                        className='avatar'
                                                        width={150}
                                                        height={150}
                                                        loading='lazy'
                                                        decoding='async'
                                                    />
                                                </a>
                                            </div>
                                            <div className={Styles.courseslist_author_description}>
                                                <p>
                                                    <a href="#" rel='author'>
                                                        Hoàng Phúc
                                                    </a>
                                                    <span></span>
                                                </p>
                                            </div>
                                        </div>
                                        <div className={Styles.coursesdetails_price}>
                                            <span className={Styles.price_status}>
                                                <ins>
                                                    <span className={Styles.price_amount}>
                                                        25
                                                        <span className={Styles.price_current_symbol}>$</span>
                                                    </span>
                                                </ins>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className={Styles.courseslist_wrapper_item} >
                                <div className={Styles.courseslist_image}>
                                    <a
                                        href='http://localhost:8080/courses/courses/listcourses/1'
                                        title='Courses A'
                                    >
                                        <img
                                            src="../../images/course-1.jpg"
                                            alt=""
                                            width='100%'
                                            className={Styles.courses_image}
                                            alt-decoding='async'
                                            loading='lazy'
                                        />
                                    </a>
                                </div>
                                <div className={Styles.courseslist_details}>
                                    <div className={Styles.courseslist_details_inner}>
                                        <div className={Styles.courseslisting_featured}>
                                            <span className={Styles.courseslisting_featured_text}>
                                                Beginner
                                            </span>
                                        </div>
                                        <h5>
                                            <a href='http://localhost:8080/courses/courses/listcourses/1'>
                                                Tìm hiểu về C#
                                            </a>
                                        </h5>
                                        <div className={Styles.courseslist_description}>
                                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ...
                                        </div>
                                        <div className={Styles.courseslist_metadata_holder}>
                                            <div className={Styles.courseslist_author_image}>
                                                <a href="#">
                                                    <img
                                                        src="../../images/rv-avt3.jpg"
                                                        alt=""
                                                        className='avatar'
                                                        width={150}
                                                        height={150}
                                                        loading='lazy'
                                                        decoding='async'
                                                    />
                                                </a>
                                            </div>
                                            <div className={Styles.courseslist_author_description}>
                                                <p>
                                                    <a href="#" rel='author'>
                                                        Văn Bảo
                                                    </a>
                                                    <span></span>
                                                </p>
                                            </div>
                                        </div>
                                        <div className={Styles.coursesdetails_price}>
                                            <span className={Styles.price_status}>
                                                <ins>
                                                    <span className={Styles.price_amount}>
                                                        10
                                                        <span className={Styles.price_current_symbol}>$</span>
                                                    </span>
                                                </ins>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className={Styles.courseslist_wrapper_item} >
                                <div className={Styles.courseslist_image}>
                                    <a
                                        href='http://localhost:8080/courses/courses/listcourses/1'
                                        title='Courses A'
                                    >
                                        <img
                                            src="../../images/course-3.jpg"
                                            alt=""
                                            width='100%'
                                            className={Styles.courses_image}
                                            alt-decoding='async'
                                            loading='lazy'
                                        />
                                    </a>
                                </div>
                                <div className={Styles.courseslist_details}>
                                    <div className={Styles.courseslist_details_inner}>
                                        <div className={Styles.courseslisting_featured}>
                                            <span className={Styles.courseslisting_featured_text}>
                                                Master
                                            </span>
                                        </div>
                                        <h5>
                                            <a href='http://localhost:8080/courses/courses/listcourses/1'>
                                                Programer AI
                                            </a>
                                        </h5>
                                        <div className={Styles.courseslist_description}>
                                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ...
                                        </div>
                                        <div className={Styles.courseslist_metadata_holder}>
                                            <div className={Styles.courseslist_author_image}>
                                                <a href="#">
                                                    <img
                                                        src="../../images/re-avt1.jpg"
                                                        alt=""
                                                        className='avatar'
                                                        width={150}
                                                        height={150}
                                                        loading='lazy'
                                                        decoding='async'
                                                    />
                                                </a>
                                            </div>
                                            <div className={Styles.courseslist_author_description}>
                                                <p>
                                                    <a href="#" rel='author'>
                                                        Hoàng Phúc
                                                    </a>
                                                    <span></span>
                                                </p>
                                            </div>
                                        </div>
                                        <div className={Styles.coursesdetails_price}>
                                            <span className={Styles.price_status}>
                                                <ins>
                                                    <span className={Styles.price_amount}>
                                                        50
                                                        <span className={Styles.price_current_symbol}>$</span>
                                                    </span>
                                                </ins>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className={Styles.courseslist_wrapper_item} >
                                <div className={Styles.courseslist_image}>
                                    <a
                                        href='http://localhost:8080/courses/courses/listcourses/1'
                                        title='Courses A'
                                    >
                                        <img
                                            src="../../images/course-2.jpg"
                                            alt=""
                                            width='100%'
                                            className={Styles.courses_image}
                                            alt-decoding='async'
                                            loading='lazy'
                                        />
                                    </a>
                                </div>
                                <div className={Styles.courseslist_details}>
                                    <div className={Styles.courseslist_details_inner}>
                                        <div className={Styles.courseslisting_featured}>
                                            <span className={Styles.courseslisting_featured_text}>
                                                Beginner
                                            </span>
                                        </div>
                                        <h5>
                                            <a href='http://localhost:8080/courses/courses/listcourses/1'>
                                                Kỹ thuật lập trình
                                            </a>
                                        </h5>
                                        <div className={Styles.courseslist_description}>
                                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ...
                                        </div>
                                        <div className={Styles.courseslist_metadata_holder}>
                                            <div className={Styles.courseslist_author_image}>
                                                <a href="#">
                                                    <img
                                                        src="../../images/rv-avt3.jpg"
                                                        alt=""
                                                        className='avatar'
                                                        width={150}
                                                        height={150}
                                                        loading='lazy'
                                                        decoding='async'
                                                    />
                                                </a>
                                            </div>
                                            <div className={Styles.courseslist_author_description}>
                                                <p>
                                                    <a href="#" rel='author'>
                                                        Văn Bảo
                                                    </a>
                                                    <span></span>
                                                </p>
                                            </div>
                                        </div>
                                        <div className={Styles.coursesdetails_price}>
                                            <span className={Styles.price_status}>
                                                <ins>
                                                    <span className={Styles.price_amount}>
                                                        30
                                                        <span className={Styles.price_current_symbol}>$</span>
                                                    </span>
                                                </ins>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                        
                    </div>
                    <div className={Styles.pagination}>
                        <ul className={Styles.page_numbers}>
                            <li>
                                <a href='' className={Styles.page_numbers} >
                                    1
                                </a>
                            </li>
                            <li>
                                <a href='' className={Styles.page_numbers} >
                                    2
                                </a>
                            </li>
                        </ul>
                        <div className={Styles.next_port}>
                                <a href='' >
                                    Next&nbsp;
                                </a>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}