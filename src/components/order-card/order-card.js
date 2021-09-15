import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'; 
import { getIngredients } from '../../services/actions';
import moment from 'moment';
import 'moment/locale/ru';
import Styles from './order-card.module.css';
import { IngredientThumb } from './ingredient-thumb/ingredient-thumb';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { numberWithSpaces } from '../../utils';

export const OrderCard = (props) => {

	const dispatch = useDispatch();
	const { ingredients } = useSelector( store => ({
		ingredients: store.burger.ingredients.all,
	}));
	useEffect(
		() => {
			if ( ingredients.length === 0 ){
				dispatch( getIngredients() );
			}
		},[]
	);

	const showTiser = props.order.ingredients.length > 5 ? true : false;
	const tiserCount = showTiser ? props.order.ingredients.length-5 : 0;
	let tiserDetails = [];
	let sum = 0;
	moment.locale('ru');
	
	return (

		<div className={[Styles.ordercard, "mt-5"].join(" ")}>
			{ ingredients.length > 0 && (
				<>
					<div className={[Styles.details, "mb-6"].join(" ")}>
						<span className={Styles.ordernum}>#{props.order.number}</span>
						<span className={[Styles.date, "text_color_inactive"].join(" ")}>{moment(props.order.createdAt).calendar()}</span>
					</div>
					<h2>
						{props.order.name}
					</h2>
					{ props.mode && props.mode === 'profile' ? (
						<p className="mt-2">{props.order.status === 'done' ? 'Выполнен' : 'Создан'}</p>
					) : null }
					<div className={[Styles.ingredients,"mt-6"].join(" ")}>
						<ul className={Styles.list}>
							{
								props.order.ingredients.map((ingredient, index) => {
									let details = ingredients.filter((item) => {
										if ( item._id === ingredient ) {
											return item;
										}
									});
									sum += details[0].price;
									if ( index === tiserCount+1 && showTiser ){ tiserDetails = details; }
									if ( index < 5 ) {
										return (<li className={Styles.thumb} key={index} style={{'zIndex': props.order.ingredients.length - index}}><IngredientThumb details={details[0]} /></li>);
									}
									
								})
							}
							
							{ showTiser && (<li className={Styles.thumb} style={{'zIndex':'0'}}><IngredientThumb mode="rest" count={tiserCount} details={tiserDetails[0]} /></li>) }
							
						</ul>
						<div className={Styles.total}>
							<span className={[Styles.sum, "mr-2"].join(" ")}>{numberWithSpaces(sum)}</span> <CurrencyIcon type="primary" />
						</div>
					</div>
				</>
			)}
		</div>
	);
}