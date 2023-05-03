import React, { useEffect, useState } from 'react';
import OrderManageMentTable from './OrderManageMentTable';
import './assets/OrderManagement.scss';

export default function OrderManagement({confirmStatus, data, ...rest }) {
	return (
		<div className='container-fluid orderManagement'>
			<div className='orderManagementTitle d-flex'>
				<h1>Quản lý đơn hàng</h1>
				{/* <p>100 đơn hàng</p> */}
			</div>

			<OrderManageMentTable confirmStatus={confirmStatus} data={data} {...rest} />
		</div>
	);
}
