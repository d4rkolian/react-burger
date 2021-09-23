import { React, useEffect } from 'react';
import { getIngredients } from '../../services/actions';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import IgDStyles from './ingredient-details.module.css';
import type { TRootState } from '../../index';

function IngredientDetails() {
	let product = useSelector( (store:TRootState) => store.burger.currentIngredient );
	const products = useSelector( (store:TRootState) => store.burger.ingredients.all );
	
	const location = useLocation();
	const dispatch = useDispatch();
	const params = useParams();

	useEffect(() => {
		if ( products.length === 0 ){
			dispatch(getIngredients());
		}
	},[]);

	if ( !product || product.length === 0 ){
		product = products[params.id];
	}

  return (
  	<div className={IgDStyles.ingredientDetails} >
			<h2>Детали ингредиента</h2>
			{ product && (
				<>
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
				</>
			)}
		</div>
  );
}

export default IngredientDetails