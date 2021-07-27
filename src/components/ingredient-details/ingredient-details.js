import React from 'react';
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types';

import IgDStyles from './ingredient-details.module.css';

function IngredientDetails(props) {
  return (
  	<div className={IgDStyles.ingredientDetails} >
			<h2>Детали ингредиента</h2>
			<img src={props.product.image_large} alt=""  />
			<div className={IgDStyles.desc}>
				<h3>{props.product.name}</h3>
				<ul className={[IgDStyles.ccal, "text_color_inactive"].join(" ")}>
					<li>
						<h4>Калории,ккал</h4>
						<span>{props.product.calories}</span>
					</li>
					<li>
						<h4>Белки, г</h4>
						<span>{props.product.proteins}</span>
					</li>
					<li>
						<h4>Жиры, г</h4>
						<span>{props.product.fat}</span>
					</li>
					<li>
						<h4>Углеводы, г</h4>
						<span>{props.product.carbohydrates}</span>
					</li>
				</ul>
			</div>
		</div>
  );
}

IngredientDetails.propTypes = {
	product: PropTypes.object.isRequired,
}

export default IngredientDetails;