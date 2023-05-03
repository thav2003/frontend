import React from 'react';
import './css/Modal.scss';

const Modal = ({ handleClose, show, header, body, footer, styleModalMain }) => {
	const showHideStyle = {
		display: show ? 'block' : 'none',
	};
	return (
		<div className='modal' style={showHideStyle}>
			<section className='modal-main' style={styleModalMain}>
				<div className='modal-header'>{header}</div>
				<div className='modal-body'>{body}</div>
				<div className='modal-footer'>{footer}</div>
			</section>
		</div>
	);
};

export default Modal;
