import React from 'react';
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'

import modalStyles from './modal.module.css';
import ModalOverlay from '../modal-overlay/modal-overlay';

function Modal(props) {
	const modalRoot = document.getElementById("modals");
  return ReactDOM.createPortal((
    <>
  		<div className={modalStyles.modal} >
  			<span className={modalStyles.close} onClick={props.clickHandle}>&times;</span>
  			{props.children}
  		</div>
      <ModalOverlay clickHandle={props.clickHandle} />
    </>
  ), modalRoot);
}

Modal.propTypes = {
  modaltype: PropTypes.string,
  clickHandle: PropTypes.func.isRequired,
  product: PropTypes.object
}

export default Modal;