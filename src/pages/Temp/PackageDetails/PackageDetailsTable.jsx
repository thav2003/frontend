import React from 'react'

export default function PackageDetailsTable() {
    const headerLabels = ['ID', 'Tên kiện hàng', 'Dịch vụ yêu cầu', 'Giá', 'Khối lượng', 'Trạng thái', 'Hoàn thành']

    return (
        <div>
            <table className="table packageDetailsTable">
                <thead>
                    <tr>
                        {
                            headerLabels.map(item => (
                                <th key={item}>{item}</th>
                            ))
                        }
                    </tr>
                </thead>
                <tbody>
                    {/* {
                        data.map(item => {
                            return (
                                <tr key={item.id}>
                                    <td>{item.id}</td>
                                    <td>
                                        <p>{item.customer}</p>
                                        <p>{item.phone}</p>
                                    </td>
                                    <td>{item.address}</td>
                                    <td>
                                        <p>{item.price}</p>
                                        <p>{item.weight}</p>
                                    </td>
                                    <td>{item.services}</td>
                                    <td><p className='progess'>{item.progress}</p></td>
                                    <td className='pt-4'>
                                        <EditIcon className='editBtn mr-2' />
                                        <DeleteForeverIcon className='dltBtn' />
                                    </td>
                                </tr>
                            )
                        })
                    } */}
                </tbody>
            </table>
        </div>
    )
}
