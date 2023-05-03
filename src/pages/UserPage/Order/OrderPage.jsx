import React, { useState ,useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Popup from '../../../components/Popup'
import { useFormik } from 'formik';
// import {submitBookingAPI} from '../../../api/apis'
import './assets/OrderPage.scss'
import { submitBooking } from '../../../redux/reducers/bookingReducer';
import { useNavigate } from 'react-router-dom';
const DISTRICTS = [
    'Quận 7',
    'Quận Gò Vấp',
    'Quận Tân Bình',
    'Quận Tân Phú'
];
const OrderPage = ({accountInfors,products,locations}) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [total,setTotal]=useState(0)
    const [showPopup, setShowPopup] = useState(false);

    const user = useSelector((state) => state.user);
    // Khởi tạo state để lưu trữ thông tin về các dịch vụ và khối lượng tương ứng
    // const [services, setServices] = useState([
    //     { id: 1, name: 'Combo 1', weight: 0, price: 100000 },
    //     { id: 2, name: 'Combo 2', weight: 0, price: 200000 },
    // ]);
    const [services, setServices] = useState([]);
    console.log(products)
    useEffect(() => {
        
        products && setServices(
            products
              .filter((p) => p.isDeleted === 0)
              .map((p) => ({
                id: p.id,
                name: p.name,
                price: p.price,
                weight: 0,
                select: false,
              }))
          );
    }, [products]);
    useEffect(()=>{
        let total=0;
        services.map(service=>{
            total+=(service.price*service.weight)
        })
        setTotal(total)
    },[services, setServices])
    console.log(services)
    const handleWeightChange = (id, value) => {
          // Nếu giá trị đầu vào không phải là số không âm, không làm gì cả
        if (isNaN(value) || value < 0) {
            setServices((prevServices) =>
            prevServices.map((service) =>
                service.id === id ? { ...service, weight: 0 } : service
            ));
        }else{
        setServices((prevServices) =>
            prevServices.map((service) =>
                service.id === id ? { ...service, weight: value } : service
            )
        );
        }
    }
    const handleOrder =  (data) => {
        console.log(data)
        let totalWeight=0;
        let items = []
        data.services.map(service => {
            const s = services.find((s) => s.id === service)
            const w = s.weight;
            const p = s.price

            items.push({
                productId:s.id,
                weight:w,
                price:p
            })
            totalWeight+=Number(w);
        })

        const payload = {
            price: total,
            address: data.address,
            data: items,
            weight:totalWeight,
            location:data.location,
            description:data.note

        }
        dispatch(submitBooking(payload, navigate('/')))
        // const res=await submitBookingAPI(payload);
        // setShowPopup(true)
        // console.log(res.data)
    };
    const handleClosePopup = () => {
        setShowPopup(false);
      };
    const formik = useFormik({
        initialValues: {
            name: '',
            address: '',
            location: '',
            phone: '',
            pickupDate: '',
            services: [],
            note: '',
        },
        onSubmit: (values, { resetForm }) => {
            if (localStorage.getItem('TOKEN')) {
                handleOrder(values);
                resetForm();
                if(accountInfors?.address!='' || accountInfors?.address !=null){
                    formik.setFieldValue('address',accountInfors?.address)
                }
			}
            
            else window.alert("bạn chưa đăng nhập")
        },
    });




    useEffect(()=>{
        if(accountInfors?.address!='' || accountInfors?.address !=null){
            formik.setFieldValue('address',accountInfors?.address)
        }
    },[accountInfors])
    return (
        <section className="order-page">
            <h2 className="text-xl font-semibold mt-4">Đặt lịch hẹn</h2>
            <hr />

            <form className="order-form" onSubmit={formik.handleSubmit}>
                <div className="form-group">
                    <label htmlFor="name">Tên</label>
                    <input type="text"
                        id="name"
                        name="name"
                        placeholder="Nhập họ tên"
                        required
                        disabled
                        value={accountInfors?.fullName}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="address">
                        Địa chỉ
                        <span className="required">*</span>
                    </label>
                    <input
                        type="text"
                        id="address"
                        name="address"
                        placeholder="Nhập địa chỉ"
                        required
                        value={formik.values.address}
                        onChange={formik.handleChange}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="location">
                        Địa điểm
                        <span className="required">*</span>
                    </label>
                    <select
                        id="location"
                        name="location"
                        required
                        value={formik.values.location} // Sửa value thành formik.values.location
                        onChange={formik.handleChange}
                    >
                        <option value="">Chọn địa điểm</option>
                        {locations && locations.map((item) => (
                                <option key={item} value={item}>
                                    {item}
                                </option>
                            ))}
                    </select>
                </div>

                <div className="form-group">
                    <label htmlFor="phone">Số điện thoại</label>
                    <input
                        type="tel"
                        id="phone"
                        name="phone"
                        placeholder="Nhập sdt"
                        required
                        disabled
                        value={accountInfors?.phone}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="pickup-date">
                        Ngày lấy
                        <span className="required">*</span>
                    </label>
                    <input
                        type="date"
                        id="pickup-date"
                        name="pickupDate"
                        required
                        value={formik.values.pickupDate}
                        onChange={formik.handleChange}
                    />
                </div>

                {/* Hiển thị danh sách các dịch vụ và khung nhập liệu khối lượng tương ứng */}


                <div className="form-group">
                    <label htmlFor="service">
                        Dịch vụ
                        <span className="required">*</span>
                    </label>
                    <div className="service-options">
                        {services.map((service) => {
                            const isRequired = formik.values.services.length === 0;
                            const isChecked = formik.values.services.includes(service.id);
                            const selectClassName = service.select ? "required" : "";
                            
                            return (
                                <div key={service.id} className="service-option">
                                    <input
                                        type="checkbox"
                                        id={service.id}
                                        name="services"
                                        value={service.id}
                                        checked={isChecked}
                                        onChange={(e) => {
                                            const isChecked = e.target.checked;
                                            const services = formik.values.services;
                                            if (isChecked) {
                                                formik.setFieldValue('services', [...services, service.id]);
                                                setServices((prevServices) =>
                                                    prevServices.map((s) =>
                                                        s.id === service.id ? { ...s,select:true } : s
                                                    )
                                                );
                                            } else {
                                                formik.setFieldValue(
                                                    'services',
                                                    services.filter((s) => s !== service.id)
                                                );
                                                setServices((prevServices) =>
                                                    prevServices.map((s) =>
                                                        s.id === service.id ? { ...s, weight: 0,select:false } : s
                                                    )
                                                );
                                            }
                                            handleWeightChange(service.id, isChecked ? 10 : 0);
                                        }}
                                        required={isRequired}
                                    />
                                    <label htmlFor={service.id}>
                                        {service.name}
                                        {isChecked && service.select && <span className="required">*</span>}
                                    </label>
                                    {service.select && (
                                        <div className="input-group suffix">
                                            <input
                                                type="number"
                                                value={service.weight}
                                                onChange={(e) => handleWeightChange(service.id, e.target.value)}
                                            />
                                            <span className="input-group-addon">Kg</span>
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </div>

                <div className="form-group">
                    <label htmlFor="note">Ghi chú</label>
                    <textarea
                        id="note"
                        name="note"
                        rows="3"
                        value={formik.values.note}
                        onChange={formik.handleChange}
                    ></textarea>
                </div>

                <div className="form-group">
                    <label htmlFor="total">Thành tiền dự kiến</label>
                    <span className="total-price">
                        {total.toLocaleString('vi-VN', {
                        style: 'currency',
                        currency: 'VND'
                        })}
                    </span>
                </div>

                <div className="form-group">
                    <button type="submit" className="btn btn-primary">
                        Đặt lịch
                    </button>
                    {showPopup && (
                        <Popup message="Bạn đã đặt lịch thành công" onClose={handleClosePopup} />
                    )}
                </div>
            </form>
        </section>
    );
};

export default OrderPage;