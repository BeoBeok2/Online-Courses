import React, { useState } from 'react';
import axios from 'axios';
import Styles from '@/styles/policy.module.css';
import PayPalButton from '@/pages/components/instructor/PayPalButton';
import host from '@/pages/api/host';

interface Policies {
  policy1: boolean;
  policy2: boolean;
  policy3: boolean;
  policy4: boolean;
}

interface ModalProps {
  onClose: () => void;
  onAgree: () => void;
}

export default function ModalPolicy({ onClose, onAgree }: ModalProps) {
  const [policies, setPolicies] = useState<Policies>({
    policy1: false,
    policy2: false,
    policy3: false,
    policy4: false,
  });
  const [website, setWebsite] = useState('');
  const [linkedin, setLinkedIn] = useState('');
  const [youtube, setYoutube] = useState('');
  const [bio, setBio] = useState('');

  const handlePolicyChange = (policyName: keyof Policies) => {
    setPolicies((prevPolicies) => ({
      ...prevPolicies,
      [policyName]: !prevPolicies[policyName],
    }));
  };

  const handleFormSubmit = () => {
    const allChecked = Object.values(policies).every((value) => value === true);

    if (allChecked) {
      const accessToken = localStorage.getItem('accessToken'); // Lấy access token từ localStorage

      const data = {
        Website: website,
        Linkedin: `https://linkedin.com/${linkedin}`,
        Youtube: `https://youtube.com/${youtube}`,
        Bio: `https://bio.com/${bio}`,
      };
      console.log(data);
      axios({
        method: 'POST',
        url: `${host}/instructor/`,
        data: data,
        headers: {
          'Authorization': `Bearer ${accessToken}`,
        }
      })

        .then((response) => {
          // Xử lý phản hồi thành công từ API tại đây
          // Ví dụ: hiển thị thông báo thành công, chuyển hướng trang, cập nhật trạng thái, vv.
          console.log(response.data);
          alert("Bạn đã nâng thành công thành Instructor, hãy nhấn Ok để chuyển tới trang Instructor");
            
          window.location.href = "http://localhost:8080/instructor";
          onAgree(); // Gọi onAgree khi gọi API thành công
        })
        .catch((error) => {
          // Xử lý lỗi từ API tại đây
          // Ví dụ: hiển thị thông báo lỗi, ghi log, vv.
          console.error(error);
          if (error.response || error.response.status === 400 || error.response.data === "can not create instructor") {
            alert("Không thể tạo nâng cấp thành Instructor. Có thể bạn đã nâng lên Instructor rồi, hãy nhấn Ok để chuyển tới trang Instructor");
            
            window.location.href = "http://localhost:8080/instructor";
          }
        });
    } else {
      alert('Vui lòng đồng ý với tất cả các chính sách.');
    }
  };

  return (
    <>
      <div className={Styles.modal}>
        <div className={Styles.modal_content}>
          <h2>Chính sách và Điều khoản</h2>
          <div>
            <label>
              <input
                type="checkbox"
                checked={policies.policy1}
                onChange={() => handlePolicyChange('policy1')}
              />
              <strong>Không vi phạm bản quyền: </strong> Đảm bảo rằng bạn không đăng tải nội dung có bản quyền hoặc vi phạm quyền sở hữu trí tuệ của người khác. Sử dụng tài liệu được phép, trích dẫn nguồn gốc và tuân thủ các quy định về bản quyền.
            </label>
          </div>
          <div>
            <label>
              <input
                type="checkbox"
                checked={policies.policy2}
                onChange={() => handlePolicyChange('policy2')}
              />
              <strong>Thông tin chính xác và đáng tin cậy: </strong> Đảm bảo rằng thông tin trong bài đăng học tập của bạn là chính xác, đáng tin cậy và được dẫn chứng từ các nguồn uy tín. Hạn chế việc chia sẻ thông tin sai lệch hoặc không chính xác.
            </label>
          </div>
          <div>
            <label>
              <input
                type="checkbox"
                checked={policies.policy3}
                onChange={() => handlePolicyChange('policy3')}
              />
              <strong>Tuân thủ quy định về đạo đức nghề nghiệp: </strong> Đảm bảo rằng bài đăng học tập của bạn tuân thủ các quy định và chuẩn mực đạo đức nghề nghiệp của lĩnh vực hoặc ngành học tập mà bạn đang tham gia.
            </label>
          </div>
          <div>
            <label>
              <input
                type="checkbox"
                checked={policies.policy4}
                onChange={() => handlePolicyChange('policy4')}
              />
              <strong>Tiện ích cần sở hữu: </strong> Đảm bảo rằng bạn phải có tài khoản PayPal và đăng nhập được. Nếu có thì hãy vui lòng chọn đầy đủ các điều khoản.
            </label>
          </div>
          <div className={Styles.form_profile}>
            <h2>Những thông tin cần thiết</h2>
          </div>

          <div >
            <div className={Styles.profile_field}>
              <label htmlFor="website">Trang web:</label>
              <input type="text" id={Styles.website} className={Styles.website} value={website} onChange={(e) => setWebsite(e.target.value)} />
            </div>
            
            <div className={Styles.profile_field}>
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
          </div>
          <button onClick={handleFormSubmit} disabled={!Object.values(policies).every((value) => value)}>
            Chấp nhận
          </button>
          <button onClick={onClose}>Cancel</button>
        </div>
      </div>
    </>
  );
}
