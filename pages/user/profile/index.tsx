import React, { ChangeEvent, useEffect, useState } from 'react';
import Styles from '@/styles/profile.module.css';
import Header from '../../components/footerheader/header';
import Footer from '../../components/footerheader/footer';
import Banner from '../../components/footerheader/banner';
import ModalPolicy from './policy';


export default function SettingProfile() {
  interface User {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    address: string;
    avatar: string;
    lastLogin: string;
  }
  const [avatar, setAvatar] = useState<File | null>(null);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [address, setAddress] = useState('');
  const [showModal, setShowModal] = useState(false);

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
    // Cập nhật dữ liệu mới vào sessionStorage
    const userString = sessionStorage.getItem('user');
    if (userString) {
      const user: User = JSON.parse(userString);
      user.firstName = firstName;
      user.lastName = lastName;
      user.phoneNumber = phoneNumber;
      user.address = address;
      sessionStorage.setItem('user', JSON.stringify(user));
    }

    // In ra giá trị đã thay đổi
    console.log('Data has been saved:', {
      firstName,
      lastName,
      phoneNumber,
      address,
    });
  };
  useEffect(() => {
    const userString = sessionStorage.getItem('user');
    if (userString) {
      const user: User = JSON.parse(userString);
      setFirstName(user.firstName);
      setLastName(user.lastName);
      setPhoneNumber(user.phoneNumber);
      setAddress(user.address);
    }
  }, []);

  return (
    <>
      <Header />
      <Banner title='Thông tin cá nhân' />
      <div className={Styles.profile_container}>
        <div className={Styles.avatar_upload}>
          <div className={Styles.avatar_preview}>
            {avatar ? (
              <img src={URL.createObjectURL(avatar)} alt="Avatar" className={Styles.avatar_image} />
            ) : (
              <img src="/default-avatar.png" alt="Default Avatar" className={Styles.avatar_image} />
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
