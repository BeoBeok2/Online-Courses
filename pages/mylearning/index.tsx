import React, { useEffect, useState } from 'react';
import Styles from '@/styles/coursemanagement.module.css';
import router from 'next/router';
import SideNav from '@/pages/components/instructor/sidenav';
import Link from 'next/link';
import host from '@/pages/api/host';
import axios from 'axios';
import Header from '../components/footerheader/header';
export default function CourseEnrollment() {

    interface Course {
        courseId: string;
        title: string;
        thumbnail: {
            url: string;
            width: string;
            height: string;
        };
    }
    const [courses, setCourses] = useState<Course[]>([]);
    let accessToken: string | null = null;
  

    function callAPI() {
        axios({
            method: 'GET',
            url: `${host}/courses/enrollment`,
            headers: { Authorization: `Bearer ${accessToken}` },
        })
            .then(response => {
                    const courses = response.data.enrollments as Course[];
                    setCourses(courses);
                    console.log(courses)
            })
            .catch(error => {
                console.log(error)
                // if (error.response && error.response.status === 401) {
                //     alert(error.response.data.message + '. Xin vui lòng đăng nhập lại!');
                //     console.log(error.response.data.message);
                //     sessionStorage.removeItem('accessToken');
                //     router.push('http://localhost:8080/login');
                // }
            })
            .finally(() => {
            });
    }
    useEffect(() => {
        if (typeof window !== 'undefined') {
            accessToken = localStorage.getItem('accessToken');
        }
        callAPI()
    },[])

    return (
        <>
            <Header />

            <div className={Styles.container}>
                <div className={Styles.heading}>
                    <h1 style={{marginTop: "100px"}}>My learning</h1>
                </div>
                <div style={{display: "grid", gridTemplateColumns: "auto auto"}}>
                {courses.map((course, index)=>(
                                      <a href={`http://localhost:8080/mylearning/${course.CourseId}/content`} style={{margin: "35px 0"}} id={Styles.edit_button} role="button" key={index}>

                              <div className={Styles.course_list} >
                              <div className={`${Styles.course_card} ${Styles.hover_effect}`}>
                                <div className={Styles.cover_hover}>
                                  <img src={course.thumbnail.url} alt="Course Image" style={{width: '250px', height: "170px", objectFit: "cover"}}/>
                                  <div className={Styles.card_content}>
                                      <h3>{course.title}</h3>
                                  </div>
                                  </div>
                              </div>
                              
                          </div>
                          </a>

                ))}
                </div>
              
            </div>
        </>
    );
}
