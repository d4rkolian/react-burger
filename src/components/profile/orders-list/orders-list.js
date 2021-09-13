import React from 'react';
import { useSelector, useDispatch } from 'react-redux'; 
import { getCookie } from '../../../utils'; 
import { OrderCard } from '../../order-card/order-card';

export const OrdersList = () => {

	const dispatch = useDispatch();
	const { connected, connectedWithToken } = useSelector( store => ({
		connected: store.socket.connected,
		connectedWithToken: store.socket.connectedWithToken,
	}));

	// подразумевается, что мы должны закрыть сокет, чтобы открыть новый
	const token = getCookie('token');
	if ( connected ) {
		dispatch({ type: 'WS_CONNECTION_CLOSE' });	// закрыли
		if ( !connectedWithToken ) {
			dispatch({ type: 'WS_CONNECTION_START', payload: { type: 'user', token: token } })
		}
	} 
	
	return (
		<p>
			Список заказов пользователя
			{ /*<OrderCard mode="profile"  /> */ }
		</p>
		
	);
}