import React, {useContext} from 'react';
import PropTypes from 'prop-types';
import {IngredientsContext} from '../../utils/ingredientsContext.js';

import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import Ingredient from '../ingredient/ingredient';

import BGStyles from './burger-constructor.module.css';

const BurgerConstructor = (props) => {

	const ingredients = useContext(IngredientsContext);
	let summ = 0; 

  return (
  	<>
			<section className={[props.appStyles.leftright, "ml-10", "pt-25"].join(" ")} id="burgerconstructor">
				{ props.ingredientsConstructor.length > 0 ? (
						<ul className={[BGStyles.inglist, "ml-4"].join(" ")} >
							{
			      		ingredients.map((product,index) => {
			      			if ( props.ingredientsConstructorBun.indexOf(product._id) > -1 ){
			      				summ += product.price;
			      				return <Ingredient key={index} details={{product}} clickHandle={props.clickHandle} isLocked={false} type="top" />
			      			}
			      		})
			      	}
							<li>
								<ul className={[BGStyles.ajustable, props.appStyles.customscroll, props.isLoading ? props.appStyles.loading : ""].join(" ")}>
								{
				      		ingredients.map((product,index) => {
				      			if ( props.ingredientsConstructor.indexOf(product._id) > -1 && product.type !== 'bun' ){
				      				summ += product.price
				      				return <Ingredient key={index} details={{product}} clickHandle={props.clickHandle} isLocked={false} />
				      			}
				      		})
				      	}
								</ul>
							</li>
							{
			      		ingredients.map((product,index) => {
			      			if ( props.ingredientsConstructorBun.indexOf(product._id) > -1 ){
			      				summ += product.price;
			      				return <Ingredient key={index} details={{product}} clickHandle={props.clickHandle} isLocked={false} type="bottom" />
			      			}
			      		})
			      	}
						</ul>
					) : (
						<p className={[props.appStyles.empty, "pt-25"].join(" ")}>Нажимайте на ингредиенты слева, чтобы добавлять их в этот список и собрать свой космический бургер мечты!</p>
					)}
				
		    <div className={[BGStyles.total, "mt-10"].join(" ")}>
		    	<p className={[BGStyles.summ,"mr-10"].join(" ")}>
		    		<span className={BGStyles.text}>{summ}</span>
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
	clickHandle: PropTypes.func.isRequired,
	appStyles: PropTypes.object.isRequired,
}

export default BurgerConstructor;