import React, { useEffect, useState } from 'react'
import './assets/PackageManagement.scss'
import moment from 'moment';
import Modal from '../../../components/Modal';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { STATUS } from '../../../utils/Constant';
export default function PackageManagementTable({ data,handleConfirmPackage,handleConfirmOrder}) {
    const headerLabels = ["STT",'Mã kiện hàng', 'Tên kiện hàng', 'Tổng khối lượng(kg)', 'Số lượng', 'Trạng thái','Thời gian trả hàng','Hành động']
    const [openModal, setOpenModal] = useState(false)
    const [popUp,setPopUp]=useState([])
    const [popUp2,setPopUp2]=useState({})
    const [openModal2, setOpenModal2] = useState(false)
    const dispatch = useDispatch();
    const navigate = useNavigate();
    console.log(data)
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;
  
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentItems = data.slice(startIndex, endIndex);
  
    const handlePageChange = (pageNumber) => {
      setCurrentPage(pageNumber);
    };

    const handleCloseModal = () => {
        setOpenModal(false);
    };
    const handleCloseModal2 = () => {
        setOpenModal2(false);
    };
    const modalBody2=(
        <table className="table">
        <thead>
        <tr>
            <th>STT</th>
            <th>Dịch vụ yêu cầu</th>
            <th>Khối lượng(kg)</th>
            <th>Giá tiền</th>
        </tr>
        </thead>
        <tbody>
            {popUp2.orderDetails && popUp2.orderDetails.map((orderdetail,index)=>(
                <tr key={orderdetail.id}>
                    <td>{index+1}</td>
                    <td>{orderdetail.product.name}</td>
                    <td>{orderdetail.weight}</td>
                    <td>{orderdetail.price}</td>
                    
                </tr>
            ))}
        
        </tbody>
    </table>
    )
   const modalBody = (
    
        <>
            <Modal
                show={openModal2}
                handleClose={handleCloseModal2}
                header={<h2>Chi tiết đơn hàng</h2>}
                body={modalBody2}
                footer={
                    <div>
                        <button className='btn btn-danger' onClick={handleCloseModal2}>Đóng</button>
                    </div>
                }
            />
            <table className="table">
                <thead>
                <tr>
                    <th>STT</th>
                    <th>Mã đơn hàng</th>
                    <th>Dịch vụ yêu cầu</th>
                    <th>Khối lượng(kg)</th>
                    <th>Gía tiền</th>
                    <th>Trạng thái</th>
                    <th>Ghi chú</th>
                    <th>Action</th>
                </tr>
                </thead>
                <tbody>
                    {popUp.orders && popUp.orders.map((order,index)=>(
                        <tr key={order.id}>
                            <td>{index+1}</td>
                            <td>{order.id}</td>
                            <td>{order.service}</td>
                            <td>{order.weight}</td>
                            <td>{order.price}</td>
                            <td>{STATUS[order.status]}</td>
                            
                            <td>{order.decription}</td>
                            <td>
                                <div className="action-buttons">
                                    <button className="view-button" onClick={()=>{setOpenModal2(true),setPopUp2(order)}}>Xem</button>
                                    <button className="update-button" onClick={()=>{
                                        handleConfirmOrder(order.id,4)
                                        const temp=popUp;
                                        
                                        setPopUp(temp);
                                    }}>Xác nhận</button>
                                </div>
                            </td>
                        </tr>
                    ))}
                
                </tbody>
            </table>
        </>

    );
  
   
    return (
        <div>
            <Modal
                show={openModal}
                handleClose={handleCloseModal}
                header={<h2>Chi tiết kiện hàng</h2>}
                body={modalBody}
                footer={
                    <div>
                        <button className='btn btn-danger' onClick={handleCloseModal}>Đóng</button>
                    </div>
                }
            />
            <div  style={{overflowX: 'scroll', overflowY: 'scroll', height: '420px'}}>
                <table className="table table-hover packageManagementTable">
                    <thead style={{ position: "sticky",top:-1,backgroundColor:'white',zIndex:20}}>
                    <tr>
                        {headerLabels.map((item) => (
                        <th key={item}>{item}</th>
                        ))}
                    </tr>
                    </thead>
                    <tbody>
                    {currentItems.map((item, index) => {
                        return (
                        <tr
                            key={item.id}
                            onClick={() => {
                            if (item.status ===3)  {
                                setOpenModal(true), setPopUp(item);
                            }
                            }}
                        >
                            <td>{startIndex + index + 1}</td>
                            <td>{item.id}</td>
                            <td>{item.name}</td>
                            <td>{item.weight}</td>
                            <td>{item.orders.length}</td>
                            <td>
                            <p className="progess">{STATUS[item.status]}</p>
                            </td>
                            <td>
                                {item.status !== 0 && item.status !== 3 && item.status !== 4
                                    && (
                                        <>
                                            <p>{moment(item.updatedAt).format("HH:mm")}</p>
                                            <p>{moment(item.updatedAt).format("DD/MM/YYYY")}</p>
                                        </>
                                    )                            
                                }
                            
                            </td>
                            <td>
                            <button
                                className={`btn btn-primary`}
                                disabled={item.status != 1 ? true : false}
                                onClick={() => handleConfirmPackage(item.id, 2)}
                            >
                                Xác nhận
                            </button>
                            </td>
                        </tr>
                        );
                    })}
                    </tbody>
                </table>
            </div>
 

            <ul className="pagination" style={{marginTop:'15px'}}>
                {Array.from(
                { length: Math.ceil(data.length / itemsPerPage) },
                (_, i) => (
                    <li
                    key={i}
                    className={`page-item ${i + 1 === currentPage ? "active" : ""}`}
                    >
                    <button
                        className="page-link"
                        onClick={() => handlePageChange(i + 1)}
                    >
                        {i + 1}
                    </button>
                    </li>
                )
                )}
            </ul>

            {/* <table className="table table-hover packageManagementTable">
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
                        data.map((item,index) => {
                           
                            return (
                                <tr key={item.id} onClick={()=>{if(item.status!=1){setOpenModal(true),setPopUp(item)}}}>
                                    <td>{index+1}</td>
                                    <td>{item.id}</td>
                                    <td>{item.name}</td>
                                    <td>{item.weight}</td>
                                    <td>{item.orders.length}</td>
                                    <td><p className='progess'>{STATUS[item.status]}</p></td>
                                    <td>
                                        <p>{moment(item.updatedAt).format('HH:mm')}</p>
                                        <p>{moment(item.updatedAt).format('DD/MM/YYYY')}</p>
                                    </td>
                                    <td>
                                        <button className={`btn btn-primary`} disabled={item.status!=1 ? true : false} onClick={()=>handleConfirmPackage(item.id,2)}>Xác nhận</button>
                                    </td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table> */}
        </div>
    )
}
