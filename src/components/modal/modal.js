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
  product: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    proteins: PropTypes.number.isRequired,
    fat: PropTypes.number.isRequired,
    carbohydrates: PropTypes.number.isRequired,
    calories: PropTypes.number.isRequired,
    price: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
    image_mobile: PropTypes.string.isRequired,
    image_large: PropTypes.string.isRequired,
    __v: PropTypes.number.isRequired,
  }),
}

export default Modal;