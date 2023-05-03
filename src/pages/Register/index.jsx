import React, { useState, useEffect } from 'react';

import { useFormik } from 'formik';

import { useDispatch } from 'react-redux';
import { register } from '../../redux/reducers/userReducer';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function RegisterPage() {
	const [isLoading,setIsLoading]=useState(false)
	const [confirmPwd, setConfirmPwd] = useState('');
	const [pwdMatch, setPwdMatch] = useState(false);
	const [confirmTouched, setConfirmTouched] = useState(false);
	const navigate = useNavigate();

	const dispatch = useDispatch();

	const handleRegister = async (data) => {
		setIsLoading(true)
		const response = dispatch(register(data));
		response.then((res) => {
			console.log(res)
			if(res.payload.succeeded){
				navigate('/login');
				setIsLoading(false)
			}else{
				setIsLoading(false)
			}
			// toast.success('Đăng ký thành công !', {
			// 	position: toast.POSITION.BOTTOM_RIGHT,
			// });
		});
	};

	const formik = useFormik({
		initialValues: {
			email: '',
			password: '',
			fullName: '',
			phone: '',
		},
		validate: (values) => {
			const errors = {};
			if (values.password.length < 6 || values.password.length > 18) {
				errors.password = 'Mật khẩu từ 6 đến 18 kí tự';
			}
			if (values.phone.length <=10  || values.phone.length > 0) {
				errors.phone = 'Số điện thoại không hợp lệ';
			}
			return errors;
		},
		onSubmit: (values) => {
			handleRegister({ ...values, phone: `0${values.phone}` });
		},
	});

	const handleChangeConfirmPassword = (e) => {
		if (!confirmTouched) setConfirmTouched(true);
		setConfirmPwd(e.target.value);
	};

	const handleConfirmPassword = () => {
		const password = formik.values.password;
		if (password?.length > 0) {
			if (password === confirmPwd) {
				setPwdMatch(true);
				return;
			}
		}

		// else
		setPwdMatch(false);
	};

	useEffect(() => {
		handleConfirmPassword();
	}, [formik.values.password, confirmPwd]);

	return (
		<section className='login-page'>
			<div style={{ padding: '0 100px' }}>
				<h2 className='mb-4'>Đăng ký</h2>
				<form onSubmit={formik.handleSubmit}>
					<div className='form-group'>
						<label htmlFor='inpEmail'>Email</label>
						<input
							name='email'
							placeholder='Nhập địa chỉ email'
							onChange={formik.handleChange}
							value={formik.values.email}
							type='email'
							className='form-control'
							id='inpEmail'
							required
						/>
					</div>
					<div className='form-group'>
						<label htmlFor='inpFullName'>Họ và tên</label>
						<input
							name='fullName'
							placeholder='Nhập họ tên'
							onChange={formik.handleChange}
							value={formik.values.fullName}
							type='text'
							className='form-control'
							id='inpFullName'
							required
						/>
					</div>
					<div className='form-group'>
						<label htmlFor='inpPhone'>Số điện thoại</label>
						<input
							name='phone'
							placeholder='Nhập số điện thoại'
							onChange={formik.handleChange}
							value={formik.values.phone}
							type='number'
							className='form-control'
							id='inpPhone'
							required
						/>
						{formik.errors.phone && (
							<small id='phoneHelp' className='form-text text-danger'>
								{formik.errors.phone}
							</small>
						)}
					</div>

					<div className='form-group'>
						<label htmlFor='inpPwd'>Mật khẩu</label>
						<input
							name='password'
							placeholder='Nhập mật khẩu'
							onChange={formik.handleChange}
							value={formik.values.password}
							type='password'
							className='form-control'
							id='inpPwd'
							required
						/>
						{formik.errors.password && (
							<small id='emailHelp' className='form-text text-danger'>
								{formik.errors.password}
							</small>
						)}
					</div>
					<div className='form-group'>
						<label htmlFor='confirmPwd'>Xác nhận mật khẩu</label>
						<input
							placeholder='Nhập lại mật khẩu'
							onChange={handleChangeConfirmPassword}
							value={confirmPwd}
							type='password'
							className='form-control'
							id='confirmPwd'
							required
						/>
						{!pwdMatch && confirmTouched && (
							<small id='emailHelp' className='form-text text-danger'>
								Mật khẩu không trùng khớp
							</small>
						)}
					</div>
					<div style={{ display: "flex", justifyContent: "space-between",marginBottom:"10px" }}>
						<div className='text-left text-muted'>
							
							<span className='custom-link' onClick={() => navigate('/forgot-password')}>
							Quên mật khẩu ?{' '}
							</span>
						</div>
						<div className='text-right text-muted'>
							Đã có tài khoản ?{' '}
							<span className='custom-link' onClick={() => navigate('/login')}>
								Đăng nhập
							</span>
						</div>
						
					</div>
					
					<button
						type='submit'
						className='btn btn-primary w-100'
						disabled={!pwdMatch && isLoading}>
						Đăng ký
					</button>
				</form>
			</div>
		</section>
	);
}
