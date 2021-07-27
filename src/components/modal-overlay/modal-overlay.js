import React from 'react';
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'

import modalOStyles from './modal-overlay.module.css';

function ModalOverlay(props) {
	const modalRoot = document.getElementById("modals");
	return ReactDOM.createPortal((
		<div className={modalOStyles.overlay} onClick={props.clickHandle}></div>
	), modalRoot);

}

ModalOverlay.propTypes = {
	clickHandle: PropTypes.func.isRequired,
}

export default ModalOverlay;