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
	const freeShippersList = useSelector(
		(state) => state.orderMng.freeShippersList
	);

	useEffect(() => {
		dispatch(getOrderMng());
		dispatch(getFreeShipper());
	}, [dispatch]);

	const handleChangeShipper = async (orderId, shipperId) => {
		const mappingValue = {
			OrderId: orderId,
			shipperId: shipperId,
		};
		dispatch(changeShipper(mappingValue)).then(() => {
			dispatch(getOrderMng());
			dispatch(getFreeShipper());
		});
	};
	const handleConfirmStatus=(data)=>{
		dispatch(updateOrderStatus(data)).then(()=>{
			dispatch(getOrderMng());
			dispatch(getFreeShipper());
		})
	}

	return (
		<div>
			<OrderManagement
				data={orderMngData}
				freeShipersData={freeShippersList}
				handleChangeShipper={handleChangeShipper}
				confirmStatus={handleConfirmStatus}
			/>
		</div>
	);
}
