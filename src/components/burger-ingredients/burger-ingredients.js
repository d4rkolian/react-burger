import React from 'react';
import BIStyles from './burger-ingredients.module.css';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';

function Card(props) {
	return(
			<div className={[BIStyles.card, "mb-10"].join(" ")}>
				{/* <span className={BIStyles.badge}>1</span> */}
				<a href="#" className={BIStyles.img} ><img src={props.image} /></a>
				<p className={BIStyles.price}>{props.price}&nbsp;<CurrencyIcon type="primary" /></p>
				<p className={BIStyles.name}>{props.name}</p>
			</div>
		);
}

function BurgerIngredients(props) {

  return (
		<section className={props.appStyles.leftright}>
			<h1 className="mt-10">Соберите бургер</h1>
			<ul className={[BIStyles.jumpTo, "mt-5"].join(" ")}>
				<li className={BIStyles.active}>Булки</li>
				<li>Соусы</li>
				<li>Начинки</li>
			</ul>

			<div className={[BIStyles.ingList, props.appStyles.customscroll, props.isLoading ? props.appStyles.loading : "" ].join(" ")} >
				{!props.isLoading && (
					<>
						<h2 className="mt-10 mb-6" id="buns">Булки</h2>
						<div className="pl-4">
							{
			      		props.ingredients.map((product,index)=>{
			      			return product.type === 'bun' ? <Card key={index} name={product.name} price={product.price} image={product.image}/> : null
			      		})
			      	}	
						</div>

						<h2 className="mt-10 text_color_inactive" id="sauces">Соусы</h2>
						<div className="pl-4">
							{
			      		props.ingredients.map((product,index)=>{
			      			return product.type === 'sauce' ? <Card key={index} name={product.name} price={product.price} image={product.image}/> : null
			      		})
			      	}	
		      	</div>

						<h2 className="mt-10 text_color_inactive" id="toppings">Начинки</h2>
						<div className="pl-4">
							{
			      		props.ingredients.map((product,index)=>{
			      			return product.type === 'main' ? <Card key={index} name={product.name} price={product.price} image={product.image}/> : null
			      		})
			      	}	
		      	</div>
		      </>
				)}	
    	</div>

		</section>
  );

}

export default BurgerIngredients;