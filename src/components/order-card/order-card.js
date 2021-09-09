import React from 'react';
import Styles from './order-card.module.css';
import { IngredientThumb } from './ingredient-thumb/ingredient-thumb';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';

export const OrderCard = (props) => {
	return (

		<div className={[Styles.ordercard, "mt-5"].join(" ")}>
			<div className={[Styles.details, "mb-6"].join(" ")}>
				<span className={Styles.ordernum}>#034535</span>
				<span className={[Styles.date, "text_color_inactive"].join(" ")}>Сегодня, 16:20 i-GMT+3</span>
			</div>
			<h2>
				Death Star Starship Main бургер
			</h2>
			{ props.mode && props.mode === 'profile' ? (
				<p className="mt-2">Создан</p>
			) : null }
			<div className={[Styles.ingredients,"mt-6"].join(" ")}>
				<ul className={Styles.list}>
					<li className={Styles.thumb} style={{'z-index':'6'}}><IngredientThumb /></li>
					<li className={Styles.thumb} style={{'z-index':'5'}}><IngredientThumb /></li>
					<li className={Styles.thumb} style={{'z-index':'4'}}><IngredientThumb /></li>
					<li className={Styles.thumb} style={{'z-index':'3'}}><IngredientThumb /></li>
					<li className={Styles.thumb} style={{'z-index':'2'}}><IngredientThumb /></li>
					<li className={Styles.thumb} style={{'z-index':'1'}}><IngredientThumb mode="rest" /></li>
				</ul>
				<div className={Styles.total}>
					<span className={[Styles.sum, "mr-2"].join(" ")}>480</span> <CurrencyIcon type="primary" />
				</div>
			</div>
		</div>
	);
}