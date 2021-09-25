import React from 'react';
import ReactDOM from 'react-dom';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom'; 
import { CLEAN_DETAILED } from '../../services/actions';

import modalStyles from './modal.module.css';
import ModalOverlay from '../modal-overlay/modal-overlay';

function Modal(props:{ modaltype?:string; clickHandle?: (event:React.SyntheticEvent) => void; isVisible?: boolean; children?: any; }) {
	const modalRoot:any = document.getElementById("modals");
  let history = useHistory();
  const dispatch = useDispatch();

  let back:any = (e:React.SyntheticEvent) => {
    e.stopPropagation();
    history.goBack();
  }

  if ( props.isVisible ) {
    back = props.clickHandle;
  } 

  function handleUserKeyPress(event:any) { 
    if (event.keyCode === 27) {
      !props.isVisible ? back(event) : props.clickHandle!(event);
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

export default Modal;