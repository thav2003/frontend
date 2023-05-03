import React, { useState,useEffect } from 'react';

import { useNavigate, Link } from 'react-router-dom';
import { Breadcrumb, BreadcrumbItem } from '../Breadcrumb';
import { Dropdown } from '../Dropdown';
import { Menu } from '../Menu';
import { Layout, Header, Content } from '../Layout';
import { useDispatch,useSelector } from 'react-redux';
import { logout } from '../../redux/reducers/userReducer';
import { ROLE_VALUES } from '../../utils/Constant';
const LABEL = {
	HOME_PAGE: 'Trang chủ',
	ORDER: 'Đặt lịch',
	SERVICE: 'Dịch vụ',
	LOGIN: 'Đăng nhập',
	HISTORY: 'Lịch sử'
};

const UserLayout = ({ children, defaultSelectedKeys, breadCrumbs }) => {
	const [isClick,setClick]=useState(false);
	const [selectedOption, setSelectedOption] = useState('');
	const dispatch=useDispatch();
	let navigate = useNavigate();
	const user=useSelector(state=>state.user)

	useEffect(()=>{
		if(user.isLogin){
			const userRole=user.role
			if (ROLE_VALUES.ADMIN === userRole) {
				navigate('/admin-dashboard');
			} else if (ROLE_VALUES.MANAGER === userRole) {
				navigate('/order-management');
			}
			 else if (ROLE_VALUES.STORE === userRole) {
				navigate('/store-dashboard');
			}
		}
	},[user.isLogin])
	const handleOptionSelect = (option) => {
	  setSelectedOption(option);
	  if(option==='Thông tin cá nhân'){
		navigate('/profile');
	  }
	};
	const handleLogout = () => {
		dispatch(logout());
		window.location.reload();
	};
	const renderBreadCrumbs = () => {
		return breadCrumbs.map((item, index) => (
			<BreadcrumbItem key={item.path} link={item.path} active={index == breadCrumbs.length - 1 ? true : false}>{item.label}</BreadcrumbItem>
		));
	};
	return (
		<Layout>
			<Header>
				<div style={{ position: 'relative' }}>
					{/* <div
							style={{
								float: 'left',
								width: 120,
								height: 31,
								margin: '16px 24px 16px 0',
								background: 'rgba(255, 255, 255, 0.2)',
							}}
						/> */}
					<Menu
						defaultSelectedKeys={defaultSelectedKeys}
						items={[
							{
								key: 'home',
								label: LABEL.HOME_PAGE,
							},
							{
								key: 'order',
								label: LABEL.ORDER,
							},
							{
								key: 'history-user',
								label: LABEL.HISTORY,
							},
						
						]}
						onClick={({ _, key, keyPath }) => {
							if (key === 'home') {
								navigate('/');
							} else {
								navigate(`/${key}`);
							}
						}}
					/>
					<div style={{
						position: 'absolute',
						right: 0,
						top: -0
					}}>
						{user.isLogin ? (
							<div style={{
								display:'flex',
								flexDirection:'row',
								gap: '10px',
							}}>
								{
									user.role===ROLE_VALUES.CUSTOMER && 
									
									<Dropdown
										text={user.fullName}
										options={['Thông tin cá nhân']}
										onSelect={handleOptionSelect}
									/>
								}
								{user.role!==ROLE_VALUES.CUSTOMER && 
									<h2>{user.fullName}</h2>
								}
								
								<button type='button' onClick={handleLogout}>
									Đăng xuất
								</button>
							</div>
						):(
							<Link to="/login">
									<button>
										{LABEL.LOGIN}
									</button>
							</Link>
						)
						
						}
						
					
					</div>
				</div>
			</Header>
			<Content>
				<Breadcrumb>
					{renderBreadCrumbs()}
				</Breadcrumb>
				<div style={{
					height: '100%',
					display: 'flex',
					flexDirection: 'column',
					flexGrow:1
				}}>
					{children}
				</div>
			</Content>
		</Layout>
	);
};

export default UserLayout;
