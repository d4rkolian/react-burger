import React from 'react';
import AppHeader from '../app-header/app-header';
import AppStyles from './app.module.css';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';

import IngredientDetails from '../ingredient-details/ingredient-details';
import OrderDetails from '../order-details/order-details';

import {IngredientsContext} from '../../utils/ingredientsContext.js';

import Modal from '../modal/modal';

function App() {

	const API_URL = 'https://norma.nomoreparties.space/api/ingredients';
	const ORDER_URL = 'https://norma.nomoreparties.space/api/orders';

	const [state,setState] = React.useState({
		isLoading: true,
		ingredients: [],
		orderNumber: null,
		orderLoading: true,
	});

	const [modalVisible, setVisible] = React.useState(false)
	const [modalChildren, setModalChildren] = React.useState(null);

	function clickHandle(event) {

		if ( event.currentTarget.getAttribute('modaltype') )
		{
			let component = null;
		  switch( event.currentTarget.getAttribute('modaltype') ) {
		    case "ingredients":
		    	const currProduct = JSON.parse(event.currentTarget.getAttribute('product'));
		      component = <IngredientDetails product={currProduct} />;
		      break;
		    case "order":
		    	// рендерим компонент
		    	component = <OrderDetails orderNumber={state.orderNumber} orderLoading={state.orderLoading} />;

		    	// собираем ID продуктов
		    	var ingredientsIDs = [];
		    	var ingredientsElements = document.getElementById('burgerconstructor').querySelectorAll('li.ingredient');
		    	for (let i = 0; i < ingredientsElements.length; i++) {
					  ingredientsIDs.push(JSON.parse(ingredientsElements[i].getAttribute('product'))._id)
					}
		    	// обращаемся к API, получаем номер заказа
		    	getOrderNum(ingredientsIDs);
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

	function getOrderNum(ingredientsIDs){
		setState({ ...state, orderLoading: true });
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
				setState({...state, orderNumber: data.order.number, orderLoading: false });
			})
			.catch(e => console.log('Error see can I in order number, my young padavan'));
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

	React.useEffect(() => {
		const getIngredients = async () => {
	    fetch(API_URL)
	    .then(res => {
				if (res.ok) {
					return res.json();
				}
					return Promise.reject(`Ошибка ${res.status}`);
			})
	    .then(data => setState({...state, ingredients: data.data, isLoading: false}) )
	    .catch(e => console.log('Error see can I, my young padavan'));
	  }
	  getIngredients();
		},
		[]
	);

  return (
    <>
      <AppHeader />
      <main>
      	<IngredientsContext.Provider value={state.ingredients} >
        	<BurgerIngredients appStyles={AppStyles} isLoading={state.isLoading} clickHandle={clickHandle} />
        	<BurgerConstructor appStyles={AppStyles} isLoading={state.isLoading} clickHandle={clickHandle} />
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