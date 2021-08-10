import React from 'react';
import { useSelector } from 'react-redux';
import IgDStyles from './ingredient-details.module.css';

function IngredientDetails() {
	const product = useSelector( store => store.burger.currentIngredient );
  return (
  	<div className={IgDStyles.ingredientDetails} >
			<h2>Детали ингредиента</h2>
			<img src={product.image_large} alt=""  />
			<div className={IgDStyles.desc}>
				<h3>{product.name}</h3>
				<ul className={[IgDStyles.ccal, "text_color_inactive"].join(" ")}>
					<li>
						<h4>Калории,ккал</h4>
						<span>{product.calories}</span>
					</li>
					<li>
						<h4>Белки, г</h4>
						<span>{product.proteins}</span>
					</li>
					<li>
						<h4>Жиры, г</h4>
						<span>{product.fat}</span>
					</li>
					<li>
						<h4>Углеводы, г</h4>
						<span>{product.carbohydrates}</span>
					</li>
				</ul>
			</div>
		</div>
  );
}

export default IngredientDetails;