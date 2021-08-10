import React from 'react';
import PropTypes from 'prop-types';
import { useDrag } from 'react-dnd';
import { useSelector } from 'react-redux';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import CardStyles from './card.module.css';
import { countInArray } from '../../utils';

function Card(props) {
	//var product = JSON.stringify(props.details.product);
	const product = props.details.product;
	const arraykey = props.arraykey;
	const productType = props.details.product.type;

	const [, dragRef] = useDrag({
			type: 'ingredient',
			item: {
				arraykey: arraykey, 
				type: productType
			},
		}); 

	// плохо, что тут будет ререндер всех карточек. 
	// TODO Возможно, в третьем спринте или после сдачи подумать, как перерисовать только одну по key
	const count = countInArray(useSelector( store => store.burger.ingredients.constructor ), product );

	return(
			<div
				className={[CardStyles.card, "mb-10"].join(" ")}
				onClick={props.clickHandle}
				product={product}
				modaltype="ingredients"
				source="ingredientsList"
				ingtype={props.details.product.type}
				ref={dragRef}
				draggable
				arraykey={arraykey}
			>
				{ count !== 0 ? (<span className={CardStyles.badge}>{count}</span>) : '' }
				<img src={props.details.product.image} className={CardStyles.img} alt={props.details.product.name} />
				<p className={CardStyles.price}>{props.details.product.price}&nbsp;<CurrencyIcon type="primary" /></p>
				<p className={CardStyles.name}>{props.details.product.name}</p>
			</div>
		);
}

Card.propTypes = {
	details: PropTypes.shape({
		product: PropTypes.shape({
	    _id: PropTypes.string.isRequired,
	    name: PropTypes.string.isRequired,
	    type: PropTypes.string.isRequired,
	    proteins: PropTypes.number.isRequired,
	    fat: PropTypes.number.isRequired,
	    carbohydrates: PropTypes.number.isRequired,
	    calories: PropTypes.number.isRequired,
	    price: PropTypes.number.isRequired,
	    image: PropTypes.string.isRequired,
	    image_mobile: PropTypes.string.isRequired,
	    image_large: PropTypes.string.isRequired,
    __v: PropTypes.number.isRequired,
	  })
  }).isRequired,
	clickHandle: PropTypes.func.isRequired,
}

export default Card;