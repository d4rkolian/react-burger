import React from 'react';
import PropTypes from 'prop-types';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import CardStyles from './card.module.css';

function Card(props) {
	var product = JSON.stringify(props.details.product);
	return(
			<div className={[CardStyles.card, "mb-10"].join(" ")} onClick={props.clickHandle} product={product} modaltype="ingredients" source="ingredientsList" ingtype={props.details.product.type} >
				{/* <span className={BIStyles.badge}>1</span> */}
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