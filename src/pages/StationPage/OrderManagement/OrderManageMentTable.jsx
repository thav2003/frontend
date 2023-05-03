import React, { useState } from 'react';
import _ from 'lodash';
import moment from 'moment';
import { STATUS } from '../../../utils/Constant';
import Modal from '../../../components/Modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock, faTruck, faCheckCircle, faUndo, faTimesCircle } from '@fortawesome/free-solid-svg-icons';

export default function OrderManageMentTable({
	confirmStatus,
	data,
	freeShipersData,
	handleChangeShipper,
}) {
	const headerLabels = [
		'STT',
		'Khách hàng',
		'Địa chỉ',
		'Giá cả',
		'Dịch vụ yêu cầu',
		'Thời gian',
		'Tiến trình',
		'Hành động',
	];
	const [status, setStatus] = useState('All');
	const filterButtons = [1, 5];

	const [openModal, setOpenModal] = useState(false)
	const [showStatus,setShowStatus]=useState({id:-1,status:-1})

	const classifyStatus = (STATION_ORDER_STATUS, item) => {
		switch (item.status) {
			case 0:
				return (
					<div className='waitingStatus'>{STATION_ORDER_STATUS[item.status]}</div>
				);
			case 1:
				return (
					<div className='deliveringStatus'>
						{STATION_ORDER_STATUS[item.status]}
					</div>
				);
			case 2:
				return (
					<div className='deliveringStatus'>
						{STATION_ORDER_STATUS[item.status]}
					</div>
				);
			case 3:
				return (
					<div className='waitingStatus'>{STATION_ORDER_STATUS[item.status]}</div>
				);
			case 4:
				return (
					<div className='deliveringStatus'>
						{STATION_ORDER_STATUS[item.status]}
					</div>
				);
			case 5:
				return (
					<div className='deliveringStatus'>
						{STATION_ORDER_STATUS[item.status]}
					</div>
				);
			case 6:
				return (
					<div className='waitingStatus'>{STATION_ORDER_STATUS[item.status]}</div>
				);
			case 7:
				return (
					<div className='deliveringStatus'>
						{STATION_ORDER_STATUS[item.status]}
					</div>
				);
			case 8:
				return (
					<div className='deliveringStatus'>
						{STATION_ORDER_STATUS[item.status]}
					</div>
				);
		}
	};

	const deliveryValue = (item) => {
		const finalConfirm=()=>{
			const data={
				OrderId:item.id,
				status:item.status
			}
			confirmStatus(data)
			setShowStatus({id:data.OrderId,status:data.status})
		}
		if (item.shipper?.id) {
			if(item.status==6){
				return (
					<div className='pt-3'>
						<button onClick={finalConfirm}>Xác nhận</button>
					</div>
				)
			}
			return <div className='pt-3'>{item.shipper.user.fullName}</div>;
		} else {
			if(item.status==2 && item.package==null){
				return <div className='pt-3'>Đơn đang chờ tạo package</div>;
			}
			if(item.status==2 && item.package!=null){
				return <div className='pt-3'>Đơn đang thuộc về 1 package</div>;
			}
			if(item.status==3){
				return <div className='pt-3'>Đang giặt</div>;
			}
			if(item.status==4 && item.package.status==4){
				return <div className='pt-3'>Đã giặt xong</div>;
			}
			if(item.status==4 && item.package.status==1){
				return <div className='pt-3'>Đang trở về station</div>;
			}
			if(item.status==6){
				return <div className='pt-3'>Đơn đã hoàn thành</div>;
			}
			return (
				<select
					className='deliveryDropdown'
					value={item.shipper?.id || ''}
					onChange={(e) => {
						e.stopPropagation()
						if (e.target.value) handleChangeShipper(item.id, +e.target.value);
					}}>
					<option value=''>Chọn người vận chuyển</option>
					{freeShipersData.map((shipper) => (
						<option key={shipper.id} value={shipper.id}>
							{shipper.user.fullName}
						</option>
					))}
				</select>
			);
		}
	};
	
    const handleCloseModal = () => {
        setOpenModal(false);
    };
	const getStatusIcon = (status) => {
		switch (status) {
		  case 0:
			return <FontAwesomeIcon icon={faClock} className="status-icon status-pending" />;
		  case 1:
			return <FontAwesomeIcon icon={faTruck} className="status-icon status-shipping " />;
		  case 2:
			return <FontAwesomeIcon icon={faCheckCircle} className="status-icon status-arrived " />;
		  case 3:
			return <FontAwesomeIcon icon={faClock} className="status-icon status-washing" />;
		  case 4:
			return <FontAwesomeIcon icon={faCheckCircle} className="status-icon status-washed " />;
		  case 5:
			return <FontAwesomeIcon icon={faTruck} className="status-icon status-delivering" />;
		  case 6:
			return <FontAwesomeIcon icon={faCheckCircle} className="status-icon status-completed" />;
		  case 7:
			return <FontAwesomeIcon icon={faTimesCircle} className="status-icon status-cancelled" />;
		  case 8:
			return <FontAwesomeIcon icon={faCheckCircle} className="status-icon status-returned" />;
		  default:
			return null;
		}
	  }
	const handleConfirmStatus=()=>{
		const data={
			OrderId:showStatus.id,
			status:showStatus.status+1
		}
		confirmStatus(data)
		setShowStatus({id:data.OrderId,status:data.status})
	}
    const modalBody =   (
		<div className="mb">
			<div className="status-icon">{getStatusIcon(showStatus.status)}</div>
			<div className="content">
			Tiến trình
			</div>
			{(showStatus.status==1 ||showStatus.status==5)&&<button className="btn btn-primary" onClick={handleConfirmStatus}>Xác nhận</button>}
	  	</div>
	)

	return (
		<div>
			<div className='filterButtons py-5'>
				<button className='btn' onClick={() => setStatus('All')}>
					Xóa bộ lọc
				</button>
				{_.map(filterButtons, (item) => (
					<button key={item} className='btn' onClick={() => setStatus(item)}>
						{STATUS[item]}
					</button>
				))}
			</div>
			<Modal
				styleModalMain={{with:'50%'}}
                show={openModal}
                handleClose={handleCloseModal}
                header={<h2>Xem Tiến Trình</h2>}
                body={modalBody}
                footer={
                    <div>
                        <button className='btn btn-danger' onClick={handleCloseModal}>Đóng</button>
                    </div>
                }
            />
			<table className='table table-hover orderManagementTable'>
				<thead>
					<tr>
						{headerLabels.map((item) => (
							<th key={item}>{item}</th>
						))}
					</tr>
				</thead>
				<tbody>
					{
						data && data.map((item,index)=>{
							if(item.status===6 && !item.shipperId){
								return;
							}
							if (status === 'All' || item.status === status) {
								return (
									<tr key={item.id} onClick={(e)=>{
										e.stopPropagation();
										if(item.status!=0)setOpenModal(true),
										setShowStatus({id:item.id,status:item.status})
										}}>
											<td>{index+1}</td>
										<td>
											<p>{item.user.fullName}</p>
											<p>{item.user.phone}</p>
										</td>
										<td>{item.address}</td>
										<td>
											<p>
												{item.price.toLocaleString('vi-VN', {
													style: 'currency',
													currency: 'VND',
												})}
											</p>
											<p>{item.weight} kg</p>
										</td>
										<td>{item.service}</td>
										<td>
											<p>{moment(item.createdAt).format('HH:mm')}</p>
											<p>{moment(item.createdAt).format('DD/MM/YYYY')}</p>
										</td>
										<td>{classifyStatus(STATUS, item)}</td>
										<td onClick={(e) => e.stopPropagation()}>{deliveryValue(item)}</td>
									</tr>
								);
							}
						})
					}
					{/* {_.map(data, (item) => {
						if(item.status===6){
							return;
						}
						if (status === 'All' || item.status === status) {
							return (
								<tr key={item.id} onClick={(e)=>{
									e.stopPropagation();
									if(item.status!=0)setOpenModal(true),
									setShowStatus({id:item.id,status:item.status})
									}}>
									<td>{item.id}</td>
									<td>
										<p>{item.user.fullName}</p>
										<p>{item.user.phone}</p>
									</td>
									<td>{item.address}</td>
									<td>
										<p>
											{item.price.toLocaleString('vi-VN', {
												style: 'currency',
												currency: 'VND',
											})}
										</p>
										<p>{item.weight} kg</p>
									</td>
									<td>{item.service}</td>
									<td>
										<p>{moment(item.createdAt).format('HH:mm')}</p>
										<p>{moment(item.createdAt).format('DD/MM/YYYY')}</p>
									</td>
									<td>{classifyStatus(STATUS, item)}</td>
									<td onClick={(e) => e.stopPropagation()}>{deliveryValue(item)}</td>
								</tr>
							);
						}
					})} */}
				</tbody>
			</table>
		</div>
	);
}
