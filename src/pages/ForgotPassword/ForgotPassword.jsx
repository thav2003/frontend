import React, { useState } from 'react';
import './ForgotPassword.scss';
import { ResetPasswordLinkAPI } from '../../api/apis';
const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [isSent, setIsSent] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    // Gửi yêu cầu đặt lại mật khẩu đến email người dùng
    ResetPasswordLinkAPI({email:email})
      .then((res)=>{
        console.log(res)
        setIsSent(true)
      })
      .catch(e=>console.log(e));
  };

  const handleInputChange = (event) => {
    setEmail(event.target.value);
  };

  return (
    <div className='forgotPasswordPage'>

   
        <div className="forgot-password-container">
        <h2>Quên mật khẩu?</h2>
        <p>Nhập email của bạn để đặt lại mật khẩu.</p>

        {isSent ? (
            <p className="success-message">
            Hệ thống đã gửi email hướng dẫn đặt lại mật khẩu đến địa chỉ email của bạn. Vui lòng kiểm tra email và làm theo hướng dẫn.
            </p>
        ) : (
            <form onSubmit={handleSubmit}>
            <div className="form-group">
                <label htmlFor="email">Email:</label>
                <input
                type="email"
                className="form-control"
                id="email"
                name="email"
                value={email}
                onChange={handleInputChange}
                required
                />
            </div>
            <button type="submit" className="btn btn-primary">
                Gửi yêu cầu đặt lại mật khẩu
            </button>
            </form>
        )}
        </div>
    </div>
  );
};

export default ForgotPassword;