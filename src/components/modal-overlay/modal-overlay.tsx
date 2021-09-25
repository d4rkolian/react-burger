import React from 'react';
import modalOStyles from './modal-overlay.module.css';

function ModalOverlay(props:{ clickHandle: () => void; }) {
	return (
		<div className={modalOStyles.overlay} onClick={props.clickHandle}></div>
	);
}

export default ModalOverlay;