import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch }  from 'react-redux';
import { MOVE_TO_CONSTRUCTOR } from '../../services/actions';
import { useDrop } from "react-dnd";
import { numberWithSpaces } from '../../utils'; 

import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import Ingredient from '../ingredient/ingredient';
import BGStyles from './burger-constructor.module.css';

//import type { TRootState } from '../../index';

// interface IBurgerConstructorProps {
// 	appStyles: any;
// 	clickHandle: (event:any) => void;
// 	isLoading?: boolean; 
// }

const BurgerConstructor = (props) => {
//const BurgerConstructor = (props:IBurgerConstructorProps) => {

	let summ = 0; 
	const formRef = useRef();
	//const formRef = useRef<HTMLInputElement>();

	// получаем из хранилища данные по ингредиентам, добавленным в конструктор
	const { ingredientsConstructor, notice } = useSelector( store => ({
		ingredientsConstructor: store.burger.ingredients.constructor,
		notice: store.burger.order.notice,
	}));

	//console.log(ingredientsConstructor);

	const dispatch = useDispatch();
	const [, dropRef] = useDrop({
		accept: 'ingredient',
		drop (itemId:any) {
			// вызвать апдейт store
			dispatch({
				type: MOVE_TO_CONSTRUCTOR,
				arraykey: itemId.arraykey,
				productType: itemId.type,
			});
		}
	});

  return (
		<section className={[props.appStyles.leftright, "ml-10", "pt-25"].join(" ")} id="burgerconstructor" ref={dropRef} >
			<form ref={formRef} onSubmit={props.clickHandle} modaltype="order" >
				{ ingredientsConstructor.length > 0 ? (
						<ul className={[BGStyles.inglist, "ml-4"].join(" ")} >
							{
			      		ingredientsConstructor.map((product,index) => {
			      			if ( product.type === 'bun' ){
			      				summ += product.price
			      				return <Ingredient key={index} details={{product}} clickHandle={props.clickHandle} isLocked={true} type="top"  />
			      			}
			      		})
			      	}
							<li>
								<ul className={[BGStyles.ajustable, props.appStyles.customscroll, props.isLoading ? props.appStyles.loading : ""].join(" ")}>
								{
				      		ingredientsConstructor.map((product,index) => {
				      			if ( product.type !== 'bun' ){
				      				summ += product.price
				      				return <Ingredient key={index} details={{product}} clickHandle={props.clickHandle} listkey={index} isLocked={false} />
				      			}
				      		})
				      	}
								</ul>
							</li>
							{
			      		ingredientsConstructor.map((product,index) => {
			      			if ( product.type === 'bun' ){
			      				summ += product.price
			      				return <Ingredient key={index} details={{product}} clickHandle={props.clickHandle} isLocked={true} type="bottom"  />
			      			}
			      		})
			      	}
						</ul>
					) : (
						<p className={[props.appStyles.empty, "pt-25"].join(" ")}>Перетащите ингредиенты из левого окна, чтобы добавить их в этот список и собрать свой космический бургер мечты!</p>
					)}
				</form>

		    <div className={[BGStyles.total, "mt-10"].join(" ")}>
		    	<p className={[BGStyles.summ,"mr-10"].join(" ")}>
		    		<span className={BGStyles.text}>{numberWithSpaces(summ)}</span>
		    		<span className={BGStyles.icon}><CurrencyIcon /></span>
		    	</p>
		    	<Button type="primary" onClick={ (e) => formRef.current.requestSubmit() } size="large" modaltype="order">
					  Оформить заказ
					</Button>
		    </div>
		    { notice && (
		    	<p className={["text_color_inactive","text_type_main-small","pt-4",BGStyles.notice].join(" ")}>Добавьте в заказ хотя бы одну булку,<br/>чтобы отправить его на орбитальную  кухню</p>
		    )}
	    
		</section>
  );

}

BurgerConstructor.propTypes = {
	clickHandle: PropTypes.func.isRequired,
	appStyles: PropTypes.object.isRequired,
}

export default BurgerConstructor;