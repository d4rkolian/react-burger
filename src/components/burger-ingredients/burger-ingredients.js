import React, { useState } from 'react'; 
import { useSelector, useDispatch } from 'react-redux';
import { LOAD_INGREDIENTS_REQUEST, LOAD_INGREDIENTS_SUCCESS, LOAD_INGREDIENTS_ERROR } from '../../services/actions';
import PropTypes from 'prop-types';
import Card from '../card/card';
import BIStyles from './burger-ingredients.module.css';

function BurgerIngredients(props) {

	const API_URL = 'https://norma.nomoreparties.space/api/ingredients';	
	const dispatch = useDispatch();
	const [activeTab, setActiveTab] = useState('');

	const { ingLoading, ingredients, apiError } = useSelector( store => ({
		ingLoading: store.burger.loaders.ingredients,
		ingredients: store.burger.ingredients.all,
		apiError: store.burger.ingredients.error,
	}));

	// получаем данные по ингредиентам от API
	React.useEffect(() => {
		dispatch({type: LOAD_INGREDIENTS_REQUEST});
		const getIngredients = async () => {
	    fetch(API_URL)
	    .then(res => {
				if (res.ok) {
					return res.json();
				}
					return Promise.reject(`Ошибка ${res.status}`);
			})
	    .then(data => {
	    	dispatch({type: LOAD_INGREDIENTS_SUCCESS, data: data.data});
	    	setActiveTab('buns'); // ставим активный таб
	    	})
	    .catch(e => dispatch({type: LOAD_INGREDIENTS_ERROR}));
	  }
	  getIngredients();
		},
		[]
	);

	// работаем со скроллом и табами внутри контейнера ингредиентов
	const handleScroll = () => {
		const parentElPos = document.getElementById('inglist').getBoundingClientRect();		
		const headers = [
			'buns',
			'sauces',
			'toppings',
		];
		const positions = []
		headers.map( (header, index) => {
				const elPos = document.getElementById(header).getBoundingClientRect();
				positions.push(Math.abs(elPos.top - parentElPos.top));
		});
		setActiveTab(headers[positions.indexOf(Math.min.apply(null, positions))]);
	}
	const scrollableRef = React.createRef();
	React.useEffect(
		() => {
			scrollableRef.current.addEventListener('scroll', handleScroll);
	    return () => {
	      window.removeEventListener('scroll', handleScroll);
	    };
		}
	,[ingLoading]
	);

  return (
	<section className={props.appStyles.leftright}>
		<h1 className="mt-10">Соберите бургер</h1>
		<ul className={[BIStyles.jumpTo, "mt-5"].join(" ")}>
			<li className={activeTab === 'buns' ? BIStyles.active : ''}>Булки</li>
			<li className={activeTab === 'sauces' ? BIStyles.active : ''}>Соусы</li>
			<li className={activeTab === 'toppings' ? BIStyles.active : ''}>Начинки</li>
		</ul>

		<div ref={scrollableRef} id="inglist" className={[BIStyles.ingList, props.appStyles.customscroll, ingLoading ? props.appStyles.loading : "" ].join(" ")} >
			{
			!ingLoading && !apiError ? (
				<>
					<h2 className="mt-10 mb-6" id="buns">Булки</h2>
					<div className="pl-4">
						{
		      		ingredients.map((product,index)=>{
		      			return product.type === 'bun' ? <Card key={product._id} clickHandle={props.clickHandle} details={{product}} arraykey={index} /> : null
		      		})
		      	}	
					</div>

					<h2 className="mt-10 text_color_inactive" id="sauces">Соусы</h2>
					<div className="pl-4">
						{
		      		ingredients.map((product,index)=>{
		      			return product.type === 'sauce' ? <Card key={product._id} clickHandle={props.clickHandle} details={{product}} arraykey={index}  /> : null
		      		})
		      	}	
	      	</div>

					<h2 className="mt-10 text_color_inactive" id="toppings">Начинки</h2>
					<div className="pl-4">
						{
		      		ingredients.map((product,index)=>{
		      			return product.type === 'main' ? <Card key={product._id} clickHandle={props.clickHandle} details={{product}} arraykey={index}  /> : null
		      		})
		      	}	
	      	</div>
	      </>
			) : apiError ? (<p className="pt-20" style={{'text-align': 'center'}}>Ошибка получения данных</p>) : ''
			}	
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