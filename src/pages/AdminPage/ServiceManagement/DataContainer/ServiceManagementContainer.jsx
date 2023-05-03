import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ServiceManagement from '../ServiceManagement';
import { getProducts,createProduct,updatePriceProduct,updateStatusProduct } from '../../../../redux/reducers/accountManagementReducer';
export default function ServiceManagementContainer() {
	const dispatch = useDispatch();
	// const accountMngData = useSelector((state) => state.accountMng.accountManagementDetails);
	const products = useSelector((state) => state.accountMng.products)
	useEffect(() => {
		dispatch(getProducts())
	}, [dispatch]);

	const handleCreateProduct=(data)=>{
		dispatch(createProduct(data))
	}
	const handleUpdatePriceProduct=(data)=>{
		dispatch(updatePriceProduct(data))
	}
	const handleUpdateStatusProduct=(data)=>{
		dispatch(updateStatusProduct(data))
	}

	return (
		<div>
			<ServiceManagement updateStatusProduct={handleUpdateStatusProduct} updatePriceProduct={handleUpdatePriceProduct} createProduct={handleCreateProduct} products={products}/>
		</div>
	);
}