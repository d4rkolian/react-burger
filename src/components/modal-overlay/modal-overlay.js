import React from 'react';
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'

import modalOStyles from './modal-overlay.module.css';

function ModalOverlay(props) {
	return (
		<div className={modalOStyles.overlay} onClick={props.clickHandle}></div>
	);
}

ModalOverlay.propTypes = {
	clickHandle: PropTypes.func.isRequired,
}

export default ModalOverlay;