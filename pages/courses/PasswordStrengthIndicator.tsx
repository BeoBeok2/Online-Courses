import zxcvbn from 'zxcvbn';
import Styles from '@/styles/register.module.css';


type PasswordStrengthIndicatorProps = {
    password: string;
  };
  const PasswordStrengthIndicator = ({ password }: PasswordStrengthIndicatorProps) => {
  const testResult = zxcvbn(password);
  const strengthLabels = ['Rất yếu', 'Yếu', 'Tạm được', 'Mạnh', 'Rất mạnh'];
  const strengthColorClasses = ['text_red_500', 'text_orange_500', 'text_yellow_500', 'text_green_500', 'text_blue_500'];

  return (
    <div>
      <p id={`${Styles[strengthColorClasses[testResult.score]]}`}>{strengthLabels[testResult.score]}</p>
      <p id={Styles.checkpass2} className="text-xs text-gray-500">Mật khẩu của bạn: {testResult.feedback.warning || 'không có vấn đề gì'}</p>
    </div>
  );
};

export default PasswordStrengthIndicator;