import React from 'react';
import { IngredientThumb } from '../../order-card/ingredient-thumb/ingredient-thumb';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import Styles from './ingredient-inline.module.css';

export const IngredientInline = () => {
	return (
		<div className={Styles.wrap}>
			
			<p className={Styles.name}>
				<IngredientThumb />
				<p className="ml-4">Филе Люминесцентного тетраодонтимформа</p>
			</p>
			<p className={[Styles.count, "ml-4"].join(" ")}>2 x 20&nbsp;<CurrencyIcon /></p>
		</div>
	);
}