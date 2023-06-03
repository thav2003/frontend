import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {createPackageAPI,autoAssignPackageAPI} from "../../../../api/apis"
import {confirmPackage, getAllPackages } from '../../../../redux/reducers/stationPackageManagementReducer';
import PackageManagement from '../PackageManagement'
import { getFreeShipper } from '../../../../redux/reducers/orderManagementReducer';
import Swal from 'sweetalert2';

export default function PackagemanagementContainer() {
    const dispatch = useDispatch();
    const allPackagesDetails = useSelector((state) => state.stationPackageMng.allPackages)


    useEffect(() => {
       
        
    })
    useEffect(() => {
      const interval = setInterval(() => {
        dispatch(getAllPackages());
        createPackageAPI();
        autoAssignPackageAPI();
      }, 1000);
      
      return () => {
        clearInterval(interval);
      };
    }, []);


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
              })
            }
          })
    }

    return (
        <div>
            <PackageManagement
                data={allPackagesDetails}
                handleConfirmPackage={handleConfirmPackage}
            />
        </div>
    )
}
