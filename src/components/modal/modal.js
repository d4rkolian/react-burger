import React from 'react';
import ReactDOM from 'react-dom';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom'; 
import PropTypes from 'prop-types'
import { CLEAN_DETAILED } from '../../services/actions';

import modalStyles from './modal.module.css';
import ModalOverlay from '../modal-overlay/modal-overlay';

function Modal(props) {
	const modalRoot = document.getElementById("modals");
  let history = useHistory();
  const dispatch = useDispatch();

  let back = e => {
    e.stopPropagation();
    history.goBack();
  }

  if ( props.isVisible ) {
    back = props.clickHandle;
  } 

  function handleUserKeyPress(event) { 
    if (event.keyCode === 27) {
      !props.isVisible ? back(event) : props.clickHandle(event);
      dispatch({type: CLEAN_DETAILED});
    }
  }

  React.useEffect(
    () => {
      window.addEventListener('keydown', handleUserKeyPress);
      return () => {
        window.removeEventListener('keydown', handleUserKeyPress);
      };
    }
  ,[]
  );

  return ReactDOM.createPortal((
    <>
  		<div className={modalStyles.modal} >
  			<span className={modalStyles.close} onClick={back}>&times;</span>
  			{props.children}
  		</div>
      <ModalOverlay clickHandle={back} />
    </>
  ), modalRoot);
}

Modal.propTypes = {
  modaltype: PropTypes.string,
}

export default Modal;