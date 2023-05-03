import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AccountManagement from '../AccountManagement';

export default function OrderManagementContainer() {
	const dispatch = useDispatch();
	// const accountMngData = useSelector((state) => state.accountMng.accountManagementDetails);

	// useEffect(() => {
	// 	dispatch(getAccountMng({pageNumber,pageSize}));
	// }, [dispatch]);

	return (
		<div>
			<AccountManagement />
		</div>
	);
}
