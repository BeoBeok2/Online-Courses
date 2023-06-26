import host from '@/pages/api/host';
import axios from 'axios';
import Head from 'next/head';
import React, { ChangeEvent, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
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

interface Price {
  id: string;
  value: string;
  currency: string;
}

const EditCoursePage = () => {
  const { id } = useParams(); // Assuming you have defined the route parameter for the course ID
  const [theLoai, setTheLoai] = useState('');
  const [idtheloai, setIdTheLoai] = useState('');
  const [cate, setCate] = useState<Category[]>([]);
  const [prices, setPrices] = useState<Price[]>([]); // State to store the prices
  const [loading, setLoading] = useState(false); // State to track loading state
  const [error, setError] = useState('');
  const [thumbnailUrl, setThumbnailUrl] = useState<string | null>(null);

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

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken'); // Get the access token from local storage

    setLoading(true);
    setError('');

    axios
      .get(`${host}/courses/prices`, {
        headers: {
          Authorization: `Bearer ${accessToken}`, // Include the access token in the request headers
        },
      })
      .then((response) => {
        const pricesData = response.data.prices as Price[];
        setPrices(pricesData);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setError('Error loading prices.');
        setLoading(false);
      });
  }, []);

  const [course, setCourse] = useState({
    id: id,
    title: '',
    description: '',
    level: 'All level',
    language: 'en',
    price: '',
    thumbnail: {
      url: thumbnailUrl,
      width: '250px',
      height: '250px',
    },
    SubCategory_id: '',
  });
  const handleUploadAvatar = (file: File) => {
    const formData = new FormData();
    formData.append('file', file);

    const accessToken = localStorage.getItem('accessToken');

    axios({
      method: 'POST',
      url: `${host}/file/asset`,
      data: formData,
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': `Bearer ${accessToken}`,
      },
    })
      .then(response => {
        const data = response;
        setThumbnailUrl(data.data.url);
        console.log(123123);
        console.log(response);
        console.log(thumbnailUrl);

      })
      .catch(error => {
        console.log(error);
      });
  };

  const handleAvatarChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    console.log(file);
    if (file) {
      handleUploadAvatar(file);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setCourse((prevCourse) => ({
      ...prevCourse,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    const updateCourse = {
      id: course.id,
      title: course.title,
      description: course.description,
      level: course.level,
      language: course.language,
      price: course.price,
      thumbnail: {
        url: thumbnailUrl,
        width: '250px',
        height: '250px',
      },
      SubCategory_id: idtheloai,
    };
    console.log(updateCourse);
    const accessToken = localStorage.getItem('accessToken');

    axios({
      method: 'POST',
      url: `${host}/courses`,
      data: updateCourse,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`,
      }
    })
      .then(response => {
        console.log(response);

      })
      .catch(error => {
        console.log(error);
      });
  };

  return (
    <>
      <Head>
        <link
          rel="stylesheet"
          href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css"

        />
      </Head>
      <div className="container">
        <h1>Edit Course</h1>
        <form>
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              className="form-control"
              id="title"
              name="title"
              value={course.title}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              className="form-control"
              id="description"
              name="description"
              value={course.description}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="level">Level</label>
            <input
              type="text"
              className="form-control"
              id="level"
              name="level"
              value={course.level}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="language">Language</label>
            <input
              type="text"
              className="form-control"
              id="language"
              name="language"
              value={course.language}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="price">Price</label>
            {loading ? (
              <p>Loading prices...</p>
            ) : error ? (
              <p>{error}</p>
            ) : (
              <select
                id="price"
                name="price"
                className="form-control"
                value={course.price}
                onChange={handleChange}
              >
                <option value="">Select a price:</option>
                {prices.map((price) => (
                  <option key={price.id} value={price.value}>
                    {price.value} {price.currency}
                  </option>
                ))}
              </select>
            )}
          </div>

          <div >
            <label htmlFor="language">Thumbnail</label>
            <div>
              {thumbnailUrl ? (
                <img width={course.thumbnail.width} height={course.thumbnail.height} src={thumbnailUrl} alt="Avatar" />
              ) : (
                <img width={course.thumbnail.width} height={course.thumbnail.height} src={thumbnailUrl || '../../../images/default-avatar.jpg'} alt="User Avatar" />
              )}
            </div>
            <label htmlFor="thumbnailUrl" >
              Chọn ảnh
            </label>
            <input
              type="file"
              id="thumbnailUrl"
              onChange={handleAvatarChange}
              name="thumbnailUrl"
            />
          </div>

          <div className="form-group">
            <label htmlFor="courseCategory">Danh mục:</label>
            <select
              id="courseCategory"
              value={theLoai}
              onChange={(e) => {
                setTheLoai(e.target.value);
                setIdTheLoai(e.target.selectedOptions[0].id);
              }}
              className="form-select"
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
          <button type="button" className="btn btn-primary" onClick={handleSubmit}>
            Save
          </button>
        </form>
      </div>
    </>
  );
};

export default EditCoursePage;