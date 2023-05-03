import React, { useEffect, useState } from 'react';
import AccountManageMentTable from './AccountManagementTable';
import './assets/AccountManagement.scss';

export default function OrderManagement() {
	return (
		<div className='container-fluid accountManagement'>
			<div className='accountManagementTitle d-flex'>
				<h1 className='mr-3'>Account Management</h1>
			</div>

			<AccountManageMentTable />
		</div>
	);
}
