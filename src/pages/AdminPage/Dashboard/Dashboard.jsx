import React,{useEffect} from 'react';
import './assets/Dashboard.scss';
import { Chart } from 'react-google-charts';
import { getDashboard } from '../../../redux/reducers/accountManagementReducer';
import { useDispatch, useSelector } from 'react-redux';
export default function Dashboard() {
	const dispatch = useDispatch();
	const dashboard = useSelector((state) => state.accountMng.dashboard)
	const data = [
		['Location', 'Total'],
		['Chi nhánh quận 1', 11],
		['Chi nhánh quận 2', 9],
		['Chi nhánh quận 3', 25],
		['Chi nhánh quận 4', 16],
		['Chi nhánh quận 5', 33],
		['Chi nhánh quận 6', 45],
		['Chi nhánh quận 7', 70],
		['Chi nhánh quận 8', 44],
		['Chi nhánh quận 9', 72],
		['Chi nhánh quận 10', 10],
		['Chi nhánh quận 11', 55],
		['Chi nhánh quận 12', 23],
	];
	const options = {
		is3D: true,
	};
	useEffect(()=>{
		dispatch(getDashboard())
	},[])
	return (
		<div className='container-fluid dashboardPage'>
			<div className='dashboardTitle'>
				<h1>Dashboard</h1>
			</div>
			<div className='row packagesStatus d-flex'>
				<div className='d-flex'>
					<p>Tổng số đơn hàng</p>
					<p>{dashboard &&dashboard.totalOrder}</p>
				</div>
				<div className='d-flex'>
					<p>Đơn hàng đang chờ</p>
					<p>{dashboard&&dashboard.listPendingOrder?.length}</p>
				</div>
				<div className='d-flex'>
					<p>Đơn hàng hoàn thành</p>
					<p>{dashboard&&dashboard.listDoneOrder?.length}</p>
				</div>
			</div>
			<div className='chart'>
				<Chart
					chartType='PieChart'
					data={dashboard&& dashboard.dataChart}
					width={'100%'}
					height={'95%'}
					options={options}
					style={{ borderRadius: '12px' }}
				/>
			</div>
		</div>
	);
}
