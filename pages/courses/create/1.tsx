import React, { useState } from 'react';
import Styles from '@/styles/createcourses.module.css';
import router from 'next/router';

export default function CreateCourse() {
    const [step, setStep] = useState(1);


    const handleContinue = () => {
        if (step < 3) {
            setStep(step + 1);
        } else {
            // Call API to save the course
            console.log('Course saved!');
            router.push('http://localhost:8080/courses/create/addlesson');
        }
    };

    const handleBack = () => {
        setStep(step - 1);
    };

    return (
        <div className={Styles.container}>
            <div className={Styles.progress}>
                <div className={Styles.progressBar} style={{ width: `${(step / 3) * 100}%` }}></div>
            </div>
            <div className={Styles.content}>
                <h1 className={Styles.header}>Tạo khóa học</h1>
                {step === 1 && (
                    <div className={Styles.stepContent}>
                        <h2 className={Styles.stepTitle}>Bước 1/3</h2>
                        <p className={Styles.stepDescription}>Trước tiên, hãy tìm hiểu loại khóa học bạn đang tạo.</p>
                        <div className={Styles.buttonPanel}>
                            <div className={Styles.buttonOption}>
                                <input type="radio" name="course-type" id="course-type-course" value="course" checked />
                                <label htmlFor="course-type-course">
                                    <span className={Styles.icon}>
                                        <div  >
                                            <img src="../../../images/khoahoc.png" alt="courses" width={50} height={50} />
                                        </div>
                                    </span>
                                    <span className={Styles.optionLabel}>Khóa học</span>
                                </label>
                            </div>
                            <div className={Styles.buttonOption}>
                                <input type="radio" name="course-type" id="course-type-program" value="program" />
                                <label htmlFor="course-type-program">
                                    <span className={Styles.icon}>
                                        <div>
                                            <img src="../../images/chuongtrinh.png" alt="program" width={50} height={50} />
                                        </div>
                                    </span>
                                    <span className={Styles.optionLabel}>Chương trình</span>
                                </label>
                            </div>
                        </div>
                    </div>
                )}
                {step === 2 && (
                    <div className={Styles.stepContent}>
                        <h2 className={Styles.stepTitle}>Bước 2/3</h2>
                        <p className={Styles.stepDescription}>Nhập tiêu đề và mô tả cho khóa học của bạn.</p>
                        <div className={Styles.formGroup}>
                            <label htmlFor="courseTitle">Tiêu đề khóa học:</label>
                            <input type="text" id="courseTitle" required />
                        </div>
                        <div className={Styles.formGroup}>
                            <label htmlFor="courseDescription">Mô tả khóa học:</label>
                            <textarea id="courseDescription" required></textarea>
                        </div>
                        <p className={Styles.stepDescription}>Chọn danh mục cho khóa học của bạn.</p>
                        <div className={Styles.formGroup}>
                            <label htmlFor="courseCategory">Danh mục:</label>
                            <select id="courseCategory" required>
                                <option value="">Chọn danh mục</option>
                                <option value="category1">Danh mục 1</option>
                                <option value="category2">Danh mục 2</option>
                                <option value="category3">Danh mục 3</option>
                            </select>
                        </div>
                    </div>
                )}
                {step === 3 && (
                    <div className={Styles.stepContent}>
                        <h2 className={Styles.stepTitle}>Bước 3/3</h2>
                        <p className={Styles.stepDescription}>Thêm các bài học vào khóa học của bạn.</p>
                        {/* <button onClick={handleBack} className={Styles.backButton}>Trở lại</button> */}
                    </div>
                )}
                <div className={Styles.buttonPanel}>
                    {step > 1 && (
                        <button onClick={handleBack} className={Styles.backButton}>Trở lại</button>
                    )}
                    <button onClick={handleContinue} className={Styles.continueButton}>
                        {step < 3 ? 'Tiếp tục' : 'Thêm các bài học'}
                    </button>
                </div>
            </div>
        </div>
    );
}
