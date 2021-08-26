import { React, useEffect } from 'react';
import { getIngredients } from '../../services/actions';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import IgDStyles from './ingredient-details.module.css';

function IngredientDetails(props) {
	const product = useSelector( store => store.burger.currentIngredient );
	const products = useSelector( store => store.burger.ingredients.all );

	const dispatch = useDispatch();
	const params = useParams();

	useEffect(() => {
		// TODO может просто передать props mode="fullscreen"?
		if ( window.location.pathname !== '/' && product.length === 0 && products.length === 0 ) {
			console.log('мы находимся внутри урла');
			const API_URL = 'https://norma.nomoreparties.space/api/ingredients';
			dispatch(getIngredients(API_URL));
		}
	},[]);

	if ( product.length === 0 && products.length !== 0 ){
		dispatch({ type: 'SET_AS_DETAILED', arraykey: params.id });
	}

	if ( window.location.pathname === '/' ) {
		window.history.replaceState(null, "Stellar Burgers | Просмотр ингредиента", "/ingredients/"+props.id)
	}
  return (
  	<div className={IgDStyles.ingredientDetails} >
			<h2>Детали ингредиента</h2>
			<img src={product.image_large} alt=""  />
			<div className={IgDStyles.desc}>
				<h3>{product.name}</h3>
				<ul className={[IgDStyles.ccal, "text_color_inactive"].join(" ")}>
					<li>
						<h4>Калории,ккал</h4>
						<span>{product.calories}</span>
					</li>
					<li>
						<h4>Белки, г</h4>
						<span>{product.proteins}</span>
					</li>
					<li>
						<h4>Жиры, г</h4>
						<span>{product.fat}</span>
					</li>
					<li>
						<h4>Углеводы, г</h4>
						<span>{product.carbohydrates}</span>
					</li>
				</ul>
			</div>
		</div>
  );
}

export default IngredientDetails