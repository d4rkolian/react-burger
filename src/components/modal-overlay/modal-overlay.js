import React from 'react';
import ReactDOM from 'react-dom'
import modalOStyles from './modal-overlay.module.css';

function ModalOverlay(props) {
	const modalRoot = document.getElementById("modals");
	return ReactDOM.createPortal((
		<div className={modalOStyles.overlay} onClick={props.clickHandle}></div>
	), modalRoot);

}

export default ModalOverlay;