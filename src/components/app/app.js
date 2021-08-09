import React, {useContext} from 'react';

// импортируем все, что связано с App
import AppHeader from '../app-header/app-header';
import AppStyles from './app.module.css';

// импортируем другие компоненты
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import IngredientDetails from '../ingredient-details/ingredient-details';
import OrderDetails from '../order-details/order-details';
import Modal from '../modal/modal';

import {IngredientsContext} from '../../utils/ingredientsContext.js'; // TODO удалить после переноса на Redux
import { useSelector, useDispatch } from 'react-redux';

function App() {

	const API_URL = 'https://norma.nomoreparties.space/api/ingredients';	// TODO удалить
	const ORDER_URL = 'https://norma.nomoreparties.space/api/orders';

	const [state,setState] = React.useState({
		isLoading: true,
		ingredientsConstructor: [],
		ingredientsConstructorBun: [],
		orderNumber: null,
	});

	const [modalVisible, setVisible] = React.useState(false)
	const [modalChildren, setModalChildren] = React.useState(null);
	const [orderLoading, setOrderLoading] = React.useState(false);

	function clickHandle(event) {

		if ( event.currentTarget.getAttribute('modaltype') )
		{
			let component = null;
		  switch( event.currentTarget.getAttribute('modaltype') ) {
		    case "ingredients":
		    	const currProduct = JSON.parse(event.currentTarget.getAttribute('product'));
		      component = <IngredientDetails product={currProduct} />;

		      // отловить клик по ингредиенту в основном их списке
		      if ( event.currentTarget.getAttribute('source') && event.currentTarget.getAttribute('source') === 'ingredientsList' ){
		      	if ( event.currentTarget.getAttribute('ingtype') === 'bun' ) {
		      		setState({
			      		...state,
			      		ingredientsConstructorBun: currProduct._id,
			      	});
		      	} else {
			      	setState({
			      		...state,
			      		ingredientsConstructor: [
			      			...state.ingredientsConstructor,
			      			currProduct._id,
			      		]
			      	});
			      }
		      }
		      break;
		    case "order":
					// рендерим компонент
		    	component = <OrderDetails orderLoading={orderLoading} orderNumber={state.orderNumber} />;
		    	break;
		    default:
		      component = 'Сюда можно поставить компонент-заглушку модалки';
		  }
		  setModalChildren(component);
		} else {
			setModalChildren(null);
		}
		setVisible(!modalVisible);
		event.preventDefault();
	}

	function handleUserKeyPress(event) { 
	  if (event.keyCode === 27) {
	  	setVisible(false);
	  }
	}

	React.useEffect(
		() => {
			window.addEventListener('keydown', handleUserKeyPress);
	    return () => {
	      window.removeEventListener('keydown', handleUserKeyPress);
	    };
		}
	,[]
	);

  React.useEffect(
  	() => {
		const getOrderNum = async (ingredientsIDs) => {
	    const reqOptions = {
	      method: 'POST',
	      headers: { 'Content-Type': 'application/json' },
	      body: JSON.stringify({
	        'ingredients': ingredientsIDs
	      })
	    };
	    fetch(ORDER_URL, reqOptions)
	      .then(res => {
	      if (res.ok) {
	        return res.json();
	      }
	        return Promise.reject(`Ошибка ${res.status}`);
	      })
	      .then(data => {
	        setState({...state, orderNumber: data.order.number, orderLoading: true });
	      })
	      .catch(e => console.log('Error see can I in order number, my young padavan'));
	  }
	  // getOrderNum(state.ingredientsConstructor);
		},
		[]
	);

  return (
    <>
      <AppHeader />
      <main>
      	<IngredientsContext.Provider value={state.ingredients} >
        	<BurgerIngredients appStyles={AppStyles} isLoading={state.isLoading} clickHandle={clickHandle} />
        	<BurgerConstructor appStyles={AppStyles} clickHandle={clickHandle} ingredientsConstructor={state.ingredientsConstructor} ingredientsConstructorBun={state.ingredientsConstructorBun} />
        </IngredientsContext.Provider >

        { modalVisible && (
        	<Modal clickHandle={clickHandle}  >
        		{modalChildren}
        	</Modal>
        )}
      </main>
    </>
  );
}

export default App;