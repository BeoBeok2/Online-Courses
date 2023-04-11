import { SetStateAction, useState } from "react";
import Styles from '@/styles/register.module.css';
import PasswordStrengthIndicator from './PasswordStrengthIndicator';


const PasswordInput = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [password, setPassword] = useState("");

    const handleInputChange = (event: { target: { value: SetStateAction<string>; }; }) => {
        setPassword(event.target.value);
    };

    const handleToggleClick = () => {
        setShowPassword(!showPassword);
    };
    
    return (
        <>
            <div className={Styles.passwordwrap}>
                <input 
                    type={showPassword ? "text" : "password"}
                    id={Styles.pass1}
                    name='signup_password'
                    value={password}
                    placeholder='Nhập pass'
                    onChange={handleInputChange}
                    spellCheck="false" 
                    autoComplete='off' 
                    aria-autocomplete='list'
                    
                />
                <button onClick={handleToggleClick} className={Styles.button_hide_pass} >
                    {showPassword ? <img src="../../images/hide-pass.jpg" width="40px" alt="hidepass" /> : <img src="../../images/show-pass.jpg" width="40px" alt="pass" />}
                </button>
            </div>
            <div>
                {password && <PasswordStrengthIndicator password={password} />}
            </div>
        </>
      );
};
export default PasswordInput;