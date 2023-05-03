import React from 'react'
import PackageManagementTable from './PackageManagementTable'

export default function PackageManagement({ data,handleConfirmPackage,handleConfirmOrder }) {
    return (
        <div className='container-fluid packageManagement'>
            <div className='packageManagementTitle'>
                <h1>Package Management</h1>
            </div>

            <PackageManagementTable
                data={data}
                handleConfirmPackage={handleConfirmPackage}
                handleConfirmOrder={handleConfirmOrder}
            />
        </div>
    )
}
