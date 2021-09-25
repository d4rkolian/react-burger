import React, { useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
import { useSelector, useDispatch } from '../../utils/hooks';
import { getIngredients } from '../../services/actions';
import { Link, useLocation } from 'react-router-dom';
import { OrderCard } from '../order-card/order-card';
import AppStyles from '../app/app.module.css';
import Styles from './feed.module.css';
import { WS_CONNECTION_START } from '../../services/actions/socket';
import { numberWithSpaces } from '../../utils';
import type { TOrder } from '../../types/data';

export const Feed = () => {

	const dispatch = useDispatch();
	let location = useLocation();
	const { connected, total, totalToday, orders } = useSelector( store => ({
		connected: store.socket.connected,
		total: store.socket.count.total,
		totalToday: store.socket.count.totalToday,
		orders: store.socket.orders,
	}));

	const ready:Array<number> = [];
	const inprogress:Array<number> = [];

	useEffect(
    () => {
    	// закрываем старое соединение
      if (!connected) { dispatch({ type: WS_CONNECTION_START }); }
			return () => {
				dispatch({ type: 'WS_CONNECTION_CLOSE' });
			}
    },
    []
  );

	return (
		<div>
		<h1 className="mt-10">Лента заказов</h1>
		<div className={Styles.wrap}>
			<section className={[Styles.panel, AppStyles.customscroll].join(" ")} >
				{ orders.length > 0 && (
						<ul>
							{
								orders.map((order:TOrder,index:number) => {
									if ( order.status === 'done' ) {
										ready.push(order.number);
									} else {
										inprogress.push(order.number);
									}
									return (<li key={order.number}>
										<Link
											to={{
		      							pathname: '/feed/'+order.number,
		      							state: {background: location}
		      						}}
											className={Styles.cardlink} >
											<OrderCard order={order} />
										</Link>
									</li>);
								})
							}
						</ul>
					)
				}
			</section>
			<section className={[Styles.panel, "ml-15"].join(" ")} >
				<ul className={[Styles.lists, "mb-15"].join(" ")}>
					<li>
						<h2 className="mb-6">Готовы:</h2>
						<ul className={[Styles.list, Styles.ready].join(" ")}>
							{ ready.map( (number,index) => { return (<li className="mb-2" key={index}>{number}</li>); } ) }
						</ul>
					</li>
					<li>
						<h2 className="mb-6">В работе:</h2>
						<ul className={[Styles.list, Styles.wip].join(" ")}>
							{ inprogress.map( (number, index) => { return (<li className="mb-2" key={index}>{number}</li>); } ) }
						</ul>
					</li>
				</ul>
				<h2>Выполнено за всё время:</h2>
				<p className={[Styles.count, "mb-15"].join(" ")}>{numberWithSpaces(total)}</p>
				<h2>Выполнено за сегодня:</h2>
				<p className={[Styles.count, "mb-15"].join(" ")}>{totalToday}</p>
			</section>
		</div>
		</div>
	);
}