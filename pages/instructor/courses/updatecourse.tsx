import React, { useState } from 'react';
import Styles from '@/styles/createcourses.module.css';
import router from 'next/router';
interface TheLoai {
    id: string;
    ten: string;
}
export default function CreateCourse() {

    const [step, setStep] = useState(1);
    const [tenKhoaHoc, setTenKhoaHoc] = useState('');
    const [moTa, setMoTa] = useState('');
    const [theLoai, setTheLoai] = useState('');
    const cate: TheLoai[] = [
        { id: 'ct1', ten: 'Kinh Doanh' },
        { id: 'BT2', ten: 'Mua Bán' },
        { id: 'ck3', ten: 'Buôn Lậu' }
    ];

    const handleContinue = () => {
        if (step < 3) {
            setStep(step + 1);
        } else {
            // Call API to save the course
            window.location.href = 'http://localhost:8080/instructor/id/addlesson';
            console.log('Course saved!');
            console.log('Data has been saved:', {
                tenKhoaHoc,
                moTa,
                theLoai,
            });
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
                            <input type="text" id="courseTitle" value={tenKhoaHoc} onChange={(e) => setTenKhoaHoc(e.target.value)} required />
                        </div>
                        <div className={Styles.formGroup}>
                            <label htmlFor="courseDescription">Mô tả khóa học:</label>
                            <textarea id="courseDescription" value={moTa} onChange={(e) => setMoTa(e.target.value)} required></textarea>
                        </div>
                        <p className={Styles.stepDescription}>Chọn danh mục cho khóa học của bạn.</p>
                        <div className={Styles.formGroup}>
                            <label htmlFor="courseCategory">Danh mục:</label>
                            <select
                                id="courseCategory"
                                value={theLoai}
                                onChange={(e) => setTheLoai(e.target.value)}
                                required
                            >
                                <option value="">Thể loại:</option>
                                {cate.map((cate) => (
                                    <option key={cate.id} value={cate.ten}>
                                        {cate.ten}
                                    </option>
                                ))}
                            </select>

                        </div>
                    </div>
                )}
                {step === 3 && (
                    <div className={Styles.stepContent}>
                        <h2 className={Styles.stepTitle}>Bước 3/3</h2>
                        <p id={Styles.stepDescription1} className={Styles.stepDescription}>Hãy thêm các bài học vào khóa học của bạn.</p>
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
