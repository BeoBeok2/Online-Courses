import React, { ChangeEvent, useEffect, useState } from 'react';
import Styles from '@/styles/profile.module.css';
import Header from '../../components/footerheader/header';
import Footer from '../../components/footerheader/footer';
import Banner from '../../components/footerheader/banner';
import ModalPolicy from './policy';
import axios from 'axios';
import host from '@/pages/api/host';

export default function SettingProfile() {
  interface User {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    address: string;
    avatar: {
      height: string;
      url: string;
      width: string;
    };
    lastLogin: string;
  }

  const [avatar, setAvatar] = useState<File | null>(null);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [address, setAddress] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [userAvatarUrl, setUserAvatarUrl] = useState<string | null>(null);

  useEffect(() => {
    const userString = sessionStorage.getItem('user');
    if (userString) {
      const user: User = JSON.parse(userString);
      setUserAvatarUrl(user.avatar.url);
      setFirstName(user.firstName);
      setLastName(user.lastName);
      setPhoneNumber(user.phoneNumber);
      setAddress(user.address);
    }
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
    // Update the user data in sessionStorage
    const userString = sessionStorage.getItem('user');
    if (userString) {
      const user: User = JSON.parse(userString);
      user.firstName = firstName;
      user.lastName = lastName;
      user.phoneNumber = phoneNumber;
      user.address = address;
      sessionStorage.setItem('user', JSON.stringify(user));
    }

    // Create a new FormData object
    const formData = new FormData();
    formData.append('file', avatar || ''); // Append the avatar file to the form data

    // Get the access token from sessionStorage
    const accessToken = sessionStorage.getItem('accessToken');

    // Send the request to the server using axios
    axios({
      method: 'PATCH',
      url: `${host}/user/avatar`,
      data: formData,
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': `Bearer ${accessToken}`, // Include the access token in the headers
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
              <img src={userAvatarUrl || '/default-avatar.png'} alt="User Avatar" className={Styles.avatar_image} />
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
