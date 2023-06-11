import React, { ChangeEvent, useState } from 'react';
import Styles from '@/styles/profile.module.css';
import Header from '../footer/header';
import Banner from '../banner';
import Footer from '../footer/footer';
import SideNav from './sidenav';
import { FaCog, FaUser } from 'react-icons/fa';

export default function ProfilePage() {
  const [avatar, setAvatar] = useState<File | null>(null);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [title, setTitle] = useState('');
  const [bio, setBio] = useState('');
  const [language, setLanguage] = useState('');
  const [website, setWebsite] = useState('');
  const [twitter, setTwitter] = useState('');
  const [facebook, setFacebook] = useState('');
  const [youtube, setYoutube] = useState('');
  const [showMenu, setShowMenu] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);

  const handleAvatarChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target?.files?.[0];
    if (file) {
      setAvatar(file);
    }
  };

  const handleSaveChanges = () => {
    console.log('Dữ liệu đã được lưu:', {
      avatar,
      firstName,
      lastName,
      title,
      bio,
      language,
      website,
      twitter,
      facebook,
      youtube
    });
  };
  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };
  const handleLogout = () => {
    // setUserEmail('');
    setLoggedIn(false);
  };
  return (
    <>
      {/* <Header/>
    <Banner title='Profile' /> */}
      <div>

        <SideNav />
        <div className={Styles.settingsMenu}>
          <h1 className={Styles.title_settingsMenu}>Hồ sơ
            <a href="#" className={Styles.icon_settingsMenu} onClick={toggleMenu}>
              <FaCog />
              {showMenu && (
                <div className={Styles.menu}>
                  {/* Các mục trong menu */}
                  <ul>
                    <li><a href="http://localhost:8080/courses/profile/settingprofile">Học viên</a></li>
                    <li>Menu Item 2</li>
                    <li>
                      <a
                        className="fa fa-user-times"
                        href="/logout"
                        onClick={handleLogout}
                      >
                        Logout
                      </a>
                    </li>
                  </ul>
                </div>
              )}
            </a>
          </h1>
        </div>
        <div className={Styles.profile_container}>

          <div className={Styles.avatar_upload}>
            <div className={Styles.avatar_preview}>
              {avatar ? (
                <img src={URL.createObjectURL(avatar)} alt="Avatar" className={Styles.avatar_image} />
              ) : (
                <img src="/default-avatar.png" alt="Default Avatar" className={Styles.avatar_image} />
              )}
            </div>
            <label htmlFor="avatar" className={Styles.avatar_change}>Chọn ảnh</label>
            <input type="file" id={Styles.avatar} accept="image/*" onChange={handleAvatarChange} className={Styles.avatar_input} />
          </div>
          <div className={Styles.profile_field}>
            <div className={Styles.name_fields}>
              <div className={Styles.first_name_field}>
                <label htmlFor="first_name">First Name:</label>
                <input type="text" id={Styles.first_name} value={firstName} onChange={(e) => setFirstName(e.target.value)} />
              </div>
              <div className={Styles.last_name_field}>
                <label htmlFor="last_name">Last Name:</label>
                <input type="text" id={Styles.last_name} value={lastName} onChange={(e) => setLastName(e.target.value)} />
              </div>
            </div>
            {/* <div className={Styles.right_content}>
              <div className={Styles.right_text}>
                <p>Đây là một đoạn văn bản bên phải</p>
                <p>Đây là đoạn văn bản khác</p>
                <p>Thêm nhiều đoạn văn bản khác</p>
              </div>
            </div> */}
          </div>

          <div className={Styles.profile_field}>
            <label htmlFor="title">Đầu đề:</label>
            <input type="text" id={Styles.title} value={title} onChange={(e) => setTitle(e.target.value)} />
          </div>
          <div className={Styles.profile_field} id={Styles.profile_field1}>
            <label htmlFor="bio">Tiểu sử:</label>
            <textarea id="bio" value={bio} onChange={(e) => setBio(e.target.value)} />
            {/* <div className={Styles.right_content1}>
              <div className={Styles.right_text}>
                <p>Đây là một đoạn văn bản bên phải</p>
                <p>Đây là đoạn văn bản khác</p>
                <p>Thêm nhiều đoạn văn bản khác</p>
              </div>
            </div> */}
          </div>

          <div className={Styles.profile_field}>
            <label htmlFor="language">Ngôn ngữ:</label>
            <select id={Styles.language} value={language} onChange={(e) => setLanguage(e.target.value)}>
              <option value="English">English</option>
              <option value="Vietnamese">Vietnamese</option>
            </select>
          </div>
          <div className={Styles.profile_field}>
            <label htmlFor="website">Trang web:</label>
            <input type="text" id={Styles.website} value={website} onChange={(e) => setWebsite(e.target.value)} />
          </div>

          <div className={Styles.profile_field}>
            <label htmlFor="twitter">Twitter:</label>
            <div className={Styles.input_with_addons}>
              <input
                type="text"
                value="https://twitter.com/"
                disabled
                className={Styles.link_prefix}
              />
              <input
                type="text"
                id={Styles.twitter}
                value={twitter}
                onChange={(e) => setTwitter(e.target.value)}
              />
            </div>
          </div>

          <div className={Styles.profile_field}>
            <label htmlFor="facebook">Facebook:</label>
            <div className={Styles.input_with_addons}>
              <input
                type="text"
                value="https://facebook.com/"
                disabled
                className={Styles.link_prefix}
              />
              <input
                type="text"
                id={Styles.facebook}
                value={facebook}
                onChange={(e) => setFacebook(e.target.value)}
              />
            </div>
          </div>

          <div className={Styles.profile_field}>
            <label htmlFor="youtube">YouTube:</label>
            <div className={Styles.input_with_addons}>
              <input
                type="text"
                value="https://youtube.com/"
                disabled
                className={Styles.link_prefix}
              />
              <input
                type="text"
                id={Styles.youtube}
                value={youtube}
                onChange={(e) => setYoutube(e.target.value)}
              />
            </div>
          </div>


          <button onClick={handleSaveChanges} className={Styles.save_button}>Lưu thay đổi</button>
        </div>
      </div>
      {/* <Footer/> */}
    </>

  );
}

