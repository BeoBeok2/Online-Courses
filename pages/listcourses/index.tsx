import Styles from '@/styles/listcourses.module.css';
import Header from '../components/footerheader/header';
import Footer from '../components/footerheader/footer';
import Banner from '../components/footerheader/banner';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useState, useEffect, SetStateAction } from 'react';
import host from '../api/host';
import { data } from 'autoprefixer';
import { access } from 'fs';

interface Course {
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
    IsPublish: boolean;
    thumbnail: {
        url: string;
        width: string;
        height: string;
    };
    instructor: {
        id: string;
    };
}

export default function ListCourses() {
    const [courses, setCourses] = useState<Course[]>([]);
    const [currentpage, setCurrentPage] = useState(2);
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();
    const { query } = router;

    let accessToken: string | null = null;
    let isMounted = true;

    if (typeof window !== 'undefined') {
        accessToken = localStorage.getItem('accessToken');
    }

    function truncateDescription(description: string, maxLength: number) {
        if (description.length <= maxLength) {
            return description;
        }
        return `${description.substr(0, maxLength)}...`;
    }

    function callAPI(page: number) {
        axios({
            method: 'GET',
            url: `${host}/courses?pageSize=4&page=${page}`,
            headers: { Authorization: `Bearer ${accessToken}` },
        })
            .then(response => {
                if ('courses' in response.data) {
                    const courses: SetStateAction<Course[]> = []

                    for(let i = 0; i < response.data.courses.length; i++) {
                        if(response.data.courses[i].isPublish) {
                            courses.push(response.data.courses[i])
                        }
                    }
                    setCourses(courses);
                }
            })
            .catch(error => {
                if (error.response && error.response.status === 401) {
                    alert(error.response.data.message + '. Xin vui lòng đăng nhập lại!');
                    console.log(error.response.data.message);
                    sessionStorage.removeItem('accessToken');
                    router.push('http://localhost:8080/login');
                }
            })
            .finally(() => {
                setIsLoading(false);
            });
    }

    useEffect(() => {
        const page = parseInt(query.page as string) || 1;
        callAPI(page);

        return () => {
            // cleanup function to prevent state update on unmounted component
            isMounted = false;
        };
    }, [query.page]);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    const currentPage = parseInt(query.page as string) || 1;
    const previousPage = currentPage > 1 ? currentPage - 1 : null;
    const nextPage = courses.length === 4 ? currentPage + 1 : null;

    const totalPages = Math.ceil(courses.length / 4);

    const pageNumbers = Array.from({ length: totalPages }, (_, index) => index + 1);

    const handleAddToCart = (e: any) => {
        const indexCourse = e.target.dataset.indexCourse
        const course = courses[indexCourse]
        axios.post('http://localhost:3000/cart', {
            "courseId": `${course.id}`
        }, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        }).then(result => {
            console.log(result)            
        }).catch(err => {
            if(err.response.data.code == 400) {
                alert(err.response.data.message)
            }
        })
    }

    return (
        <>
            <Header />
            <Banner title="List Courses" />
            <div className={Styles.main_courses}>
                <div className={Styles.list_courses_container}>
                    <div className={Styles.list_courses_items}>
                        {courses.map((course, index) => {
                                return (
                                    <div className={Styles.courseslist_wrapper_item} key={course.id}>
                                    <div className={Styles.courseslist_image}>
                                        <a
                                            href={`http://localhost:8080/listcourses/coursedetail/${course.id}`}
                                            title={course.title}
                                        >
                                            <img
                                                src={course.thumbnail.url}
                                                alt={course.title}
    
                                                className={Styles.courses_image}
                                                decoding="async"
                                                loading="lazy"
                                            />
                                        </a>
                                    </div>
                                    <div className={Styles.courseslist_details}>
                                        <div className={Styles.courseslist_details_inner}>
                                            <div className={Styles.courseslisting_featured}>
                                                <span className={Styles.courseslisting_featured_text}>{course.level}</span>
                                            </div>
                                            <h5>
                                                <a href={`http://localhost:8080/listcourses/coursedetail/${course.id}`}>
                                                    {course.title}
                                                </a>
                                                <div className={Styles.coursesdetails_price}>
                                                <span className={Styles.price_status}>
                                                    <ins>
                                                        <span className={Styles.price_amount}>
                                                            {course.price.value} {course.price.currency}
                                                            {/* <span className={Styles.price_current_symbol}>$</span> */}
                                                        </span>
                                                    </ins>
                                                </span>
                                            </div>
                                            </h5>
                                            <div className={Styles.courseslist_description}>
                                                {truncateDescription(course.description, 50)}
                                            </div>
                                            <div className={Styles.courseslist_metadata_holder}>
                                                {/* <div className={Styles.courseslist_author_image}>
                                                    <a href="#">
                                                       <img
                                                            src={course.imageUrl}
                                                            alt=""
                                                            className="avatar"
                                                            width={150}
                                                            height={150}
                                                            loading="lazy"
                                                            decoding="async"
                                                        />
                                                    </a>
                                                </div> */}
                                                {/* <div className={Styles.courseslist_author_description}>
                                                    <p>
                                                        <a href="#" rel="author">
                                                            Hoàng Phúc
                                                        </a>
                                                        <span></span>
                                                    </p>
                                                </div> */}
                                            </div>
                                            
                                            <div data-index-course={index} onClick={handleAddToCart} className={Styles.btn}>Add to Cart</div>
                                        </div>
                                    </div>
                                </div>
                                )
                        })}
                    </div>
                    <div className={Styles.pagination}>
                        {previousPage && (
                            <button onClick={() => router.push(`/listcourses?page=${previousPage}`)}>Pre</button>
                        )}

                        {pageNumbers.map(page => (
                            <button

                                key={page}
                                onClick={() => router.push(`/listcourses?page=${page}`)}
                                disabled={page === currentPage}
                            >
                                {page}
                            </button>
                            
                        ))}
                  
                        
                        {nextPage && (
                            <button onClick={() => router.push(`/listcourses?page=${nextPage}`)}>Next</button>
                        )}
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}
