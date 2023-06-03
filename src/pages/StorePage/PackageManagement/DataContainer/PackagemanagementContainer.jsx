import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {  getAllPackages,updatePackageStatus } from '../../../../redux/reducers/storePackageManagementReducer';
import { updateOrderStatus } from '../../../../redux/reducers/orderManagementReducer';
import PackageManagement from '../PackageManagement'
import Swal from 'sweetalert2';

export default function PackagemanagementContainer() {
    const dispatch = useDispatch();
    const allPackagesDetails = useSelector((state) => state.storePackageMng.allPackages)


    useEffect(() => {

        dispatch(getAllPackages());

    
    }, [dispatch]);

    const handleConfirmPackage = (packageId,status) => {
        const mappingValue = {
            PackageId: packageId,
            Status: status
        }

        Swal.fire({
            title: 'Xác nhận gói hàng này?',
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'OK',
            cancelButtonText: 'Hủy',
          }).then((result) => {
            if (result.isConfirmed) {
              dispatch(updatePackageStatus(mappingValue)).then(()=>{
                dispatch(getAllPackages());
              })
            }
          })
    }

    const handleConfirmOrder = (orderId,status) => {
        const mappingValue = {
            OrderId: orderId,
            Status: status
        }

        Swal.fire({
            title: 'Xác nhận đã giặt xong',
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'OK',
            cancelButtonText: 'Hủy',
          }).then((result) => {
            if (result.isConfirmed) {
              dispatch(updateOrderStatus(mappingValue)).then(()=>{
                dispatch(getAllPackages());
              })
            }
          })
    }

    return (
        <div>
            <PackageManagement
                data={allPackagesDetails}
                handleConfirmPackage={handleConfirmPackage}
                handleConfirmOrder={handleConfirmOrder}
            />
        </div>
    )
}
