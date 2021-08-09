import React, {useContext} from 'react'; // TODO удалить useContext
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import {IngredientsContext} from '../../utils/ingredientsContext.js';
import Card from '../card/card';
import BIStyles from './burger-ingredients.module.css';

function BurgerIngredients(props) {

	const API_URL = 'https://norma.nomoreparties.space/api/ingredients';	
	const dispatch = useDispatch();

	const { ingLoading, ingredients } = useSelector( store => ({
		ingLoading: store.burger.loaders.ingredients,
		ingredients: store.burger.ingredients.all,
	}));

	React.useEffect(() => {
		const getIngredients = async () => {
	    fetch(API_URL)
	    .then(res => {
				if (res.ok) {
					return res.json();
				}
					return Promise.reject(`Ошибка ${res.status}`);
			})
	    .then(data => dispatch({type: 'LOAD_INGREDIENTS', data: data.data}) )
	    .catch(e => console.log('Error see can I, my young padavan'));
	  }
	  getIngredients();
		},
		[]
	);

  return (
		<section className={props.appStyles.leftright}>
			<h1 className="mt-10">Соберите бургер</h1>
			<ul className={[BIStyles.jumpTo, "mt-5"].join(" ")}>
				<li className={BIStyles.active}>Булки</li>
				<li>Соусы</li>
				<li>Начинки</li>
			</ul>

			<div className={[BIStyles.ingList, props.appStyles.customscroll, ingLoading ? props.appStyles.loading : "" ].join(" ")} >
				{!ingLoading && (
					<>
						<h2 className="mt-10 mb-6" id="buns">Булки</h2>
						<div className="pl-4">
							{
			      		ingredients.map((product,index)=>{
			      			return product.type === 'bun' ? <Card key={product._id} clickHandle={props.clickHandle} details={{product}} /> : null
			      		})
			      	}	
						</div>

						<h2 className="mt-10 text_color_inactive" id="sauces">Соусы</h2>
						<div className="pl-4">
							{
			      		ingredients.map((product,index)=>{
			      			return product.type === 'sauce' ? <Card key={product._id} clickHandle={props.clickHandle} details={{product}} /> : null
			      		})
			      	}	
		      	</div>

						<h2 className="mt-10 text_color_inactive" id="toppings">Начинки</h2>
						<div className="pl-4">
							{
			      		ingredients.map((product,index)=>{
			      			return product.type === 'main' ? <Card key={product._id} clickHandle={props.clickHandle} details={{product}} /> : null
			      		})
			      	}	
		      	</div>
		      </>
				)}	
    	</div>
		</section>
  );

}

BurgerIngredients.propTypes = {
	isLoading: PropTypes.bool.isRequired,
	clickHandle: PropTypes.func.isRequired,
	appStyles: PropTypes.object.isRequired,
}

export default BurgerIngredients;