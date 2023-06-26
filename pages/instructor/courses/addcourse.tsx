import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Styles from '@/styles/createcourses.module.css';

import router from 'next/router';
import host from '@/pages/api/host';

interface Category {
  id: string;
  name: string;
  subcategories?: Subcategory[];
}

interface Subcategory {
  id: string;
  name: string;
  categoryId: string;
}

export default function CreateCourse() {
  const [step, setStep] = useState(1);
  const [tenKhoaHoc, setTenKhoaHoc] = useState('');
  const [moTa, setMoTa] = useState('');
  const [theLoai, setTheLoai] = useState('');
  const [idtheloai, setIdTheLoai] = useState('');
  const [cate, setCate] = useState<Category[]>([]);

  useEffect(() => {
    axios
      .get(`${host}/categories`)
      .then((response) => {
        const categories = response.data.categories as Category[];
        setCate(categories);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const accessToken =
    typeof window !== 'undefined' ? localStorage.getItem('accessToken') : null;
  const headers = {
    Authorization: `Bearer ${accessToken}`,
  };

  const handleContinue = () => {
    if (step < 3) {
      setStep(step + 1);
    } else {
      const data = {
        title: tenKhoaHoc,
        SubCategoryId: idtheloai,
      };

      axios
        .post(`${host}/courses`, data, { headers })
        .then((response) => {
            console.log(response);
          console.log('Course saved!');
          console.log('Data has been saved:', data);
          alert("Bạn đã tạo thành công khóa học. Hãy nhấn ok để chuyển tới trang danh sách khóa học của bạn!");
          router.push("http://localhost:8080/instructor/courses");
        })
        .catch((error) => {
          console.log(error);
          // router.push('http://localhost:8080/components/error');
        });
    }
  };

  const handleBack = () => {
    setStep(step - 1);
  };

  return (
    <div className={Styles.container}>
      <div className={Styles.progress}>
        <div
          className={Styles.progressBar}
          style={{ width: `${(step / 3) * 100}%` }}
        ></div>
      </div>
      <div className={Styles.content}>
        <h1 className={Styles.header}>Tạo khóa học</h1>
        {step === 1 && (
          <div className={Styles.stepContent}>
            <h2 className={Styles.stepTitle}>Bước 1/3</h2>
            <p className={Styles.stepDescription}>
              Nhập tiêu đề cho khóa học của bạn.
            </p>
            <div className={Styles.formGroup}>
              <label htmlFor="courseTitle">Tiêu đề khóa học:</label>
              <input
                type="text"
                id="courseTitle"
                value={tenKhoaHoc}
                onChange={(e) => setTenKhoaHoc(e.target.value)}
                required
              />
            </div>
          </div>
        )}
        {step === 2 && (
          <div className={Styles.stepContent}>
            <h2 className={Styles.stepTitle}>Bước 2/3</h2>
            <p className={Styles.stepDescription}>
              Nhập mô tả cho khóa học của bạn.
            </p>
            <div className={Styles.formGroup}>
              <label htmlFor="courseDescription">Mô tả khóa học:</label>
              <textarea
                id="courseDescription"
                value={moTa}
                onChange={(e) => setMoTa(e.target.value)}
                required
              ></textarea>
            </div>
          </div>
        )}
        {step === 3 && (
          <div className={Styles.stepContent}>
            <h2 className={Styles.stepTitle}>Bước 3/3</h2>
            <p className={Styles.stepDescription}>
              Chọn thể loại cho khóa học của bạn.
            </p>
            <div className={Styles.formGroup}>
              <label htmlFor="courseCategory">Danh mục:</label>
              <select
                id="courseCategory"
                value={theLoai}
                onChange={(e) => {
                  setTheLoai(e.target.value);
                  setIdTheLoai(e.target.selectedOptions[0].id);
                }}
                required
              >
                <option value="">Thể loại:</option>
                {cate.map((category) => (
                  <optgroup key={category.id} label={category.name}>
                    {category.subcategories?.map((subcategory) => (
                      <option
                        key={subcategory.id}
                        value={subcategory.id}
                        id={subcategory.id}
                      >
                        {subcategory.name}
                      </option>
                    ))}
                  </optgroup>
                ))}
              </select>
            </div>
          </div>
        )}
        <div className={Styles.buttonPanel}>
          {step > 1 && (
            <button onClick={handleBack} className={Styles.backButton}>
              Trở lại
            </button>
          )}
          <button onClick={handleContinue} className={Styles.continueButton}>
            {step < 3 ? 'Tiếp tục' : 'Thêm các bài học'}
          </button>
        </div>
      </div>
    </div>
  );
}
