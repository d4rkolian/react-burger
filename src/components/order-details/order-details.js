import React from 'react';
import { useSelector } from 'react-redux';

import oDStyles from './order-details.module.css';

function OrderDetails(props){

  const {orderLoading, orderNumber} = useSelector( store => ({
    orderLoading: store.burger.loaders.order,
    orderNumber: store.burger.orderNumber,
  }));

  return (
  	<div className={oDStyles.orderDetails} >
      <p className={[oDStyles.orderId, "text_type_digits-large"].join(" ")} id="orderNum">{ orderLoading ? '...' : orderNumber}</p>
      <span className={oDStyles.subline}>{ orderLoading && 'получаем ' }идентификатор заказа</span>
      <i className={oDStyles.statusIcon}></i>
  		<p className={oDStyles.detailedStatus}>
  			Ваш заказ начали готовить<br/>
  			<span className="text_color_inactive">Дождитесь готовности на орбитальной станции</span>
  		</p>
		</div>
  );
}


export default OrderDetails;