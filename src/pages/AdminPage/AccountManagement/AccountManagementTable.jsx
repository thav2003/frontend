import React, { useState, useEffect } from 'react'
import _ from 'lodash'
import Modal from '../../../components/Modal'
import Popup from '../../../components/Popup'
import { createAccount, updateAccount, setCurrentPage, setPageSize, selectCurrentPage, selectPageSize, selectData, selectTotalPages, fetchAccounts } from '../../../redux/reducers/accountManagementReducer';
import { useDispatch, useSelector } from 'react-redux';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';

export default function AccountManageMentTable() {
    const headerLabels = ['Tên tài khoản', 'Trạng thái', 'Email', 'Loại tài khoản', '']
    const dispatch = useDispatch();
    const currentPage = useSelector(selectCurrentPage);
    const pageSize = useSelector(selectPageSize);
    const data = useSelector(selectData);
    const totalPages = useSelector(selectTotalPages);
    // const [currentPage, setCurrentPage] = useState(1);
    // const [itemsPerPage, setItemsPerPage] = useState(5);

    // const indexOfLastItem = currentPage * itemsPerPage;
    // const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    // const currentItems = data ? data.slice(indexOfFirstItem, indexOfLastItem) : [];

    // const totalPages = data ? Math.ceil(data.length / itemsPerPage) : 0;

    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [role, setRole] = useState(2);
    const [password, setPassword] = useState("");
    const [address, setAddress] = useState("");

    const [location, setLocation] = useState("");
    const [store, setStore] = useState(0);
    const [station, setStation] = useState(0);

    const [showModal, setShowModal] = useState(false);
    const [showPopup, setShowPopup] = useState(false);

    const handleButtonClick = () => {
        setShowPopup(true);
    };

    const handleClosePopup = () => {
        setShowPopup(false);
    };


    const handleCloseModal = () => {
        setShowModal(false);
    };

    const handleFullNameChange = (event) => {
        setFullName(event.target.value);
    };

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const handlePhoneChange = (event) => {
        const inputName = event.target.value;
        if(inputName.length <= 10){
            setPhone(inputName);
        } else {
            setPhone(inputName.slice(0, 10));
        }
    
    };

    const handleRoleChange = (event) => {
        setRole(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleAddressChange = (event) => {
        setAddress(event.target.value);
    };

    const handleClear = (event) => {
        setFullName('')
        setEmail('')
        setPhone('')
        setRole(3)
        setPassword('')
        setAddress('')
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        // Xử lý dữ liệu ở đây
        const data = {
            FullName: fullName,
            Email: email,
            Phone: phone,
            Role: parseInt(role, 10),
            Password: password,
            Address: address,
            Location:location,
            StoreId:store,
            StationId:station,
        }
        dispatch(createAccount(data));
        setShowPopup(true);
        handleClear();
    };

    const handleBan = (id) => {
        let bodyFormData = new FormData();
        bodyFormData.append("IsDeleted", 1)
        bodyFormData.append("id", id)

        dispatch(updateAccount(bodyFormData));
    }
    const handleUnBanned = (id) => {
        let bodyFormData = new FormData();
        bodyFormData.append("IsDeleted", 0)
        bodyFormData.append("id", id)
        dispatch(updateAccount(bodyFormData));
    }


    useEffect(() => {
        dispatch(fetchAccounts(pageSize, currentPage));
    }, [dispatch, pageSize, currentPage]);

    const handleClick = (event) => {
        dispatch(setCurrentPage(Number(event.target.id)));
    };

    const handlePrevClick = () => {
        if (currentPage > 1) {
            dispatch(setCurrentPage(currentPage - 1));
        }
    };

    const handleNextClick = () => {
        if (currentPage < totalPages) {
            dispatch(setCurrentPage(currentPage + 1));
        }
    };

    const renderPageNumbers = () => {
        const pageNumbers = [];
        for (let i = 1; i <= totalPages; i++) {
            pageNumbers.push(
                <li key={i} id={i} onClick={handleClick} className={currentPage === i ? "active" : null}>
                    {i}
                </li>
            );
        }
        return pageNumbers;
    };
    const modalBody = (
        <form onSubmit={handleSubmit} style={{ backgroundColor: "#fff", color: "#333", padding: "20px", borderRadius: "5px" }}>
            <label htmlFor="fullName">Họ và tên:</label>
            <input type="text" id="fullName" required value={fullName} onChange={handleFullNameChange} style={{ width: "100%", padding: "10px", marginBottom: "10px", border: "1px solid #ccc", borderRadius: "5px" }} />

            <label htmlFor="email">Email:</label>
            <input type="text" id="email" required value={email} onChange={handleEmailChange} style={{ width: "100%", padding: "10px", marginBottom: "10px", border: "1px solid #ccc", borderRadius: "5px" }} />

            <label htmlFor="phone">Số điện thoại:</label>
            <input type="text" id="phone" required value={phone} onChange={handlePhoneChange} style={{ width: "100%", padding: "10px", marginBottom: "10px", border: "1px solid #ccc", borderRadius: "5px" }} />

            <label htmlFor="role">Vai trò:</label>
            <select id="role" value={role} onChange={(event) => setRole(event.target.value)} style={{ width: "100%", padding: "10px", marginBottom: "10px", border: "1px solid #ccc", borderRadius: "5px" }} >
                <option value={1}>Admin</option>
                <option value={2}>Manager</option>
                {/* <option value={3}>Customer</option> */}
                <option value={4}>Shipper</option>
                <option value={5}>Store</option>
            </select>
            {role==4 &&
                <>
                    <label htmlFor="location">Location:</label>
                    <select id="location" value={location} required onChange={(event) => setLocation(event.target.value)} style={{ width: "100%", padding: "10px", marginBottom: "10px", border: "1px solid #ccc", borderRadius: "5px" }} >
                        <option value=''>Chọn Location</option>
                        <option value='Quận 7'>Quận 7</option>
                        <option value='Quận Tân Bình'>Quận Tân Bình</option>
                        {/* <option value={3}>Customer</option> */}
                        <option value='Quận Tân Phú'>Quận Tân Phú</option>
                        <option value='Quận Gò Vấp'>Quận Gò Vấp'</option>
                    </select>
                </>
            }
            {role==2 &&
                <>
                    <label htmlFor="station">Station:</label>
                    <select id="station" required onChange={(event) => setStation(event.target.value)} style={{ width: "100%", padding: "10px", marginBottom: "10px", border: "1px solid #ccc", borderRadius: "5px" }} >
                        <option value=''>Chọn Station</option>
                        <option value={1}>Kho 1 Quận 7</option>
                    </select>
                </>
            }
            {role==5 &&
                <>
                    <label htmlFor="store">Store:</label>
                    <select id="location" required onChange={(event) => setStore(event.target.value)} style={{ width: "100%", padding: "10px", marginBottom: "10px", border: "1px solid #ccc", borderRadius: "5px" }} >
                        <option value=''>Chọn Store</option>
                        <option value={1}>Cửa hàng 1 Quận Gò Vấp</option>
                        <option value={2}>Cửa hàng 1 Quận Tân Bình</option>
                        {/* <option value={3}>Customer</option> */}
                        <option value={3}>Cửa hàng 1 Quận Tân Phú</option>
                        <option value={4}>Cửa hàng 1 Quận 7</option>
                        <option value={5}>Cửa hàng 2 Quận 7</option>
                        <option value={6}>Cửa hàng 3 Quận 7</option>
                    </select>
                </>
            }
            <label htmlFor="password">Mật khẩu:</label>
            <input type="password" id="password" required value={password} onChange={handlePasswordChange} style={{ width: "100%", padding: "10px", marginBottom: "10px", border: "1px solid #ccc", borderRadius: "5px" }} />

            <label htmlFor="address">Địa chỉ:</label>
            <input type="text" id="address" value={address} onChange={handleAddressChange} style={{ width: "100%", padding: "10px", marginBottom: "10px", border: "1px solid #ccc", borderRadius: "5px" }} />

            <button type="submit" style={{ backgroundColor: "#007bff", color: "#fff", padding: "10px 20px", borderRadius: "5px", border: "none", marginRight: "10px" }}>Lưu</button>
            <button className='btn btn-danger' onClick={handleClear} style={{ color: "#fff", padding: "10px 20px", borderRadius: "5px", border: "none" }}>Hủy</button>
            {showPopup && (
                <Popup message="Thao tác thành công!" onClose={handleClosePopup} />
            )}
        </form>
    );
    return (
        <div>
            <div className='createAccountBtn py-5'>
                <button className='btn btn-primary' onClick={() => setShowModal(true)}>+ Tạo tài khoản mới</button>
            </div>
            <Modal
                show={showModal}
                handleClose={handleCloseModal}
                styleModalMain={{ top: '50px' }}
                header={<h2>Tạo tài khoản</h2>}
                body={modalBody}
                footer={<button onClick={handleCloseModal}>Đóng</button>}
            />

            <table className="table accountManagementTable">
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
                    {data.map((item) => {
                        let type;
                        if (item.role == 3) {
                            type = "Customer";
                        } else if (item.role == 4) {
                            type = "Shipper";
                        } else if (item.role == 2) {
                            type = "Manager";
                        } else if (item.role == 1) {
                            type = "Admin";
                        } else if (item.role == 5) {
                            type = "Store";
                        }
                        return (
                            <tr key={item.id}>
                                <td>{item.fullName}</td>
                                <td>{item.isDeleted == 0 ? <p className='activeStatus'>Active</p> : <p className='bannedStatus'>Banned</p>}</td>
                                <td>{item.email}</td>
                                <td>{type}</td>
                                <td>
                                    {item.isDeleted == 0 ? (
                                        <button className="banBtn" onClick={() => handleBan(item.id)}>
                                            Ban
                                        </button>
                                    ) : (
                                        <button className="unbanBtn" onClick={() => handleUnBanned(item.id)}>
                                            Unban
                                        </button>
                                    )}
                                    {/* <DeleteForeverIcon className='dltBtn' /> */}
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
            <div className="pagination">
                <button onClick={handlePrevClick} disabled={currentPage === 1}>
                    Prev
                </button>
                <ul className="pageNumbers">{renderPageNumbers()}</ul>
                <button onClick={handleNextClick} disabled={currentPage === totalPages}>
                    Next
                </button>
            </div>
        </div>
    )
}
