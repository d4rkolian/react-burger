import React from 'react';
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'

import modalStyles from './modal.module.css';
import IngredientDetails from '../ingredient-details/ingredient-details';
import OrderDetails from '../order-details/order-details';

function Modal(props) {
	const modalRoot = document.getElementById("modals");
	let component = null;
  switch(props.modaltype) {
    case "ingredients":
      component = <IngredientDetails product={props.product.product} />;
      break;
    case "order":
    	component = <OrderDetails />;
    	break;
    default:
      component = 'Сюда поставить компонент-заглушку модалки';
  } 

  return ReactDOM.createPortal((
		<div className={modalStyles.modal} >
			<span className={modalStyles.close} onClick={props.clickHandle}>&times;</span>
			{component}
		</div>
  ), modalRoot);
}

Modal.propTypes = {
  modaltype: PropTypes.string,
  clickHandle: PropTypes.func.isRequired,
  product: PropTypes.object
}

export default Modal;