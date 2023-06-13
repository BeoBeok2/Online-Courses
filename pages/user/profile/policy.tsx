import React, { useState } from 'react';
import Styles from '@/styles/policy.module.css';

interface Policies {
  policy1: boolean;
  policy2: boolean;
  policy3: boolean;
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
        <h2>Chính sách</h2>
        <div>
          <label>
            <input
              type="checkbox"
              checked={policies.policy1}
              onChange={() => handlePolicyChange('policy1')}
            />
            Chính sách 1
          </label>
        </div>
        <div>
          <label>
            <input
              type="checkbox"
              checked={policies.policy2}
              onChange={() => handlePolicyChange('policy2')}
            />
            Chính sách 2
          </label>
        </div>
        <div>
          <label>
            <input
              type="checkbox"
              checked={policies.policy3}
              onChange={() => handlePolicyChange('policy3')}
            />
            Chính sách 3
          </label>
        </div>
        <button onClick={handleFormSubmit} disabled={!Object.values(policies).every((value) => value)}>
          Submit
        </button>
        <button onClick={onClose}>Cancel</button>
      </div>

    </div>
  );
}
