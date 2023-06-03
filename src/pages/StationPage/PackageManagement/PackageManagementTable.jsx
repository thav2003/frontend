import React, { useEffect, useState } from 'react'
import './assets/PackageManagement.scss'
import moment from 'moment';
import Modal from '../../../components/Modal';

import { toast } from 'react-toastify';
import { STATUS } from '../../../utils/Constant';


export default function PackageManagementTable({ data, handleConfirmPackage }) {
    const headerLabels = ['ID', 'Chi tiết kiện hàng', 'Cửa hàng', 'Thời gian', 'Trạng thái', 'Người giao hàng', 'Khác']

    return (
        <div>
            

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
                                    <td>{(item.store!=null && item.store?.name) || "Chưa assign cửa hàng"}</td>
                                    <td>
                                        <p>{moment(item.createdAt).format('HH:mm')}</p>
                                        <p>{moment(item.createdAt).format('DD/MM/YYYY')}</p>
                                    </td>
                                    <td><p className='progess'>{STATUS[item.status]}</p></td>
                                    <td>{item.shipper?.id?item.shipper.user.fullName:"Chưa có shipper"}</td>
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
