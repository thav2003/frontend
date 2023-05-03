import React from 'react';

import { useFormik } from 'formik';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { login } from '../../redux/reducers/userReducer';
import { ROLE_VALUES } from '../../utils/Constant';

export default function LoginPage() {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const handleLogin = async (data) => {
		// Will be edit navigate by role
		const res = dispatch(login(data));
		res.then(() => {
			const userRole = localStorage.getItem('ROLE');

			if (ROLE_VALUES.ADMIN === userRole) {
				navigate('/admin-dashboard');
			} else if (ROLE_VALUES.MANAGER === userRole) {
				navigate('/order-management');
			} else if (ROLE_VALUES.CUSTOMER === userRole) {
				navigate('/');
			} else if (ROLE_VALUES.STORE === userRole) {
				navigate('/store-dashboard');
			}
		});
	};

	const formik = useFormik({
		initialValues: {
			email: '',
			password: '',
		},
		onSubmit: (values) => {
			handleLogin(values);
		},
	});

	return (
		<section className='login-page'>
			<div style={{ padding: '0 100px' }}>
				<h2 className='mb-4'>Đăng nhập</h2>
				<form onSubmit={formik.handleSubmit}>
					<div className='form-group'>
						<label htmlFor='inpEmail'>Email</label>
						<input
							name='email'
							placeholder='YourEmail@example.com'
							onChange={formik.handleChange}
							value={formik.values.email}
							type='email'
							className='form-control'
							id='inpEmail'
						/>
					</div>
					<div className='form-group'>
						<label htmlFor='inpPwd'>Mật khẩu</label>
						<input
							name='password'
							onChange={formik.handleChange}
							value={formik.values.password}
							type='password'
							className='form-control'
							id='inpPwd'
						/>
					</div>
					<div style={{ display: "flex", justifyContent: "space-between",marginBottom:"10px" }}>
						<div className='text-left text-muted'>
							
							<span className='custom-link' onClick={() => navigate('/forgot-password')}>
							Quên mật khẩu ?{' '}
							</span>
						</div>
						<div className='text-right text-muted'>
							Người mới ?{' '}
							<span className='custom-link' onClick={() => navigate('/register')}>
								Đăng ký ngay
							</span>
						</div>
						
					</div>
					
					<button type='submit' className='btn btn-primary w-100'>
						Đăng nhập
					</button>
				</form>
			</div>
		</section>
	);
}
