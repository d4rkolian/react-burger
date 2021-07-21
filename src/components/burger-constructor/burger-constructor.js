import React from 'react';
import { DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';

import BGStyles from './burger-constructor.module.css';
import meatImg from '../../images/meat-02.png';

import * as utils from '../../utils/data.js';

class Ingredient extends React.Component {
  render() {
    return (
      <li className="pl-8">
    		<span className={BGStyles.icon}><DragIcon type="primary" /></span>
	      <ConstructorElement
	        text={this.props.name}
	        price={this.props.price}
	        thumbnail={this.props.image}
	      />
      </li>
    );
  }
}

class BurgerConstructor extends React.Component {
  render() {
    return (
			<section className={[this.props.appStyles.leftright, "ml-10", "pt-25"].join(" ")}>
				<ul className={[BGStyles.inglist, "ml-4"].join(" ")} >
		      <li className="pl-8">
			      <ConstructorElement
			        type="top"
			        isLocked={true}
			        text="Краторная булка N-200i (верх)"
			        price={200}
			        thumbnail={meatImg}
			      />
		      </li>
		      <ul className={[BGStyles.ajustable, this.props.appStyles.customscroll].join(" ")}>
		      	{
		      		utils.ingredients.map((product,index)=>{
		      			let draggable = product.type !== "bun" ? true : false; 
		      			return product.type === 'main' ? <Ingredient key={product._id} name={product.name} price={product.price} image={product.image} draggable={draggable} /> : null
		      		})
		      	}		
			     </ul>
			     <li className="pl-8">
				      <ConstructorElement
				        type="bottom"
				        isLocked={true}
				        text="Краторная булка N-200i (низ)"
				        price={200}
				        thumbnail={meatImg}
				      />
			     </li>
		    </ul>
		    <div className={[BGStyles.total, "mt-10"].join(" ")}>
		    	<p className={[BGStyles.summ,"mr-10"].join(" ")}>
		    		<span className={BGStyles.text}>610</span>
		    		<span className={BGStyles.icon}><CurrencyIcon /></span>
		    	</p>
		    	<Button type="primary" size="large">
					  Оформить заказ
					</Button>
		    </div>
			</section>
    );
  }
}

export default BurgerConstructor;