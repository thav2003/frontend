import React, { useEffect, useState } from 'react';
import ServiceManagementTable from './ServiceManagementTable';
import './assets/ServiceManagement.scss';

export default function ServiceManagement({updatePriceProduct,updateStatusProduct,products,createProduct}) {
	return (
		<div className='container-fluid serviceManagement'>
			<div className='serviceManagementTitle d-flex'>
				<h1 className='mr-3'>Service Management</h1>
			</div>

			<ServiceManagementTable updatePriceProduct={updatePriceProduct} updateStatusProduct={updateStatusProduct} products={products} createProduct={createProduct}/>
		</div>
	);
}
