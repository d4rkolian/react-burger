import React from 'react';
import { IngredientInline } from './ingredient-inline/ingredient-inline';
import Styles from './order-view.module.css';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'; 

export const OrderView = (props) => {
	return (
		<div className={Styles.order}>
			<div className={Styles.innerwrap}>
				<p className={[Styles.number,"mb-10"].join(" ")}>#034533</p>
				<h1 className={[Styles.name, "mb-3"].join(" ")}>Black Hole Singularity острый бургер</h1>
				<p className={[Styles.ready, "mb-15"].join(" ")}>Выполнен</p>
				<h2 className={[Styles.subheader, "mb-6"].join(" ")}>Состав:</h2>
				<div className={[Styles.listwrap, props.appStyles.customscroll].join(" ")}>
					<ul className={[Styles.list, "mr-6"].join(" ")}>
						<li><IngredientInline /></li>
						<li><IngredientInline /></li>
						<li><IngredientInline /></li>
						<li><IngredientInline /></li>
						<li><IngredientInline /></li>
					</ul>
				</div>
				<div className={Styles.details}>
					<div>Вчера, 13:50 i-GMT+3</div>
					<div className={Styles.ttl}>510&nbsp;<CurrencyIcon /></div>
				</div>
			</div>
		</div>
	);
}