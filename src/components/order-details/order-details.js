import React from 'react';
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'

import oDStyles from './order-details.module.css';

function OrderDetails(props) {
  return (
  	<div className={oDStyles.orderDetails} >
  		<p className={[oDStyles.orderId, "text_type_digits-large"].join(" ")}>034536</p>
  		<span className={oDStyles.subline}>идентификатор заказа</span>
  		<i className={oDStyles.statusIcon}></i>
  		<p className={oDStyles.detailedStatus}>
  			Ваш заказ начали готовить<br/>
  			<span className="text_color_inactive">Дождитесь готовности на орбитальной станции</span>
  		</p>
		</div>
  );
}

OrderDetails.propTypes = {
  // на будущее, так как сюда точно что-то будет приходить
}

export default OrderDetails;