import React from 'react'

export default function HistoryTable() {
    const headerLabels = ['ID', 'Tên', 'Dịch vụ yêu cầu', 'Tổng khối lượng', 'Số lượng', 'Thời gian']

    return (
        <div>
            <table className="table table-hover historyTable">
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
