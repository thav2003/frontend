import React from 'react'
import PackageManagementTable from './PackageManagementTable'

export default function PackageManagement({ stores,createPackage,data, allOrdersStatus2, freeShippersList, handleAssignShipper, handleConfirmPackage,handleAssignStore }) {
    return (
        <div className='container-fluid packageManagement'>
            <div className='packageManagementTitle'>
                <h1>Quản lí kiện hàng</h1>
            </div>

            <PackageManagementTable
                data={data}
                allOrdersStatus2={allOrdersStatus2}
                freeShippersList={freeShippersList}
                handleAssignShipper={handleAssignShipper}
                handleConfirmPackage={handleConfirmPackage}
                handleAssignStore={handleAssignStore}
                createPackage={createPackage}
                stores={stores}
            />
        </div>
    )
}
