import React,{useState,useEffect} from 'react';

import { useNavigate } from 'react-router-dom';
import { useDispatch,useSelector } from 'react-redux';
import { logout } from '../../redux/reducers/userReducer';
import LogoName from '../../assets/logo-name.svg';
import './AdminLayout.scss';
import { getStoreByIdAPI,updateStoreAPI } from '../../api/apis';
import { ROLE_VALUES } from '../../utils/Constant';
import Switch from '../Switch';
const MENU_ITEM = {
	Manager: [
		{
			LABEL: 'TRANG CHỦ',
			URL: '/station-dashboard',
		},
		{
			LABEL: 'QUẢN LÝ ĐƠN HÀNG',
			URL: '/order-management',
		},
		{
			LABEL: 'QUẢN LÝ KIỆN HÀNG',
			URL: '/station-package-management',
		},
		{
			LABEL: 'LỊCH SỬ',
			URL: '/station-history',
		},
	],
	Admin: [
		{
			LABEL: 'TRANG CHỦ',
			URL: '/admin-dashboard',
		},
		{
			LABEL: 'QUẢN LÝ TÀI KHOẢN',
			URL: '/account-management',
		},
		{
			LABEL: 'QUẢN LÝ DỊCH VỤ',
			URL: '/services-management',
		},
	],
	Store:[
		{
			LABEL: 'TRANG CHỦ',
			URL: '/store-dashboard',
		},
		{
			LABEL: 'QUẢN LÝ KIỆN HÀNG',
			URL: '/store-package-management',
		},
	]

};

const renderMenu = (role, navigate) =>
	MENU_ITEM[role].map((item) => {
		let elem;
		const currentPaths = window.location.href.split('/');
		if (`/${currentPaths[currentPaths.length - 1]}` === item.URL) {
			elem = (
				<div className='active sidebar-menu-item' key={item.LABEL}>
					<div className='menu-item-content'>{item.LABEL}</div>
				</div>
			);
		} else {
			elem = (
				<div
					className='sidebar-menu-item'
					key={item.LABEL}
					onClick={() => navigate(item.URL)}>
					<div className='menu-item-content'>{item.LABEL}</div>
				</div>
			);
		}

		return elem;
	});

export default function AdminLayout({ children }) {
	const [isChecked, setIsChecked] = useState(false);
	const [close,setClose]=useState(false)
	const [id,setId]=useState(-1)
	const user=useSelector(state=>state.user)
	const navigate = useNavigate();
	const dispatch=useDispatch();
	const handleLogout = () => {
		dispatch(logout());
		navigate('/login');
	};
	const handleChange=()=>{
		const payload={
			StoreId:id,
			IsDeleted:close ===true ? 1 : 0
		}
		updateStoreAPI(payload).then(()=>setClose(!close))
	}
	useEffect(()=>{
		
		
			getStoreByIdAPI().then(res=>{
				const resData=res.data.data
				
				console.log(resData)
				setClose(resData.isDeleted == 0 ? true : false)
				setId(resData.id);
			})
		
		
		
	},[localStorage.getItem("TOKEN")])
	return (
		<section className='admin-layout'>
			<div className='sidebar'>
				<div className='d-flex justify-content-center pt-4'>
					<img width={'80%'} src={LogoName} />
				</div>
				<div className='sidebar-menu'>
					{renderMenu(localStorage.getItem("ROLE"), navigate)}
					{localStorage.getItem("ROLE")=="Store" &&
						<div
						className='sidebar-menu-item'
						style={{cursor:"default"}}
					>
						<div className='' style={{paddingLeft:"50px",display:"flex",gap:"10px",lineHeight:"24px"}}>
							<Switch isChecked={close} setIsChecked={setIsChecked} handleChange={handleChange}/>
							{close ?  "Mở cửa": "Đóng cửa" }
						</div>
					</div>
					}
					
				</div>
				<div className='name'>
					<h2>{localStorage.getItem("FULLNAME")}</h2>
				</div>
				{/* <div className='sidebar-menu'>{renderMenu('ADMIN', navigate)}</div> */}
				<div className='logout-btn' onClick={handleLogout}>
					Đăng xuất
				</div>
			</div>
			<div className='page-content-wrapper'>
				<div className='page-content'>{children}</div>
			</div>
		</section>
	);
}
