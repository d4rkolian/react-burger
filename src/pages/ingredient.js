import React from 'react';
import IngredientDetails from '../components/ingredient-details/ingredient-details';
import PagesStyles from './page.module.css';

export const IngredientPage = () => {
	return (
		<div className={PagesStyles.emptypagewrapper}>
			<div className={PagesStyles.ingredientcontainer} >
				<IngredientDetails />
			</div>
		</div>
	);
}