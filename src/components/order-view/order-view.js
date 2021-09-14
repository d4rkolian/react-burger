import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom'; 
import moment from 'moment';
import 'moment/locale/ru';
import { getOrderByNumber, getIngredients } from '../../services/actions';
import { numberWithSpaces } from '../../utils'; 
import { IngredientInline } from './ingredient-inline/ingredient-inline';
import Styles from './order-view.module.css';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'; 

export const OrderView = (props) => {

	moment.locale('ru');
	const { order, ingredients, loading } = useSelector( store => ({
		order: store.burger.currentOrder,
		ingredients: store.burger.ingredients.all,
		loading: store.burger.loaders.orderDetails,
	}));

	const params = useParams();
	const dispatch = useDispatch();
	const history = useHistory();

	const wrapClassName = (history.action === 'PUSH') ? Styles.order : [Styles.order, Styles.absolute].join(" ");
	const readyMargin = (history.action === 'PUSH' || history.action === 'REPLACE') ? 'mb-5' : 'mb-15';

	useEffect(
		() => {
			if ( order.length === 0 || params.id !== order.number ){
				dispatch( getOrderByNumber(params.id) );
			}
			if ( ingredients.length === 0 ){
				dispatch( getIngredients() );
			}
		},[]
	);

	const statusText = order.status === 'done' ? 'Выполнен' : 'В процессе';

	const ingredientsList = {};
	let ingredientsHashes = [];
	let sum = 0;

	if ( !loading && order.ingredients && ingredients.length > 0 ){
		order.ingredients.map((hash) => {
			let details = ingredients.filter((item) => {
				if ( item._id === hash ) {
					return item;
				} else {
					return false;
				}
			});
			sum+=details[0].price;
			if ( !(hash in ingredientsList) ){
				return ingredientsList[hash] = {
					details: details,
					count: 1,
				}
			} else {
				return ingredientsList[hash] = {
					...ingredientsList[hash],
					count: ingredientsList[hash].count+1,
				}
			}
		});
		ingredientsHashes = Object.keys(ingredientsList);
	} 

	return (
		<div className={wrapClassName}>
			<div className={Styles.innerwrap}>
				{ !loading && ingredientsHashes.length > 0 ? (
						<>
							<p className={[Styles.number,"mb-10"].join(" ")}>#{order.number}</p>
							<h1 className={[Styles.name, "mb-3"].join(" ")}>{order.name}</h1>
							<p className={[Styles.ready, readyMargin].join(" ")}>{statusText}</p>
							<h2 className={[Styles.subheader, "mb-6"].join(" ")}>Состав:</h2>
							<div className={[Styles.listwrap, props.appStyles.customscroll].join(" ")}>
								<ul className={[Styles.list, "mr-6"].join(" ")}>
									{ 
										ingredientsHashes.map( (hash, index) => {
											return <IngredientInline details={ingredientsList[hash].details} count={ingredientsList[hash].count} key={index} />;
										})
									}
								</ul>
							</div>
							<div className={Styles.details}>
								<div>{moment(order.createdAt).calendar()}</div>
								<div className={Styles.ttl}>{numberWithSpaces(sum)}&nbsp;<CurrencyIcon /></div>
							</div>
						</>
					) : (
						<p>Загружаем данные заказа</p>
					) }
			</div>
		</div>
	);
}