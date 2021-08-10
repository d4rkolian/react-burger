import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux'; 

import { DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';

import IngStyles from './ingredient.module.css';

const Ingredient = (props) => {
	var type = (props.type) ? props.type : "";
	var name = props.details.product.name;
	if (props.type && props.type === "top") name = props.details.product.name+' (верх)';
	if (props.type && props.type === "bottom") name = props.details.product.name+' (низ)';
	const arraykey = useSelector( store => store.burger.ingredients.all ).indexOf(props.details.product);
	return (
	  <li className="pl-8 ingredient" onClick={props.clickHandle} arraykey={arraykey} modaltype="ingredients" >
		{ !props.isLocked ? (
			<span className={IngStyles.icon}><DragIcon type="primary" /></span>) : null
		}
	    <ConstructorElement
	    		type={type}
	        text={name}
	        isLocked={props.isLocked}
	        price={props.details.product.price}
	        thumbnail={props.details.product.image}
	      />
	  </li>
	);
}

Ingredient.propTypes = {
	details: PropTypes.oneOfType([
		PropTypes.array,
		PropTypes.object
	]),
	clickHandle: PropTypes.func.isRequired,
	isLocked: PropTypes.bool.isRequired,
	type: PropTypes.string,
}

export default Ingredient;