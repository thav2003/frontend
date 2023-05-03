import React,{useState} from "react"

import Modal from "../../../components/Modal";
import Popup from "../../../components/Popup";
import { useDispatch, useSelector } from 'react-redux';
import CurrencyInput from 'react-currency-input-field';
import { useFormik } from 'formik';
export default function ServiceManageMentTable({updatePriceProduct,updateStatusProduct,products,createProduct}) {
    const headerLabels = ['STT','Tên dịch vụ', 'Giá tiền(1kg)', 'Đang phục vụ', '']
    const [showModal, setShowModal] = useState(false);
    const [showPopup, setShowPopup] = useState(false);

    const [showModal2, setShowModal2] = useState(false);
    const [updateId,setUpdateId]=useState(0);
    //create
    const [name,setName]=useState('')
    const [price,setPrice]=useState(0)

    const formik = useFormik({
		initialValues: {
			currentPrice: '',
		},
        
		onSubmit: (values) => {
			handleChangePrice(values);
		},
	});
    const handleChangePrice=(values)=>{
        console.log(values)
        const payload={
            ProductId:updateId,
            Price:values.currentPrice
        }
        updatePriceProduct(payload);
        setShowPopup(true);
    }
    const handleCloseModal = () => {
        setShowModal(false);
    };
    const handleCloseModal2 = () => {
        setShowModal2(false);
    };
    const handleClosePopup = () => {
        setShowPopup(false);
    };
    const handleNameChange = (event) => {
        setName(event.target.value);
    };
    const handlePriceChange = (event) => {
        if (isNaN(event.target.value) || event.target.value < 0) {
            setPrice(0)
        }else{
            setPrice(event.target.value);
        }
       
    };
    const hanldeUpdateStatus=(item)=>{
        const payload={
            ProductId:item.id,
            IsDeleted:item.isDeleted===0 ? 1 : 0
        }
        updateStatusProduct(payload);
        setShowPopup(true);
    }
    const handleSubmit = (event) => {
        event.preventDefault();
        // Xử lý dữ liệu ở đây
        const data = {
            Name: name,
            Price:price,
            Quantity:1
        }
        createProduct(data);
        setShowPopup(true);
        handleClear();
    };
   
    const handleClear = (event) => {
        setName('')
        setPrice(0)
    }
    const modalBody = (
        <form onSubmit={handleSubmit} style={{ backgroundColor: "#fff", color: "#333", padding: "20px", borderRadius: "5px" }}>
            <label label htmlFor="name">Tên dịch vụ</label>
            <input type="text" id="name" value={name} onChange={handleNameChange} required  style={{ width: "100%", padding: "10px", marginBottom: "10px", border: "1px solid #ccc", borderRadius: "5px" }} />
            
            <label htmlFor="price">Giá tiền:</label>
            <div style={{ display: "flex" }}>
                <input type="number" id="price" value={price} onChange={handlePriceChange} required style={{ width: "100%", padding: "10px", marginBottom: "10px", border: "1px solid #ccc", borderRadius: "5px" }} />
                <span style={{ marginLeft: "5px", alignSelf: "center" }}>VND</span>
            </div>
            <button type="submit" style={{ backgroundColor: "#007bff", color: "#fff", padding: "10px 20px", borderRadius: "5px", border: "none", marginRight: "10px" }}>Lưu</button>
            <button onClick={handleClear} className='btn btn-danger' style={{ color: "#fff", padding: "10px 20px", borderRadius: "5px", border: "none" }}>Hủy</button>
            {showPopup && (
                <Popup message="Thao tác thành công!"  onClose={handleClosePopup}/>
            )}
        </form>
    );

    const modalBody2 = (
        <form onSubmit={formik.handleSubmit} style={{ backgroundColor: "#fff", color: "#333", padding: "20px", borderRadius: "5px" }}>

            <label htmlFor="price">Giá tiền:</label>
            <CurrencyInput
                id="currentPrice"
                name="currentPrice"
                placeholder="0 VND"
                defaultValue={formik.values.currentPrice}
                onValueChange={(value) => formik.setFieldValue("currentPrice", value)}
                allowNegativeValue={false}
                decimalsLimit={2}
                suffix=" VND"
                className="form-control"
                />
            <button type="submit" style={{ marginTop:"10px",backgroundColor: "#007bff", color: "#fff", padding: "10px 20px", borderRadius: "5px", border: "none", marginRight: "10px" }}>Lưu</button>

            {showPopup && (
                <Popup message="Thao tác thành công!"  onClose={handleClosePopup}/>
            )}
        </form>
    );
    return (
        <div>
            <div className='createAccountBtn py-5'>
                <button className='btn btn-primary' onClick={() => setShowModal(true)}>+ Thêm dịch vụ mới</button>
            </div>
            <Modal
                show={showModal}
                handleClose={handleCloseModal}
                styleModalMain={{ top: '50px' }}
                header={<h2>Thêm dịch vụ</h2>}
                body={modalBody}
                footer={<button onClick={handleCloseModal}>Đóng</button>}
            />
            <Modal
                show={showModal2}
                handleClose={handleCloseModal2}
                styleModalMain={{ top: '50px' }}
                header={<h2>Cập nhật giá tiền</h2>}
                body={modalBody2}
                footer={<button onClick={handleCloseModal2}>Đóng</button>}
            />

            <table className="table table-hover serviceManagementTable">
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
                        products && products.map((item,index)=>{
                            return(
                                <tr key={item.id} onClick={() => {setShowModal2(true),setUpdateId(item.id)}}>
                                    <td>{index+1}</td>
                                    <td>{item.name}</td>
                                    <td>{item.price}</td>
                                    <td>{item.isDeleted===0?"Còn phục vụ":"Tạm dừng"}</td>
                                    <td>
                                        <div className="action-buttons">
                                            {item.isDeleted===0?(<button onClick={(e)=>{e.stopPropagation(),hanldeUpdateStatus(item)}} >Tạm dừng</button>):(<button onClick={(e)=>{e.stopPropagation(),hanldeUpdateStatus(item)}}>Hoạt dộng</button>)}
                                            
                                        </div>
                                    </td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
            {/* <div className="pagination">
                <button onClick={handlePrevClick} disabled={currentPage === 1}>
                    Prev
                </button>
                <ul className="pageNumbers">{renderPageNumbers()}</ul>
                <button onClick={handleNextClick} disabled={currentPage === totalPages}>
                    Next
                </button>
            </div> */}
        </div>
    )
}