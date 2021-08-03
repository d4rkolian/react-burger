import React, {useContext} from 'react';
import PropTypes from 'prop-types';
import {IngredientsContext} from '../../utils/ingredientsContext.js';

import { DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';

import BGStyles from './burger-constructor.module.css';

const Ingredient = (props) => {
	var product = JSON.stringify(props.details.product);
	var type = (props.type) ? props.type : "";
	var name = props.details.product.name;
	if (props.type && props.type === "top") name = props.details.product.name+' (верх)';
	if (props.type && props.type === "bottom") name = props.details.product.name+' (низ)';

	return (
	  <li className="pl-8" onClick={props.clickHandle} product={product} modaltype="ingredients">
			{ !props.isLocked ? (
				<span className={BGStyles.icon}><DragIcon type="primary" /></span>) : null
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

const BurgerConstructor = (props) => {

	const ingredients = useContext(IngredientsContext);

	const firstBun = [];
	firstBun['product'] = ingredients.find(element => element.type = 'bun');

  return (
  	<>
			<section className={[props.appStyles.leftright, "ml-10", "pt-25"].join(" ")}>
				<ul className={[BGStyles.inglist, "ml-4"].join(" ")} >

					{ !props.isLoading && (<Ingredient key={firstBun._id} details={firstBun} clickHandle={props.clickHandle} isLocked={true} type="top" />) }	
				  <li>
				  	<ul className={[BGStyles.ajustable, props.appStyles.customscroll, props.isLoading ? props.appStyles.loading : ""].join(" ")}>
			      	{ !props.isLoading &&
			      		ingredients.map((product,index)=>{
			      			return product.type === 'main' ? <Ingredient key={product._id} details={{product}} clickHandle={props.clickHandle} isLocked={false} /> : null
			      		})
			      	}		
						</ul>
					</li>
				  { !props.isLoading && (<Ingredient key={firstBun._id} details={firstBun} clickHandle={props.clickHandle} isLocked={true} type="bottom" />) }	
			  </ul>
		    <div className={[BGStyles.total, "mt-10"].join(" ")}>
		    	<p className={[BGStyles.summ,"mr-10"].join(" ")}>
		    		<span className={BGStyles.text}>610</span>
		    		<span className={BGStyles.icon}><CurrencyIcon /></span>
		    	</p>
		    	<Button type="primary" size="large" onClick={props.clickHandle} modaltype="order">
					  Оформить заказ
					</Button>
		    </div>
			</section>
		</>
  );

}

BurgerConstructor.propTypes = {
	isLoading: PropTypes.bool.isRequired,
	clickHandle: PropTypes.func.isRequired,
	appStyles: PropTypes.object.isRequired,
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

export default BurgerConstructor;