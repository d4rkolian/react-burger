import React from 'react';
import { useSelector } from 'react-redux';
import type { TRootState } from '../../index';

import oDStyles from './order-details.module.css';

function OrderDetails(){

  const {orderLoading, orderNumber, error } = useSelector( (store:TRootState) => ({
    orderLoading: store.burger.loaders.order,
    orderNumber: store.burger.order.number,
    error: store.burger.order.error,
  }));

  return (
  	<div className={oDStyles.orderDetails} >
      { !error ? (
        <>
          <p className={[oDStyles.orderId, "text_type_digits-large"].join(" ")} id="orderNum">{ orderLoading ? '...' : orderNumber}</p>
          <span className={oDStyles.subline}>{ orderLoading && 'получаем ' }идентификатор заказа</span>
          <i className={oDStyles.statusIcon}></i>
          <p className={oDStyles.detailedStatus}>
            Ваш заказ начали готовить<br/>
            <span className="text_color_inactive">Дождитесь готовности на орбитальной станции</span>
          </p>
        </>
      ) : (<p className="pt-20 pb-20" style={{'text-align': 'center'}}>Ошибка получения данных</p>)
      }

		</div>
  );
}


export default OrderDetails;