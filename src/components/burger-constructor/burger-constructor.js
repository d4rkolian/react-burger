import React, {useContext} from 'react'; // TODO удалить useContext
import PropTypes from 'prop-types';
import {IngredientsContext} from '../../utils/ingredientsContext.js'; // TODO удалить
import { useSelector, useDispatch }  from 'react-redux';
import { useDrop } from "react-dnd";

import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import Ingredient from '../ingredient/ingredient';
import BGStyles from './burger-constructor.module.css';

const BurgerConstructor = (props) => {

	let summ = 0; 

	// получаем из хранилища данные по ингредиентам, добавленным в конструктор
	const { ingredientsConstructor, bunChosen } = useSelector( store => ({
		ingredientsConstructor: store.burger.ingredients.constructor,
		bunChosen: store.burger.ingredients.bunChosen,
	}));

	const dispatch = useDispatch();
	const [, dropRef] = useDrop({
		accept: 'ingredient',
		drop (itemId) {
			// вызвать апдейт store
			dispatch({
				type: 'MOVE_TO_CONSTRUCTOR',
				arraykey: itemId.arraykey,
				productType: itemId.type,
			});
		}
	});

  return (
  	<>
			<section className={[props.appStyles.leftright, "ml-10", "pt-25"].join(" ")} id="burgerconstructor" ref={dropRef} >
				{ ingredientsConstructor.length > 0 ? (
						<ul className={[BGStyles.inglist, "ml-4"].join(" ")} >
							{
			      		ingredientsConstructor.map((product,index) => {
			      			if ( product.type === 'bun' ){
			      				summ += product.price
			      				return <Ingredient key={index} details={{product}} clickHandle={props.clickHandle} isLocked={false} type="top"  />
			      			}
			      		})
			      	}
							<li>
								<ul className={[BGStyles.ajustable, props.appStyles.customscroll, props.isLoading ? props.appStyles.loading : ""].join(" ")}>
								{
				      		ingredientsConstructor.map((product,index) => {
				      			if ( product.type !== 'bun' ){
				      				summ += product.price
				      				return <Ingredient key={index} details={{product}} clickHandle={props.clickHandle} isLocked={false} />
				      			}
				      		})
				      	}
								</ul>
							</li>
							{
			      		ingredientsConstructor.map((product,index) => {
			      			if ( product.type === 'bun' ){
			      				summ += product.price
			      				return <Ingredient key={index} details={{product}} clickHandle={props.clickHandle} isLocked={false} type="bottom"  />
			      			}
			      		})
			      	}
						</ul>
					) : (
						<p className={[props.appStyles.empty, "pt-25"].join(" ")}>Перетащите ингредиенты из левого окна, чтобы добавить их в этот список и собрать свой космический бургер мечты!</p>
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
		    <p className="text_color_inactive">Добавьте в заказ хотя бы одну булку, чтобы отправить его на орбитальную  кухню</p>
			</section>
		</>
  );

}

BurgerConstructor.propTypes = {
	clickHandle: PropTypes.func.isRequired,
	appStyles: PropTypes.object.isRequired,
}

export default BurgerConstructor;