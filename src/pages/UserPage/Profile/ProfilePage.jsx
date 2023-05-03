import React,{useState} from 'react';
import './assets/Profile.scss'
import { useFormik } from 'formik';
import Dropzone from 'react-dropzone';
import Modal from '../../../components/Modal';
import { useEffect } from 'react';
import { toast } from "react-toastify";
import { updatePasswordAPI } from '../../../api/apis';
const ProfilePage = ({accountInfors,updateUser}) => {
    const [openModal, setOpenModal] = useState(false)
    const [openModal2, setOpenModal2] = useState(false)
    const [file, setFile] = useState(null);
    const [preview, setPreview] = useState(null);
    const formik = useFormik({
        initialValues: {
            name: accountInfors.fullName,
            address: accountInfors.address,
            phone:accountInfors.phone,
        },
        validate: (values) => {
            const errors = {};
            //validate email
          
        
            //validate phone
            if (!values.phone) {
              errors.phone = "Vui lòng nhập số điện thoại";
            } else if (!/^\d{10,11}$/i.test(values.phone)) {
              errors.phone = "Số điện thoại không hợp lệ";
            }
            return errors
        },
        onSubmit: (values) => {
            handleSubmit(values)
        },
    });
    const formik2 = useFormik({
		initialValues: {
            currentPassword:'',
			password: '',
			confirmPassword: '',
		},
        validate: (values) => {
			const errors = {};
            if (values.currentPassword.length < 6 || values.currentPassword.length > 18) {
				errors.currentPassword = 'Mật khẩu cũ từ 6 đến 18 kí tự';
			}
            if (values.password.length < 6 || values.password.length > 18) {
				errors.password = 'Mật khẩu từ 6 đến 18 kí tự';
			}
            if (values.password !== values.confirmPassword) {
                errors.confirmPassword = "Mật khẩu không khớp";
              }
			return errors;
		},
		onSubmit: (values) => {
			handleChangePassword(values);
		},
	});
    const handleCloseModal = () => {
        setOpenModal(false);
        setFile(null)
        setPreview(null)
        formik.resetForm();
    };
    const handleCloseModal2 = () => {
        setOpenModal2(false);
        formik2.resetForm();
    };
    const handleDrop = (acceptedFiles) => {
        const currentFile = acceptedFiles[0];
        setFile(currentFile);
        const reader = new FileReader();
        reader.onloadend = () => {
          setPreview(reader.result);
        };
        reader.readAsDataURL(currentFile);
      };
    const handleChangePassword=(values)=>{
        const payload={
            passwordCurrent: values.currentPassword,
            password: values.password,
            passwordConfirm: values.confirmPassword
        }
        console.log(payload)
        updatePasswordAPI(payload)
            .then((res)=>{
                console.log(res)
                toast.success('Đã thay đổi mật khẩu thành công', {
                    position: toast.POSITION.BOTTOM_RIGHT,
                })
                handleCloseModal2()
            })
            .catch(e=>{
                console.log(e)
                toast.error(e.response.data.error, {
                    position: toast.POSITION.BOTTOM_RIGHT,
                })
            })
    }
    const handleSubmit=(values)=>{
        const formData = new FormData();
        formData.append("fullName",values.name)
        formData.append("avatar",file)
        
        formData.append("address",values.address)
        formData.append("phone",values.phone)
        updateUser(formData)
    }
      
    const modalBody =()=> {
       
        return(
            <section className="profile-page">
                
                <h2 className="text-xl font-semibold mt-4">Thông tin cá nhân</h2>
                <hr />
                
                <div className="avatar-wrapper">
                    <Dropzone onDrop={handleDrop}>
                    {({getRootProps, getInputProps}) => (
                        <div {...getRootProps()} className="avatar-container">
                        <input {...getInputProps()} />
                        <img src={preview ? preview : `https://api.giangpt.dev/Upload/${accountInfors?.photo}`} alt="avatar" className="avatar" />
                        <div className="avatar-overlay">
                            <p>Chọn ảnh đại diện</p>
                        </div>
                        </div>
                    )}
                    </Dropzone>
                </div>
                <form className="profile-form" onSubmit={formik.handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="name">Tên</label>
                        <input type="text"
                            id="name"
                            name="name"
                            required
                            
                            defaultValue={formik.values.name}
                            onChange={formik.handleChange}
                        />
                    </div>
                    
                    <div className="form-group">
                        <label htmlFor="phone">Số điện thoại</label>
                        <input type="text"
                            id="phone"
                            name="phone"
                            required
                            
                            defaultValue={formik.values.phone}
                            onChange={formik.handleChange}
                        />
                        {formik.errors.phone && (
							<small id='phoneHelp' className='form-text text-danger'>
								{formik.errors.phone}
							</small>
						)}
                    </div>
                    <div className="form-group">
                        <label htmlFor="address">Địa chỉ</label>
                        <input type="text"
                            id="address"
                            name="address"
                            required
                            
                            defaultValue={formik.values.address}
                            onChange={formik.handleChange}
                        />
                    </div>
                    <div  style={{width:'100%',display:'flex',justifyContent:'center',alignItems:'center'}}>
                        <button type="submit">Xác nhận</button>
                    </div>
                </form>
                
            </section>
        )
       
    }
    const modalBody2 =()=> {
       
        return(
            <section className="profile-page">
                
                <h2 className="text-xl font-semibold mt-4">Thay đổi mật khẩu</h2>
                <hr />
                
                <form className="profile-form" onSubmit={formik2.handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="currentPassword">Mật khẩu hiện tại:</label>
                        <input type="text"
                            id="currentPassword"
                            name="currentPassword"
                            required
                            
                            value={formik2.values.currentPassword}
                            onChange={formik2.handleChange}
                        />
                        {formik2.errors.currentPassword && (
							<small  className='form-text text-danger'>
								{formik2.errors.currentPassword}
							</small>
						)}
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Mật khẩu mới:</label>
                        <input type="text"
                            id="password"
                            name="password"
                            required
                            
                            value={formik2.values.password}
                            onChange={formik2.handleChange}
                        />
                        {formik2.errors.password && (
							<small  className='form-text text-danger'>
								{formik2.errors.password}
							</small>
						)}
                    </div>
                    
                    <div className="form-group">
                        <label htmlFor="confirmPassword">Xác nhận mật khẩu mới:</label>
                        <input type="text"
                            id="confirmPassword"
                            name="confirmPassword"
                            required
                            onBlur={formik2.handleBlur}
                            value={formik2.values.confirmPassword}
                            onChange={formik2.handleChange}
                        />
                        {formik2.touched.confirmPassword && formik2.errors.confirmPassword ? (
                   
                            <small className='form-text text-danger'>
                                {formik2.errors.confirmPassword}
                            </small>
                        ) : null}
                    </div>
                    <div  style={{width:'100%',display:'flex',justifyContent:'center',alignItems:'center'}}>
                        <button type="submit">Xác nhận</button>
                    </div>
                </form>
                
            </section>
        )
       
    }

  return (
    <>
        <Modal
            show={openModal}
            handleClose={handleCloseModal}
            header={<h2>Cập nhật thông tin</h2>}
            body={modalBody()}
            footer={
                <div>
                    <button className='btn btn-danger' onClick={handleCloseModal}>Đóng</button>
                </div>
            }
        />
        <Modal
            show={openModal2}
            handleClose={handleCloseModal2}
            header={<h2>Cập nhật mật khẩu</h2>}
            body={modalBody2()}
            footer={
                <div>
                    <button className='btn btn-danger' onClick={handleCloseModal2}>Đóng</button>
                </div>
            }
        />
        <section className="profile-page">
            
            <h2 className="text-xl font-semibold mt-4">Thông tin cá nhân</h2>
            <hr />
            <div className="avatar-wrapper">
              
                <div  className="avatar-container">
               
                    <img src={`https://api.giangpt.dev/Upload/${accountInfors?.photo}`} alt="avatar" className="avatar" />
                  
                </div>
                
            </div>
            <div className="profile-form">
                <div className="form-group">
                    <label htmlFor="name">Tên</label>
                    <input type="text"
                        id="name"
                        name="name"
                        readOnly
                        value={accountInfors?.fullName}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="mail">Email</label>
                    <input type="text"
                        id="mail"
                        name="mail"
                        readOnly
                        value={accountInfors?.email}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="phone">Số điện thoại</label>
                    <input type="text"
                        id="phone"
                        name="phone"
                        readOnly
                        value={accountInfors?.phone}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="address">Địa chỉ</label>
                    <input type="text"
                        id="address"
                        name="address"
                        readOnly
                        value={accountInfors?.address}
                    />
                </div>

            </div>
            <div className='' style={{width:'100%',display:'flex',justifyContent:'center',alignItems:'center', gap:'10px'}}>
                <button type='button' onClick={()=>setOpenModal(true)}>Cập nhật</button>
                <button type='button' onClick={()=>setOpenModal2(true)}>Đổi mật khẩu</button>
            </div>
        </section>
    </>
    
  );
};

export default ProfilePage;