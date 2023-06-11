import Styles from '@/styles/listcourses.module.css';
import axios from 'axios';
import { useRouter } from 'next/router';
import { ReactElement, JSXElementConstructor, ReactFragment, ReactPortal, useState, useEffect } from 'react';

interface Course {
    id: string;
    title: string;
    description: string;
    // Thêm các trường dữ liệu khác của course nếu cần
  }
const Courses = ({ course }: { course: Course }) =>{ 
    /* const [courses, setCourses] = useState([]);
    let accessToken: string | null = null;
    let isMounted = true;
    if (typeof window !== 'undefined') {
        accessToken = sessionStorage.getItem('accessToken');
      }
    const router = useRouter();
    
    

      function callapi(){
            axios({

                method: 'GET',
                url: 'http://localhost:3000/courses?pageSize=4&page=1',
                
                headers: { Authorization: `Bearer ${accessToken}` },
                }).then(response => {
                    //console.log(response.data.courses);
                    console.log(1);
                    setCourses(response.data);
                    
                    
                }).catch(error => {
                    if (error.response && error.response.status === 401) {
                        alert(error.response.data.message + '. Xin vui lòng đăng nhập lại!')
                        console.log(error.response.data.message);
                        sessionStorage.removeItem('accessToken');
                        router.push('http://localhost:8080/courses/login');
                    }
                });
            console.log(courses);
    }
    useEffect(() => {
        if (isMounted) {
            console.log(3);
            callapi();
            
            isMounted = false;
        }
        
    },[]) */  
    return (
        <>
            <div>
            {/* {{Course.map((course) => (
                <div key={course.id}>
                <h2>{course.title}</h2>
                <p>{course.description}</p>
                <p>Level: {course.level}</p>
                <p>Language: {course.language}</p>
                <p>Price: {course.price}</p>
                </div>
            ))}} */}
            </div>

        </>
    )
}
export default Courses;