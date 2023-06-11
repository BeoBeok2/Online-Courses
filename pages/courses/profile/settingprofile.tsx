import React, { ChangeEvent, useState } from 'react';
import Styles from '@/styles/profile.module.css';
import Header from '../footer/header';
import Footer from '../footer/footer';
import Banner from '../banner';


export default function SettingProfile() {
  const [avatar, setAvatar] = useState<File | null>(null);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [showModal, setShowModal] = useState(false);

  const handleModalOpen = () => {
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
  };

  const handleAvatarChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target?.files?.[0];
    if (file) {
      setAvatar(file);
    }
  };

  const handleSaveChanges = () => {
    console.log('Data has been saved:', {
      avatar,
      firstName,
      lastName,
    });
  };

  return (
    <>
    <Header/>
    <Banner title='Thông tin cá nhân'/>
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
      <button onClick={handleSaveChanges} className={Styles.save_button}>
        Lưu thay đổi
      </button>
      <button onClick={handleModalOpen}>Nâng thành Instructor</button>
      {/* {showModal && <Modal onClose={handleModalClose} />} */}
    </div>
    <Footer/>
    </>
  );
}
