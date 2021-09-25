import React, { useState } from 'react'; 
import { Link, useLocation, useParams } from 'react-router-dom';
// import { useSelector, useDispatch } from 'react-redux';
import { useSelector, useDispatch } from '../../utils/hooks';
import { getIngredients } from '../../services/actions';
import Card from '../card/card';
import BIStyles from './burger-ingredients.module.css';

import type { TIngredient } from '../../types/data';
interface IBurgerIngredientsProps {
	appStyles: {
		[key: string]: string;
	}
	isLoading: boolean;
	clickHandle: (event:any) => void;
}

function BurgerIngredients(props:IBurgerIngredientsProps) {
	
	const dispatch = useDispatch();
	const [activeTab, setActiveTab] = useState('buns');
	let location = useLocation();

	const { ingLoading, ingredients, apiError } = useSelector( store => ({
		ingLoading: store.burger.loaders.ingredients,
		ingredients: store.burger.ingredients.all,
		apiError: store.burger.ingredients.error,
	}));

	// получаем данные по ингредиентам от API
	React.useEffect(() => {
 		dispatch(getIngredients());
	},[]);

	// работаем со скроллом и табами внутри контейнера ингредиентов
	const handleScroll = () => {
		const parentElPos = document.getElementById('inglist')!.getBoundingClientRect();		
		const headers = [
			'buns',
			'sauces',
			'toppings',
		];
		const positions:Array<number> = [];
		headers.map( (header, index) => {
				const elPos = document.getElementById(header)!.getBoundingClientRect();
				positions.push(Math.abs(elPos.top - parentElPos.top));
		});
		setActiveTab(headers[positions.indexOf(Math.min.apply(null, positions))]);
	}
	const scrollableRef = React.createRef<HTMLInputElement>();
	React.useEffect(
		() => {
			scrollableRef.current!.addEventListener('scroll', handleScroll);
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
		      		ingredients.map((product:TIngredient,index:number)=>{
		      			if ( product.type === 'bun' ){
		      				return (
		      					<Link
		      						key={product._id}
		      						className={BIStyles.cardwrap}
		      						onClick={props.clickHandle}
		      						data-modaltype="ingredients"
		      						to={{
		      							pathname: "/ingredients/"+index,
		      							state: { background: location }
		      						}}>
		      						<Card details={{product}} arraykey={index} clickHandle={()=>{}} />
		      					</Link>
		      				);
		      			} else {
		      				return null;
		      			}
		      		})
		      	}	
					</div>

					<h2 className="mt-10 text_color_inactive" id="sauces">Соусы</h2>
					<div className="pl-4">
						{
		      		ingredients.map((product:TIngredient,index:number)=>{
		      			if ( product.type === 'sauce' ){
		      				return (
		      					<Link
		      						key={product._id}
		      						className={BIStyles.cardwrap}
		      						onClick={props.clickHandle}
		      						data-modaltype="ingredients"
		      						to={{
		      							pathname: "/ingredients/"+index,
		      							state: {background: location}
		      						}}>
		      						<Card details={{product}} arraykey={index} clickHandle={()=>{}} />
		      					</Link>
		      				);
		      			} else {
		      				return null;
		      			}
		      		})
		      	}	
	      	</div>

					<h2 className="mt-10 text_color_inactive" id="toppings">Начинки</h2>
					<div className="pl-4">
						{
		      		ingredients.map((product:TIngredient,index:number)=>{
		      			if ( product.type === 'main' ){
		      				return (
		      					<Link
		      						key={product._id}
		      						className={BIStyles.cardwrap}
		      						onClick={props.clickHandle}
		      						data-modaltype="ingredients"
		      						to={{
		      							pathname: "/ingredients/"+index,
		      							state: {background: location}
		      						}}>
		      						<Card details={{product}} arraykey={index} clickHandle={()=>{}} />
		      					</Link>
		      				);
		      			} else {
		      				return null;
		      			}
		      		})
		      	}	
	      	</div>
	      </>
			) : apiError ? (<p className="pt-20" style={{'textAlign': 'center'}}>Ошибка получения данных</p>) : ''
			}	
		</div>
	</section>
  );

}

export default BurgerIngredients;