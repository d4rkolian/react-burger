import React from 'react';
import { Link } from 'react-router-dom';
import { OrderCard } from '../order-card/order-card';
import AppStyles from '../app/app.module.css';
import Styles from './feed.module.css';

export const Feed = () => {

	return (
		<div>
		<h1 className="mt-10">Лента заказов</h1>
		<div className={Styles.wrap}>
			<section className={[Styles.panel, AppStyles.customscroll].join(" ")} >
				<ul>
					<li><Link to="/feed/10" className={Styles.cardlink} ><OrderCard /></Link></li>
					<li><OrderCard /></li>
				</ul>
			</section>
			<section className={[Styles.panel, "ml-15"].join(" ")} >
				<ul className={[Styles.lists, "mb-15"].join(" ")}>
					<li>
						<h2 className="mb-6">Готовы:</h2>
						<ul className={[Styles.list, Styles.ready].join(" ")}>
							<li className="mb-2">034533</li>
							<li className="mb-2">034530</li>
							<li className="mb-2">034527</li>
							<li className="mb-2">034533</li>
						</ul>
					</li>
					<li>
						<h2 className="mb-6">В работе:</h2>
						<ul className={[Styles.list, Styles.wip].join(" ")}>
							<li>034533</li>
						</ul>
					</li>
				</ul>
				<h2>Выполнено за всё время:</h2>
				<p className={[Styles.count, "mb-15"].join(" ")}>28 752</p>
				<h2>Выполнено за сегодня:</h2>
				<p className={[Styles.count, "mb-15"].join(" ")}>138</p>
			</section>
		</div>
		</div>
	);
}