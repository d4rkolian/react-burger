import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'; 
import { useLocation, Link } from 'react-router-dom'; 
import { getCookie } from '../../../utils'; 
import { OrderCard } from '../../order-card/order-card';
import Styles from './orders-list.module.css'

export const OrdersList = () => {

	const dispatch = useDispatch();
	let location = useLocation();
	const { connected, orders, ingredients } = useSelector( store => ({
		connected: store.socket.connected,
		orders: store.socket.orders,
		ingredients: store.burger.ingredients.all,
	}));

	useEffect(
		() => {
			if ( !connected ){ dispatch({ type: 'WS_CONNECTION_START', payload: { type: 'user', token: getCookie('token') } }); }
			return () => {
				console.log('отмонтировались');
				dispatch({ type: 'WS_CONNECTION_CLOSE' });
			}
		},[]
	);
	
	return (
		<div className={Styles.wrapper}>
		{ 
			orders.length > 0 && orders.map( (order,index) => {
				return (<Link to={{ pathname: '/profile/orders/'+order.number, state: {background: location} }} className={Styles.link}><OrderCard key={index} order={order} ingredients={ingredients} mode="profile" /></Link>);
			})
		}
		</div>
	);
}