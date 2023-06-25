import React, { ChangeEvent, useEffect, useState } from 'react';
import Styles from '@/styles/profile.module.css';
import Header from '../../components/footerheader/header';
import Footer from '../../components/footerheader/footer';
import Banner from '../../components/footerheader/banner';
import ModalPolicy from './policy';
import axios from 'axios';
import host from '@/pages/api/host';

export default function SettingProfile() {
  const [avatar, setAvatar] = useState<File | null>(null);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
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
        setPhoneNumber(data.phoneNumber);
        setAddress(data.address);
        // Assuming avatar object has 'url', 'width', and 'height' properties in the response
        setAvatar(data.avt.url);
      })
      .catch(error => {
        // Handle the error if needed
        console.log(error);
      });
  }, []);

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

  const handleAvatarChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target?.files?.[0];
    if (file) {
      setAvatar(file);
    }
  };

  const handleSaveChanges = () => {
    const formData = new FormData();
    formData.append('file', avatar || '');

    const accessToken = localStorage.getItem('accessToken');

    axios({
      method: 'PATCH',
      url: `${host}/user/avatar`,
      data: formData,
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': `Bearer ${accessToken}`,
      }
    })
      .then(response => {
        // Handle the response if needed
        console.log(response);
      })
      .catch(error => {
        // Handle the error if needed
        console.log(error);
      });
  };

  return (
    <>
      <Header />
      <Banner title='Thông tin cá nhân' />
      <div className={Styles.profile_container}>
        {/* Avatar section */}
        <div className={Styles.avatar_upload}>
          <div className={Styles.avatar_preview}>
            {avatar ? (
              <img src={URL.createObjectURL(avatar)} alt="Avatar" className={Styles.avatar_image} />
            ) : (
              <img src={avatar || '/default-avatar.png'} alt="User Avatar" className={Styles.avatar_image} />
            )}
          </div>
          <label htmlFor="avatar" className={Styles.avatar_change}>
            Chọn ảnh
          </label>
          <input
            type="file"
            id="avatar"
            accept="image/*"
            onChange={handleAvatarChange}
            className={Styles.avatar_input}
          />
        </div>

        {/* Profile fields */}
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
          <input type="text" id={Styles.website} value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
        </div>
        <div className={Styles.profile_field}>
          <label htmlFor="text">Address:</label>
          <input type="text" id={Styles.website} value={address} onChange={(e) => setAddress(e.target.value)} />
        </div>

        {/* Save Changes button */}
        <button onClick={handleSaveChanges} className={Styles.save_button}>
          Lưu thay đổi
        </button>

        {/* Nâng thành Instructor button */}
        <button onClick={handleModalOpen}>Nâng thành Instructor</button>

        {/* Modal Policy component */}
        {showModal && <ModalPolicy onClose={handleModalClose} onAgree={handleAgree} />}
      </div>
      <Footer />
    </>
  );
}
