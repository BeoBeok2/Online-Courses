import React, { useState } from 'react';
import Styles from '@/styles/coursemanagement.module.css';
import router from 'next/router';
import SideNav from '@/pages/components/instructor/sidenav';
import Link from 'next/link';
export default function CourseManagement() {



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
                <div className={Styles.course_list}>
                    <div className={`${Styles.course_card} ${Styles.hover_effect}`}>
                        <img src="course1.jpg" alt="Course Image" />
                        <div className={Styles.card_content}>
                            <h3>Course Title</h3>
                            <p>Course Description</p>
                            <p className={Styles.completion}>Completion: 80%</p>
                        </div>
                        <button className={Styles.edit_button}>
                            <a href="http://localhost:8080/instructor/ct1/updatecourse" id={Styles.edit_button} role="button">
                                Edit
                            </a>
                        </button>
                    </div>
                    <div className={`${Styles.course_card} ${Styles.hover_effect}`}>
                        <img src="course1.jpg" alt="Course Image" />
                        <div className={Styles.card_content}>
                            <h3>Course Title</h3>
                            <p>Course Description</p>
                            <p className={Styles.completion}>Completion: 80%</p>
                        </div>
                        <button className={Styles.edit_button}>
                            <a href="http://localhost:8080/instructor/ct1/updatecourse" id={Styles.edit_button} role="button">
                                Edit
                            </a>
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}
