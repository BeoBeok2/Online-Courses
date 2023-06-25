import React, { ChangeEvent, useEffect, useState } from 'react';
import Styles from '@/styles/profile.module.css';
import Header from '../../components/footerheader/header';
import Footer from '../../components/footerheader/footer';
import Banner from '../../components/footerheader/banner';
import ModalPolicy from './policy';
import axios from 'axios';
import host from '@/pages/api/host';

export default function SettingProfile() {
  const [avatar, setAvatar] = useState<string | null>(null);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    axios({
      method: 'GET',
      url: `${host}/user/profile`,
      headers: {
        'Authorization': `Bearer ${accessToken}`,
      }
    })
      .then(response => {
        const { data } = response;
        setFirstName(data.firstName);
        setLastName(data.lastName);
        setPhone(data.phoneNumber);
        setAddress(data.address);
        setAvatar(data.avt.url);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  const handleUploadAvatar = (file: File) => {
    const formData = new FormData();
    formData.append('file', file);

    const accessToken = localStorage.getItem('accessToken');

    axios({
      method: 'PATCH',
      url: `${host}/user/avatar`,
      data: formData,
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': `Bearer ${accessToken}`,
      },
    })
      .then(response => {
        const { data } = response;
        setAvatar(data.url);
        console.log(123123);
        location.reload();
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

  const handleModalOpen = () => {
    setShowModal(true);
    console.log(1);
  };

  const handleModalClose = () => {
    setShowModal(false);
  };

  const handleAgree = () => {
    // Perform any additional actions upon agreement
    // Enable the necessary functionality for becoming an Instructor
  };

  const handleSaveChanges = () => {
    const data = {
      firstName: firstName,
      lastName: lastName,
      phoneNumber: phone,
      address: address,
    };

    const accessToken = localStorage.getItem('accessToken');

    axios({
      method: 'PUT',
      url: `${host}/user`,
      data: data,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`,
      }
    })
      .then(response => {
        console.log(response);
        location.reload();
      })
      .catch(error => {
        console.log(error);
      });
  };

  return (
    <>
      <Header />
      <Banner title='Thông tin cá nhân' />
      <div className={Styles.profile_container}>
        <div className={Styles.avatar_upload}>
          <div className={Styles.avatar_preview}>
            {avatar ? (
              <img src={avatar} alt="Avatar" className={Styles.avatar_image} />
            ) : (
              <img src={avatar || '../../images/default-avatar.jpg'} alt="User Avatar" className={Styles.avatar_image} />
            )}
          </div>
          <label htmlFor="avatar" className={Styles.avatar_change}>
            Chọn ảnh
          </label>
          <input
            type="file"
            id="avatar"
            
            className={Styles.avatar_input}
            onChange={handleAvatarChange}
            name="avatar"
          />
        </div>

        <div className={Styles.profile_field}>
          <div className={Styles.name_fields}>
            <div className={Styles.first_name_field}>
              <label htmlFor="first_name">First Name:</label>
              <input
                type="text"
                id="first_name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>
            <div className={Styles.last_name_field}>
              <label htmlFor="last_name">Last Name:</label>
              <input
                type="text"
                id="last_name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
          </div>
        </div>
        <div className={Styles.profile_field}>
          <label htmlFor="number">Phone:</label>
          <input type="text" id={Styles.website} value={phone} onChange={(e) => setPhone(e.target.value)} />
        </div>
        <div className={Styles.profile_field}>
          <label htmlFor="text">Address:</label>
          <input type="text" id={Styles.website} value={address} onChange={(e) => setAddress(e.target.value)} />
        </div>

        <button onClick={handleSaveChanges} className={Styles.save_button}>
          Lưu thay đổi
        </button>

        <button onClick={handleModalOpen}>Nâng thành Instructor</button>

        {showModal && <ModalPolicy onClose={handleModalClose} onAgree={handleAgree} />}
      </div>
      <Footer />
    </>
  );
}
