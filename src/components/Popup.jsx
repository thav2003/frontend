import React from 'react';
import './css/Popup.scss';

const Popup = ({ message, onClose }) => {
	return (
		<div className='popup'>
			<div className='popup-content success'>
				<div className='popup-body'>{message}</div>
				<button className='popup-close' onClick={onClose}>
					X
				</button>
			</div>
		</div>
	);
};

export default Popup;
