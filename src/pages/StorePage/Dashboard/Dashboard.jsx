import React from 'react';
import './assets/Dashboard.scss';
import { Chart } from 'react-google-charts';
import { getDashboard } from '../../../redux/reducers/storePackageManagementReducer';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
export default function Dashboard() {
	const dispatch = useDispatch();
	const dashboardData = useSelector((state) => state.storePackageMng.dashboard)
	

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
					<p>Tổng số kiện hàng</p>
					<p>{dashboardData.totalPackage}</p>
				</div>
				<div className='col d-flex mx-2'>
					<p>Doanh thu</p>
					<p>
					{dashboardData.totalAmount > 0 ? dashboardData.totalAmount.toLocaleString('vi-VN', {
                        style: 'currency',
                        currency: 'VND'
                        }):0
					}
					</p>
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
					<p>Số lượng  khách hàng</p>
					<p>{dashboardData.totalUser}</p>
				</div>
				<div className='col d-flex mx-2'>
					<p>Đơn hàng đang giặt</p>
					<p>{dashboardData.totalPendingPackage}</p>
				</div>
				<div className='col d-flex mx-2'>
					<p>Đơn hàng đã giặt xong</p>
					<p>{dashboardData.totalDonePackage}</p>
				</div>
			</div>
			
		</div>
	);
}
