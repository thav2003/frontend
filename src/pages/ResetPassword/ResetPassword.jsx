import React,{useState} from 'react';
import './ResetPassword.scss';
import { useSearchParams,useNavigate } from 'react-router-dom';
import ErrorPage from '../Error/Error';
import { useFormik } from 'formik';
import { ResetPasswordAPI } from '../../api/apis';
import { toast } from "react-toastify";
const ResetPassword = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const token = searchParams.get('token');

    const handleReset = (values) => {
      // TODO: Gửi mật khẩu mới và xác nhận mật khẩu đến server để thay đổi mật khẩu
      const payload={
        token:token,
        password:values.password,
        confirmPassword:values.confirmPassword
      }
      console.log(payload)
      ResetPasswordAPI(payload)
        .then((res)=>{
            console.log(res)
            toast.success('Đã thay đổi password thành công', {
                position: toast.POSITION.BOTTOM_RIGHT,
            })
            navigate('/login');
        })
        .catch(e=>console.log(e))
    };

    const formik = useFormik({
		initialValues: {
			password: '',
			confirmPassword: '',
		},
        validate: (values) => {
			const errors = {};
            if (values.password.length < 6 || values.password.length > 18) {
				errors.password = 'Mật khẩu từ 6 đến 18 kí tự';
			}
            if (values.password !== values.confirmPassword) {
                errors.confirmPassword = "Mật khẩu không khớp";
              }
			return errors;
		},
		onSubmit: (values) => {
			handleReset(values);
		},
	});

    if(!token || token.length < 80){
        return <ErrorPage errorMessage={"Something wrong !!!"}/>
    }
    
  return (
    <div className='resetPasswordPage'>
        <div className="reset-password">
            <h2>Đặt lại mật khẩu</h2>
            <form onSubmit={formik.handleSubmit}>
                <div className="form-group">
                <label htmlFor="password">Mật khẩu mới:</label>
                <input
                    type="text"
                    name="password"
                    id="password"
                    onChange={formik.handleChange}
					value={formik.values.password}
                    required
                />
                {formik.errors.password && (
							<small id='emailHelp' className='form-text text-danger'>
								{formik.errors.password}
							</small>
						)}
                </div>
                <div className="form-group">
                <label htmlFor="confirm-password">Xác nhận mật khẩu mới:</label>
                <input
                    type="text"
                    name="confirmPassword"
                    id="confirm-password"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
					value={formik.values.confirmPassword}
                    required
                />
                {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
                   
                    <small className='form-text text-danger'>
						{formik.errors.confirmPassword}
					</small>
                ) : null}
                </div>
                <button type="submit">Cập nhật mật khẩu</button>
            </form>
        </div>
    </div>
  );
};

export default ResetPassword