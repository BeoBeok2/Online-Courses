import React, { useState } from 'react';
import Styles from '@/styles/policy.module.css';

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

  const handlePolicyChange = (policyName: keyof Policies) => {
    setPolicies((prevPolicies) => ({
      ...prevPolicies,
      [policyName]: !prevPolicies[policyName],
    }));
  };

  const handleFormSubmit = () => {
    const allChecked = Object.values(policies).every((value) => value === true);

    if (allChecked) {
      onAgree(); // Call onAgree when all conditions are met
    } else {
      alert('Vui lòng đồng ý với tất cả các chính sách.');
    }
  };

  return (
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
        <button onClick={handleFormSubmit} disabled={!Object.values(policies).every((value) => value)}>
          Chấp nhận
        </button>
        <button onClick={onClose}>Cancel</button>
      </div>

    </div>
  );
}
