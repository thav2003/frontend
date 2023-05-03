import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {getAllStores,createPackage,updatePackageStore, assignShipper, confirmPackage, getAllOrdersByStatusId, getAllPackages } from '../../../../redux/reducers/stationPackageManagementReducer';
import PackageManagement from '../PackageManagement'
import { getFreeShipper } from '../../../../redux/reducers/orderManagementReducer';
import Swal from 'sweetalert2';

export default function PackagemanagementContainer() {
    const dispatch = useDispatch();
    const allPackagesDetails = useSelector((state) => state.stationPackageMng.allPackages)
    const allOrdersWithStatusBy2 = useSelector((state) => state.stationPackageMng.allOrdersByStatus)
    const freeShippersList = useSelector((state) => state.orderMng.freeShippersList);
    const stores =  useSelector((state) => state.stationPackageMng.stores);
    useEffect(() => {
        dispatch(getAllPackages());
        dispatch(getAllOrdersByStatusId(2))
        dispatch(getFreeShipper());
        dispatch(getAllStores());
    }, [dispatch])

    const handleAssignShipper = (packageId, shipperId) => {
        const mappingValue = {
            PackageId: packageId,
            ShipperId: shipperId
        }

        Swal.fire({
            title: 'Thay đổi shipper?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Xác nhận chọn shipper này!',
            cancelButtonText: 'Hủy',
          }).then((result) => {
            if (result.isConfirmed) {
              dispatch(assignShipper(mappingValue)).then(()=>{
                dispatch(getAllPackages());
                dispatch(getAllOrdersByStatusId(2))
                dispatch(getFreeShipper());
                dispatch(getAllStores());
              })
            }
          })
    }
    const handleAssignStore = (storeId, packageId) => {
      const mappingValue = {
          PackageId: packageId,
          StoreId: storeId
      }

      Swal.fire({
          title: 'Thay đổi store?',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Xác nhận chọn store này!',
          cancelButtonText: 'Hủy',
        }).then((result) => {
          if (result.isConfirmed) {
            dispatch(updatePackageStore(mappingValue)).then(()=>{
              dispatch(getAllPackages());
              dispatch(getAllOrdersByStatusId(2))
              dispatch(getFreeShipper());
              dispatch(getAllStores());
            })
          }
        })
  }
    const handleConfirmPackage = (packageId) => {
        const mappingValue = {
            PackageId: packageId,
            Status: 8
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
              dispatch(confirmPackage(mappingValue)).then(()=>{
                dispatch(getAllPackages());
                dispatch(getAllOrdersByStatusId(2))
                dispatch(getFreeShipper());
                dispatch(getAllStores());
              })
            }
          })
    }

    const handleCreatePackge=(data)=>{
      dispatch(createPackage(data)).then(()=>{
        dispatch(getAllPackages());
        dispatch(getAllOrdersByStatusId(2))
        dispatch(getFreeShipper());
        dispatch(getAllStores());
      })
    }
    return (
        <div>
            <PackageManagement
                data={allPackagesDetails}
                allOrdersStatus2={allOrdersWithStatusBy2}
                freeShippersList={freeShippersList}
                handleAssignShipper={handleAssignShipper}
                handleConfirmPackage={handleConfirmPackage}
                handleAssignStore={handleAssignStore}
                createPackage={handleCreatePackge}
                stores={stores}
            />
        </div>
    )
}
