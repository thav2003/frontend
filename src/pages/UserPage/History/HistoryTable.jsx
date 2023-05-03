import React from 'react'
import { STATUS } from '../../../utils/Constant';
export default function HistoryTable({orders}) {
    const headerLabels = ['STT','Mã đơn hàng', 'Địa chỉ', 'Dịch vụ yêu cầu', 'Tổng khối lượng', 'Giá tiền','Trạng thái', 'Thời gian']
    const classifyStatus = (STATUS, item) => {
		switch (item.status) {
			case 0:
				return (
					<p className='waitingStatus'>{STATUS[item.status]}</p>
				);
			case 4:
				return (
					<p className='deliveringStatus'>
						{STATUS[item.status]}
					</p>
				);
			
		}
		return (
			<p className='deliveringStatus'>
				{STATUS[item.status]}
			</p>
		);
	};
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
                    {
                        orders && orders.map((item,index) => {
                            return (
                                <tr key={item.id}>
                                    <td>{index+1}</td>
                                    <td>{item.id}</td>
                                    <td>{item.address}</td>
                                    <td>{item.service}</td>
                                    <td>{item.weight}</td>
                                    <td>
											{item.price.toLocaleString('vi-VN', {
												style: 'currency',
												currency: 'VND',
											})}
									</td>
                                    <td>{classifyStatus(STATUS, item)}</td>
                                    <td>{new Date(item.createdAt).toLocaleString()}</td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        </div>
    )
}
