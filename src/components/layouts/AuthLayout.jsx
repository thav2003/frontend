import React from 'react';

import Logo from '../../assets/logo.svg';

import './AuthLayout.scss';

export default function AuthLayout({ children }) {
	return (
		<section className='auth-layout'>
			<div className='content'>
				<div className='children'>{children}</div>
			</div>
			<div className='banner'>
				<img className='logo' src={Logo} />
			</div>
		</section>
	);
}
