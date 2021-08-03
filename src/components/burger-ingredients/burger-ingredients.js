import React, {useContext} from 'react';
import PropTypes from 'prop-types';
import {IngredientsContext} from '../../utils/ingredientsContext.js';

import BIStyles from './burger-ingredients.module.css';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';

function Card(props) {
	var product = JSON.stringify(props.details.product);
	return(
			<div className={[BIStyles.card, "mb-10"].join(" ")} onClick={props.clickHandle} product={product} modaltype="ingredients">
				{/* <span className={BIStyles.badge}>1</span> */}
				<img src={props.details.product.image} className={BIStyles.img} alt={props.details.product.name} />
				<p className={BIStyles.price}>{props.details.product.price}&nbsp;<CurrencyIcon type="primary" /></p>
				<p className={BIStyles.name}>{props.details.product.name}</p>
			</div>
		);
}

function BurgerIngredients(props) {

	const ingredients = useContext(IngredientsContext);

  return (
		<section className={props.appStyles.leftright}>
			<h1 className="mt-10">Соберите бургер</h1>
			<ul className={[BIStyles.jumpTo, "mt-5"].join(" ")}>
				<li className={BIStyles.active}>Булки</li>
				<li>Соусы</li>
				<li>Начинки</li>
			</ul>

			<div className={[BIStyles.ingList, props.appStyles.customscroll, props.isLoading ? props.appStyles.loading : "" ].join(" ")} >
				{!props.isLoading && (
					<>
						<h2 className="mt-10 mb-6" id="buns">Булки</h2>
						<div className="pl-4">
							{
			      		ingredients.map((product,index)=>{
			      			return product.type === 'bun' ? <Card key={index} clickHandle={props.clickHandle} details={{product}} /> : null
			      		})
			      	}	
						</div>

						<h2 className="mt-10 text_color_inactive" id="sauces">Соусы</h2>
						<div className="pl-4">
							{
			      		ingredients.map((product,index)=>{
			      			return product.type === 'sauce' ? <Card key={index} clickHandle={props.clickHandle} details={{product}} /> : null
			      		})
			      	}	
		      	</div>

						<h2 className="mt-10 text_color_inactive" id="toppings">Начинки</h2>
						<div className="pl-4">
							{
			      		ingredients.map((product,index)=>{
			      			return product.type === 'main' ? <Card key={index} clickHandle={props.clickHandle} details={{product}} /> : null
			      		})
			      	}	
		      	</div>
		      </>
				)}	
    	</div>
		</section>
  );

}

BurgerIngredients.propTypes = {
	isLoading: PropTypes.bool.isRequired,
	clickHandle: PropTypes.func.isRequired,
	appStyles: PropTypes.object.isRequired,
}

Card.propTypes = {
	details: PropTypes.object.isRequired,
	clickHandle: PropTypes.func.isRequired,
}

export default BurgerIngredients;