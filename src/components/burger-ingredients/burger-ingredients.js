import React from 'react';
import BIStyles from './burger-ingredients.module.css';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import * as utils from '../../utils/data.js';

class Card extends React.Component {
	render(){
		return(
				<div className={[BIStyles.card, "mb-10"].join(" ")}>
					<a href="#" className={BIStyles.img} ><img src={this.props.image} /></a>
					<p className={BIStyles.price}>{this.props.price}&nbsp;<CurrencyIcon type="primary" /></p>
					<p className={BIStyles.name}>{this.props.name}</p>
				</div>
			);
	}
}

class BurgerIngredients extends React.Component {

	constructor(props) {
    super(props);

    this.onButtonClick = this.onButtonClick.bind(this);
    this.state = {
        isToggled: false,
    }
  }

  onButtonClick () {
  	alert('test switch');
    this.setState({
        isToggled: !this.state.isToggled,
    })
  }

  render() {
    return (
			<section className={this.props.appStyles.leftright}>
				<h1 className="mt-10">Соберите бургер</h1>
				<ul className={[BIStyles.jumpTo, "mt-5"].join(" ")}>
					<li className={BIStyles.active}>Булки</li>
					<li onClick={this.onButtonClick}>Соусы</li>
					<li>Начинки</li>
				</ul>

				<div className={[BIStyles.ingList, this.props.appStyles.customscroll].join(" ")} >
					<h2 className="mt-10 mb-6" id="buns">Булки</h2>
					<div className="pl-4">
						{
		      		utils.ingredients.map((product,index)=>{
		      			return product.type === 'bun' ? <Card key={index} name={product.name} price={product.price} image={product.image}/> : null
		      		})
		      	}	
					</div>

					<h2 className="mt-10 text_color_inactive" id="sauces">Соусы</h2>
					<div className="pl-4">
						{
		      		utils.ingredients.map((product,index)=>{
		      			return product.type === 'sauce' ? <Card key={index} name={product.name} price={product.price} image={product.image}/> : null
		      		})
		      	}	
	      	</div>

					<h2 className="mt-10 text_color_inactive" id="toppings">Начинки</h2>
					<div className="pl-4">
						{
		      		utils.ingredients.map((product,index)=>{
		      			return product.type === 'main' ? <Card key={index} name={product.name} price={product.price} image={product.image}/> : null
		      		})
		      	}	
	      	</div>
      	</div>

			</section>
    );
  }
}

export default BurgerIngredients;