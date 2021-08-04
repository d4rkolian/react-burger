import React from 'react';

import oDStyles from './order-details.module.css';

function OrderDetails(props) {

  const ORDER_URL = 'https://norma.nomoreparties.space/api/orders';
  const [state,setState] = React.useState({
    orderNumber: null,
    orderLoading: true,
  });

  function getOrderNum(ingredientsIDs){
    const reqOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        'ingredients': ingredientsIDs
      })
    };
    fetch(ORDER_URL, reqOptions)
      .then(res => {
      if (res.ok) {
        return res.json();
      }
        return Promise.reject(`Ошибка ${res.status}`);
      })
      .then(data => {
        setState({orderNumber: data.order.number, orderLoading: false });
      })
      .catch(e => console.log('Error see can I in order number, my young padavan'));
  }

  React.useEffect(() => {
    getOrderNum(props.ingredientsIDs.ingredientsIDs);
  }, []);

  return (
  	<div className={oDStyles.orderDetails} >
      <p className={[oDStyles.orderId, "text_type_digits-large"].join(" ")} id="orderNum">{ state.orderLoading ? '...' : state.orderNumber}</p>
      <span className={oDStyles.subline}>{ state.orderLoading && 'получаем ' }идентификатор заказа</span>
      <i className={oDStyles.statusIcon}></i>
  		<p className={oDStyles.detailedStatus}>
  			Ваш заказ начали готовить<br/>
  			<span className="text_color_inactive">Дождитесь готовности на орбитальной станции</span>
  		</p>
		</div>
  );
}


export default OrderDetails;