import React from 'react';
import PropTypes from 'prop-types'

import oDStyles from './order-details.module.css';

function OrderDetails(props) {

  React.useEffect(() => {
    return () => {
      console.log('change');
     };
  }, [props.orderLoading]);

  console.log(props.orderLoading);

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

OrderDetails.propTypes = {
  orderNumber: PropTypes.number,
}

export default OrderDetails;