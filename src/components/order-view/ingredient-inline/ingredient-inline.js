import React from 'react';
import { IngredientThumb } from '../../order-card/ingredient-thumb/ingredient-thumb';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import Styles from './ingredient-inline.module.css';

export const IngredientInline = (props) => {
	return (
		<li key={props.index}>
			<div className={Styles.wrap}>	
				<div className={Styles.name}>
					<IngredientThumb details={props.details[0]}/>
					<span className="ml-4">{props.details[0].name}</span>
				</div>
				<p className={[Styles.count, "ml-4"].join(" ")}>{props.count} x {props.details[0].price}&nbsp;<CurrencyIcon /></p>
			</div>
		</li>
	);
}