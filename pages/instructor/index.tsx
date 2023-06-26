import React, { ChangeEvent, useEffect, useState } from 'react';
import axios from 'axios';
import Styles from '@/styles/profile.module.css';
import Header from '../components/footerheader/header';
import Banner from '../components/footerheader/banner';
import Footer from '../components/footerheader/footer';
import SideNav from '../components/instructor/sidenav';
import { FaCog, FaUser } from 'react-icons/fa';
import host from '../api/host';

export default function ProfilePage() {
  const [avatar, setAvatar] = useState<string | null>(null);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [website, setWebsite] = useState('');
  const [linkedin, setLinkedIn] = useState('');
  const [youtube, setYoutube] = useState('');
  const [bio, setBio] = useState('');
  const [showMenu, setShowMenu] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);



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

  // const handleSaveChanges = () => {
  //   console.log('Dữ liệu đã được lưu:', {
  //     avatar,
  //     firstName,
  //     lastName,
  //     phone,
  //     address,
  //     website,
  //     linkedin,
  //     youtube,
  //     bio
  //   });
  // };


  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const handleLogout = () => {
    setLoggedIn(false);
  };
  function callRefreshToken() {
    const refreshToken = localStorage.getItem('refreshToken');
    if (refreshToken) {
      axios({
        method: 'GET',
        url: `${host}/auth/token`,
        headers: { Authorization: `Bearer ${refreshToken}` },
      })
        .then((response) => {
          const accessToken = response.data.accessToken;
          localStorage.setItem('accessToken', accessToken);
        })
        .catch((error) => {
          console.error('Lỗi khi làm mới AccessToken:', error);
        });
    } else {
      console.error('Không tìm thấy refreshToken');
    }
  }

  useEffect(() => {
    callRefreshToken();
  }, []);
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

    axios({
      method: 'GET',
      url: `${host}/instructor/profile`,
      headers: {
        'Authorization': `Bearer ${accessToken}`,
      }
    })
      .then(response => {
        const { data } = response;
        setWebsite(data.website);
        setLinkedIn(data.linkedin.split('.com/')[1]);
        setYoutube(data.youtube.split('.com/')[1]);
        setBio(data.bio.split('.com/')[1]);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);


  // const refreshToken = async () => {

  //   try {
  //     const refreshToken = localStorage.getItem('refreshToken');
  //     const response = await axios.get(`${$host}/auth/token`, {
  //       headers: {
  //         Authorization: `Bearer ${refreshToken}`
  //       }
  //     });
  //     const { accessToken } = response.data;

  //     localStorage.setItem('accessToken', accessToken);
  //   } catch (error) {
  //     console.error('Lỗi khi làm mới AccessToken:', error);
  //   }
  // };
  // const handleSaveChanges = () => {
  //   const updateUserData = {
  //     firstName: firstName,
  //     lastName: lastName,
  //     phoneNumber: phone,
  //     address: address,
  //   };

  //   const instructorData = {
  //     Website: website,
  //     Linkedin: `https://linkedin.com/${linkedin}`,
  //     Youtube: `https://youtube.com/${youtube}`,
  //     Bio: `https://bio.com/${bio}`,
  //   };

  //   const accessToken = localStorage.getItem('accessToken');

  //   axios.all([
  //     axios.put(`${host}/user`, updateUserData, {
  //       headers: {
  //         'Content-Type': 'application/json',
  //         'Authorization': `Bearer ${accessToken}`,
  //       }
  //     }),
  //     axios.post(`${host}/instructor`, instructorData, {
  //       headers: {
  //         'Authorization': `Bearer ${accessToken}`,
  //       }
  //     })
  //   ])
  //     .then(axios.spread((userResponse, instructorResponse) => {
  //       console.log(userResponse);
  //       console.log(instructorResponse);
  //       location.reload();
  //     }))
  //     .catch(error => {
  //       console.log(error);
  //     });
  // };
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
      {/* <Header/>
    <Banner title='Profile' /> */}
      <div>
        <SideNav />
        <div className={Styles.settingsMenu}>
          <h1 className={Styles.title_settingsMenu}>
            Hồ sơ
            <div className={Styles.avatar_container}>
              {avatar ? (
                <img src={avatar} alt="Avatar" className={Styles.avatar} />
              ) : (
                <img src={avatar || '../../images/default-avatar.jpg'} alt="User Avatar" className={Styles.avatar} />
              )}

              <div className={Styles.menu}>
                <a href="http://localhost:8080/user/profile">Thông tin cá nhân</a>
                <a href="http://localhost:8080/instructor">Instructor</a>
                <a href="http://localhost:8080/cart">Cart</a>
                <a href="" onClick={handleLogout}>Logout</a>
              </div>
            </div>
          </h1>
        </div>
        <div className={Styles.profile_container}>
          <div className={Styles.avatar_upload}>
            <div className={Styles.avatar_preview}>
              {avatar ? (
                <img src={avatar} alt="Avatar" className={Styles.avatar_image} />
              ) : (
                <img src={avatar || '../../images/default-avatar.jpg'} alt="User Avatar" className={Styles.avatar_image} />
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
          </div>

          <div className={Styles.profile_field}>
            <label htmlFor="title">Phone:</label>
            <input type="number" id={Styles.title} style={{ width: '50%', padding: '10px', border: '1px solid #ccc', appearance: 'none' }} value={phone} onChange={(e) => setPhone(e.target.value)} />
          </div>

          <div className={Styles.profile_field}>
            <label htmlFor="language">Địa chỉ:</label>
            <input type="text" id={Styles.title} value={address} onChange={(e) => setAddress(e.target.value)} />
          </div>
          <div className={Styles.profile_field}>
            <label htmlFor="website">Trang web:</label>
            <input type="text" id={Styles.website} value={website} onChange={(e) => setWebsite(e.target.value)} />
          </div>

          <div className={Styles.profile_field}>
            <label htmlFor="linkedin">LinkedIn:</label>
            <div className={Styles.input_with_addons}>
              <input
                type="text"
                value="https://linkedin.com/"
                disabled
                className={Styles.link_prefix}
              />
              <input
                type="text"
                id={Styles.linkedin}
                value={linkedin}
                onChange={(e) => setLinkedIn(e.target.value)}
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

          <div className={Styles.profile_field}>
            <label htmlFor="bio">Bio:</label>
            <div className={Styles.input_with_addons}>
              <input
                type="text"
                value="https://bio.com/"
                disabled
                className={Styles.link_prefix}
              />
              <input
                type="text"
                id={Styles.bio}
                value={bio}
                onChange={(e) => setBio(e.target.value)}
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
