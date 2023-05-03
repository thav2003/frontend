import React from 'react';
import './assets/Dashboard.scss';
import { Chart } from 'react-google-charts';
import { getDashboard } from '../../../redux/reducers/stationPackageManagementReducer';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
export default function Dashboard() {
	const dispatch = useDispatch();
	const dashboardData = useSelector((state) => state.stationPackageMng.dashboard)
	

	useEffect(()=>{
		dispatch(getDashboard())
	},[])
	console.log(dashboardData)
	return (
		<div className='container-fluid dashboardPage'>
			<div className='dashboardTitle'>
				<h1>Dashboard</h1>
			</div>
			<div className='row packagesStatus d-flex flex-row my-4'>
				<div className='col d-flex mx-2'>
					<p>Số lượng cửa hàng</p>
					<p>{dashboardData.totalStore}</p>
				</div>
				<div className='col d-flex mx-2'>
					<p>Số lượng tài xế đang rảnh</p>
					<p>{dashboardData.totalShipper}</p>
				</div>
				<div className='col d-flex mx-2'>
					<p>Doanh thu trong ngày</p>
					<p>
					{dashboardData.totalAmountInDay > 0 ? dashboardData.totalAmountInDay.toLocaleString('vi-VN', {
                        style: 'currency',
                        currency: 'VND'
                        }):0
					}
					</p>
				</div>
			</div>
			<div className='row packagesStatus d-flex flex-row my-4'>
				<div className='col d-flex mx-2'>
					<p>Số lượng  đơn hàng</p>
					<p>{dashboardData.totalOrder}</p>
				</div>
				<div className='col d-flex mx-2'>
					<p>Số lượng đơn hàng trong ngày</p>
					
					<p>{dashboardData.totalOrderInDay}</p>
				</div>
				<div className='col d-flex mx-2'>
					<p>Số lượng kiện hàng</p>
					<p>{dashboardData.totalPackage}</p>
				</div>
			</div>
			
		</div>
	);
}
