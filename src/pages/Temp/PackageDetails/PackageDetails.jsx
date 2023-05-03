import React from 'react'
import PackageDetailsTable from './PackageDetailsTable'

export default function PackageDetails() {
    return (
        <div className='container-fluid packageDetails'>
            <div className='py-5 packageDetailsTitle'>
                <h1>Chi tiết kiện hàng</h1>
            </div>
            <PackageDetailsTable />
        </div>
    )
}
