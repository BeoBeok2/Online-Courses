import React, { useEffect, useState } from 'react';
import Styles from '@/styles/coursemanagement.module.css';
import router from 'next/router';
import SideNav from '@/pages/components/instructor/sidenav';
import Link from 'next/link';
import host from '@/pages/api/host';
import axios from 'axios';
export default function CourseManagement() {

    interface Course {
        id: string;
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
            url: `${host}/courses/owner`,
            headers: { Authorization: `Bearer ${accessToken}` },
        })
            .then(response => {
                if ('courses' in response.data) {
                    const courses = response.data.courses as Course[];
                    setCourses(courses);
                }
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
            <SideNav />
            <div className={Styles.container}>
                <div className={Styles.heading}>
                    <h1>Course Management</h1>
                    
                    <div className={Styles.create_button} >
                        <a href="http://localhost:8080/instructor/courses/addcourse" id={Styles.create_button}  role="button">
                            Create New Course
                        </a>
                    </div>
                </div>
                {courses.map((course, index)=>(
                                      <a href={`http://localhost:8080/instructor/${course.id}/updatecourse`} id={Styles.edit_button} role="button" key={index}>

                              <div className={Styles.course_list} >
                              <div className={`${Styles.course_card} ${Styles.hover_effect}`}>
                                <div className={Styles.text_hover}>Edit / manage course</div>
                                <div className={Styles.cover_hover}>
                                  <img src={course.thumbnail.url} alt="Course Image" style={{width: '20%', marginRight: '20px'}}/>
                                  <div className={Styles.card_content}>
                                      <h3>{course.title}</h3>
                                  </div>
                                  </div>
                              </div>
                              
                          </div>
                          </a>

                ))}
              
            </div>
        </>
    );
}
