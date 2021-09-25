import React, { useEffect } from 'react';
import { OrderView } from '../components/order-view/order-view'; 
import PagesStyles from './page.module.css';

export const OrderPage = (props: { appStyles: { [x:string]:string } }) => {

	return(
		<div className={PagesStyles.emptypagewrapper}>
			<OrderView appStyles={props.appStyles} />
		</div>
	);
}