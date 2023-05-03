import React, { useEffect, useState } from 'react'
import './assets/PackageManagement.scss'
import moment from 'moment';
import Modal from '../../../components/Modal';

import { toast } from 'react-toastify';
import { STATUS } from '../../../utils/Constant';


export default function PackageManagementTable({ stores,createPackage,data, allOrdersStatus2, freeShippersList, handleAssignShipper, handleConfirmPackage,handleAssignStore }) {
    const headerLabels = ['ID', 'Chi tiết kiện hàng', 'Cửa hàng', 'Thời gian', 'Trạng thái', 'Người giao hàng', 'Khác']
    const [openModal, setOpenModal] = useState(false)
    const [name, setName] = useState('')
    const [ordersToPush, setOrdersToPush] = useState([])

	const deliveryValue = (item) => {
      
		if (item.shipper?.id) {
			return <div className='pt-3'>{item.shipper.user.fullName}</div>;
		} else {
            if(item.status!==4 && item.status!==0 )return <div className='pt-3'>Hành động đang khoá</div>;
			return (
				<select
					className='deliveryDropdown'
					value={item.shipper?.id || ''}
					onChange={(e) => {
						e.stopPropagation()
						if (e.target.value) handleAssignShipper(item.id, +e.target.value);
					}}>
					<option value=''>Chọn người vận chuyển</option>
					{freeShippersList.map((shipper) => (
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

    const handleChooseOrder = (order) => {
        setOrdersToPush([...ordersToPush, order.id])
        if (ordersToPush.includes(order.id)) {
            setOrdersToPush(ordersToPush.filter((item) => item !== order.id))
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const submitValues = {
            name,
            listId: ordersToPush
        }
        if (!ordersToPush.length > 0) {
            toast.error("Vui lòng chọn đơn hàng cần bỏ vào kiện hàng", {
                position: toast.POSITION.BOTTOM_RIGHT,
            });
        } else {
            createPackage(submitValues)
            handleCloseModal()
        }
    };

    const modalBody = (
        <div className='orderToBePickedModal'>
            <form onSubmit={handleSubmit}>
                <button className='btn btn-success my-3' type='submit'>
                    Đồng ý tạo
                </button>
                <input
                    type="text"
                    name='name'
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder='Nhập tên kiện hàng cần tạo'
                    required
                />
                <div className='orderToBePickedList'>
                    {
                        allOrdersStatus2?.map((item) => {
                            if(item.package==null){
                                return (
                                    <div key={item.id} className={`orderToBePicked ${ordersToPush.includes(item.id) ? "isChosen" : "notChosen"}`} onClick={() => handleChooseOrder(item)}>
                                        <p>{item.location}</p>
                                        <p>{item.service}</p>
                                        <p>{item.weight} kg</p>
                                    </div>
                                )
                            }
                            
                        })
                    }
                </div>
            </form>
        </div>
    )
    console.log(stores)
    return (
        <div>
            <div className='createPackageBtn py-5'>
                <button className='btn btn-primary' onClick={() => setOpenModal(true)}>+ Tạo kiện hàng mới</button>
            </div>

            <Modal
                show={openModal}
                handleClose={handleCloseModal}
                header={<h2>Tạo kiện hàng</h2>}
                body={modalBody}
                footer={
                    <div>
                        <button className='btn btn-danger' onClick={handleCloseModal}>Đóng</button>
                    </div>
                }
            />

            <table className="table table-hover packageManagementTable">
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
                        data.map(item => {
                            let storeData;
                            if(item.store==null){
                                storeData = (
                                    <div >
                                        <select
                                            className='deliveryDropdown'
                                            onChange={(e) => {
                                                if (e.target.value) handleAssignStore(e.target.value, item.id);
                                            }}>
                                            
                                            <option value=''>Chọn Cửa Hàng</option>
                                            {stores.map((store) => (
                                                store.isDeleted==0 && (<option key={store.id} value={store.id}>
                                                    {store.name}
                                                </option>)
                                            ))}
                                            
                                        </select>
                                    </div>
                                )
                            }
                            return (
                                <tr key={item.id}>
                                    <td>{item.id}</td>
                                    <td>
                                        <p>{item.name}</p>
                                        <p>{item.price.toLocaleString('vi-VN', {
                                            style: 'currency',
                                            currency: 'VND',
                                        })}
                                        </p>
                                        <p>{item.quantity} đơn hàng {item.weight} kg</p>
                                    </td>
                                    <td>{(item.store!=null && item.store?.name) || storeData}</td>
                                    <td>
                                        <p>{moment(item.createdAt).format('HH:mm')}</p>
                                        <p>{moment(item.createdAt).format('DD/MM/YYYY')}</p>
                                    </td>
                                    <td><p className='progess'>{STATUS[item.status]}</p></td>
                                    <td>{item.store==null?"Vui lòng chọn cửa hàng":deliveryValue(item)}</td>
                                    <td className='pt-4'>
                                        <button 
                                            disabled={item.status!==5 ? true : false} 
                                            onClick={() => handleConfirmPackage(item.id)}
                                        >
                                            Xác nhận
                                        </button>
                                    </td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        </div>
    )
}
