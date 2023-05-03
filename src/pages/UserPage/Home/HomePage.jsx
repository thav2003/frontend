import React, { useEffect } from 'react';
import './assets/Home.scss'
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Home = () => {

  return (
    <div className="home">
      <main>
        <section className="services">
          <h2>Dịch vụ của chúng tôi</h2>

          <div className="service">
            <h3>Giặt ủi</h3>
            <p> Chuyên nhận giặt ủi tất cả các loại quần, áo, chăn, ga với máy móc hiện đại, cùng quy trình chuẩn.</p>
            <Link to="/order">
              <button>
                Đặt ngay
              </button>
            </Link>
          </div>
          <div className="service">
            <h3>Giặt sấy</h3>
            <p> Chuyên nhận giặt ủi tất cả các loại quần, áo, chăn, ga với máy móc hiện đại, cùng quy trình chuẩn.</p>
          </div>
        </section>

        <div className="section">
            <div className="title">Quy trình giao nhận hàng đơn giản</div>
            <div className="row">
                <div className="column">
                    <div className="column-content">
                        <div className="image">
                            <img 
                                src="https://giatsaynhanh.vn/wp-content/uploads/2018/03/Quy-Trnh-Giao-Nhn-Bc-1-GiatSayNhanh.png" 
                                className="scale-with-grid" 
                                alt="Quy-Trnh-Giao-Nhan-Bc-2-GiatSayNhanh" 
                                width="149" 
                                height="107"
                            />
                            <span className="number">1</span>
                        </div>
                        <h4>Thu gom quần áo bẩn của bạn</h4>
                        <div className="desc">
                        Chọn các phương thức ở các góc trang để được Giặt Sấy Nhanh hồ trợ
                        </div>
                    </div>
                </div>
                <div className="column">
                    <div className="column-content">
                        <div className="image">
                            <img src="https://giatsaynhanh.vn/wp-content/uploads/2018/03/Quy-Trnh-Giao-Nhn-Bc-2-GiatSayNhanh.png" className="scale-with-grid" alt="Quy-Trnh-Giao-Nhan-Bc-2-GiatSayNhanh" width="149" height="107"/>
                            <span className="number">2</span>
                        </div>
                        <h4>Nhận hàng</h4>
                        <div className="desc">
                        Nhân viên cửa hàng giặt sấy tự động FStore sẽ có mặt ngay thời điểm được hẹn để tiếp nhận hàng hóa một cách chuyên nghiệp nhất.
                        </div>
                    </div>
                </div>
                <div className="column">
                    <div className="column-content">
                        <div className="image">
                            <img src="https://giatsaynhanh.vn/wp-content/uploads/2018/05/buoc-3-giat-quan-ao.png" className="scale-with-grid" alt="Quy-Trnh-Giao-Nhan-Bc-2-GiatSayNhanh" width="149" height="107"/>
                            <span className="number">3</span>
                        </div>
                        <h4>Giặt quần áo</h4>
                        <div className="desc">
                        Chúng tôi làm sạch quần áo của bạn
                        </div>
                    </div>
                </div>
                <div className="column">
                    <div className="column-content">
                        <div className="image">
                            <img src="https://giatsaynhanh.vn/wp-content/uploads/2018/03/Quy-Trnh-Giao-Nhn-Bc-4-GiatSayNhanh.png" className="scale-with-grid" alt="Quy-Trnh-Giao-Nhan-Bc-2-GiatSayNhanh" width="149" height="107"/>
                            <span className="number">4</span>
                        </div>
                        <h4>Gấp và Giao Quần Áo</h4>
                        <div className="desc">
                        Những bộ quần áo sạch sẽ, gọn hàng sẽ được giặt ủi giao nhận nơi cho khách hàng
                        </div>
                    </div>
                </div>
                
            </div>
        </div>
      </main>
      <footer style={{marginTop:'50px'}}>
        <div className="contact">
          <h3>Liên hệ</h3>
          <p>Địa chỉ: 123 Đường ABC, Quận XYZ, TP HCM</p>
          <p>Số điện thoại: 0123456789</p>
          <p>Email: info@giatui.com</p>
        </div>
      </footer>
    </div>
  );
};
export default Home