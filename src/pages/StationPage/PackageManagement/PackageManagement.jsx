import React from 'react'
import PackageManagementTable from './PackageManagementTable'

export default function PackageManagement({ data, handleConfirmPackage }) {
    return (
        <div className='container-fluid packageManagement'>
            <div className='packageManagementTitle'>
                <h1>Quản lí kiện hàng</h1>
            </div>

            <PackageManagementTable
                data={data}
                handleConfirmPackage={handleConfirmPackage}
            />
        </div>
    )
}
