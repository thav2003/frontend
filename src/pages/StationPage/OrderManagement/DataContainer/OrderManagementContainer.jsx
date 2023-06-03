import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
	changeShipper,
	getFreeShipper,
	getOrderMng,
	updateOrderStatus
} from '../../../../redux/reducers/orderManagementReducer';
import OrderManagement from '../OrderManagement';

export default function OrderManagementContainer() {
	const dispatch = useDispatch();
	const orderMngData = useSelector(
		(state) => state.orderMng.orderManagementDetails
	);

	useEffect(() => {
		const interval = setInterval(() => {
		  dispatch(getOrderMng());
		}, 5000);
	  
		return () => {
		  clearInterval(interval);
		};
	  }, []);

	const handleConfirmStatus=(data)=>{
		dispatch(updateOrderStatus(data)).then(()=>{
			dispatch(getOrderMng());
		})
	}

	return (
		<div>
			<OrderManagement
				data={orderMngData}
				confirmStatus={handleConfirmStatus}
			/>
		</div>
	);
}
