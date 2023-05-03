import React,{useEffect, useState} from 'react'
import _ from 'lodash';
import { useDispatch, useSelector } from 'react-redux';
import { STATUS } from '../../../utils/Constant';
import Dropdown from '../../../components/Dropdown';
import moment from 'moment';
import {setPackageStatus } from '../../../redux/reducers/stationPackageManagementReducer';
export default function HistoryTable({ordersByStatus,historyMode,packagesByStatus,changeMode}) {
    const headerLabels1 = ['STT','Mã kiện hàng', 'Tên',  'Tổng khối lượng(kg)', 'Số lượng','Tổng tiền', 'Thời gian']
    const headerLabels2 = ['STT','Mã đơn hàng', 'Dịch vụ yêu cầu',  'Tổng khối lượng(kg)','Tổng tiền', 'Thời gian']


    
    const options=["Xem kiện hàng","Xem đơn hàng"]
    const handleOptionSelect = (option) => {
        if(option === "Xem kiện hàng"){

            changeMode(1)
        }else if(option === "Xem đơn hàng"){
            changeMode(2)
        }
    };
    return (
        <div>
            
            <div className='filterButtons py-5'>
                <Dropdown
                    text={historyMode === 1 ? "Xem kiện hàng" : historyMode ===2 ? "Xem đơn hàng" : "Không có view"}
                    options={options}
                    onSelect={handleOptionSelect}
                />
			</div>
            <table className="table table-hover historyTable">
                <thead>
                    <tr>
                        {
                         historyMode ===1 &&   headerLabels1.map(item => (
                                <th key={item}>{item}</th>
                            ))
                        }
                        {
                          historyMode ===2 &&  headerLabels2.map(item => (
                                <th key={item}>{item}</th>
                            ))
                        }
                    </tr>
                </thead>
                <tbody>
                    {
                    historyMode ===1 && packagesByStatus &&    packagesByStatus.map((item,index) => {
                            return (
                                <tr key={item.id}>
                                    <td>{index+1}</td>
                                    <td>{item.id}</td>
                                    <td>{item.name}</td>
                                    <td>{item.weight}</td>
                                    
                                    <td>{item.orders.length}</td>
                                    
                                    <td>{item.price}</td>
                                    <td>
											<p>{moment(item.createdAt).format('HH:mm')}</p>
											<p>{moment(item.createdAt).format('DD/MM/YYYY')}</p>
									</td>
                                </tr>
                            )
                        })
                    }
                    {
                    historyMode ===2 && ordersByStatus &&    ordersByStatus.map((item,index) => {
                            if(item.shipperId)return
                            return (
                                <tr key={item.id}>
                                    <td>{index+1}</td>
                                    <td>{item.id}</td>
                                    <td>{item.service}</td>
                                    <td>{item.weight}</td>
                                    <td>{item.price}</td>
                                    <td>
											<p>{moment(item.createdAt).format('HH:mm')}</p>
											<p>{moment(item.createdAt).format('DD/MM/YYYY')}</p>
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
