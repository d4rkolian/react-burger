import React from 'react';

import oDStyles from './order-details.module.css';

function OrderDetails(props){
  console.log(props);
  return (
  	<div className={oDStyles.orderDetails} >
      <p className={[oDStyles.orderId, "text_type_digits-large"].join(" ")} id="orderNum">{ props.orderLoading ? '...' : props.orderNumber}</p>
      <span className={oDStyles.subline}>{ props.orderLoading && 'получаем ' }идентификатор заказа</span>
      <i className={oDStyles.statusIcon}></i>
  		<p className={oDStyles.detailedStatus}>
  			Ваш заказ начали готовить<br/>
  			<span className="text_color_inactive">Дождитесь готовности на орбитальной станции</span>
  		</p>
		</div>
  );
}


export default OrderDetails;