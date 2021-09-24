import React from 'react';
import { useDrag } from 'react-dnd';
// import { useSelector } from 'react-redux';
import { useSelector } from '../../utils/hooks';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import CardStyles from './card.module.css';
import { countInArray } from '../../utils';

import type { TRootState } from '../../index';
interface ICardProps {
	details: {
		product: {
	    _id: string;
	    name: string;
	    type: string;
	    proteins: number;
	    fat: number;
	    carbohydrates: number;
	    calories: number;
	    price: number;
	    image: string;
	    image_mobile: string;
	    image_large: string;
    __v: number;
	  }
  };
	clickHandle: () => void;
	arraykey: number;
}

function Card(props:ICardProps) {
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
	// TODO-LATER Возможно, в третьем спринте или после сдачи подумать, как перерисовать только одну по key
	let count = countInArray(useSelector( store => store.burger.ingredients.constructor ), product );
	count = product.type === 'bun' ? count*2 : count;

	return(
			<div
				className={[CardStyles.card, "mb-10"].join(" ")}
				product={product}
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

export default Card;