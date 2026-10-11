import { useState } from "react";
import './FormInput.css';

function FormInput() {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  function showPassword() {
    if (isPasswordVisible) {
      setIsPasswordVisible(false);
    } else {
      setIsPasswordVisible(true);
    }
  }

  return (
    <>
      <div>
        <input placeholder='Email' className="form-input" />
      </div>
      <div>
        <input type={isPasswordVisible ? 'text' : 'password'} placeholder='Password' className="form-input" />
        <button onClick={showPassword}>{isPasswordVisible ? 'Hide' : 'Show'}</button>
      </div>
    </>
  );
}

export default FormInput;