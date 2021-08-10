import React, {useContext} from 'react';

// импортируем все, что связано с App
import AppHeader from '../app-header/app-header';
import AppStyles from './app.module.css';

// импортируем все, что связано с drag and drop
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

// импортируем другие компоненты
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import IngredientDetails from '../ingredient-details/ingredient-details';
import OrderDetails from '../order-details/order-details';
import Modal from '../modal/modal';

import { useSelector, useDispatch } from 'react-redux';

function App() {

	const ORDER_URL = 'https://norma.nomoreparties.space/api/orders';
	const dispatch = useDispatch();
	const ingredientsIDs = []; 
	useSelector( store => store.burger.ingredients.constructor ).map( (item, index) => {
		return ingredientsIDs.push(item._id);
	});

	const [state,setState] = React.useState({
		isLoading: true,
		ingredientsConstructor: [],
		ingredientsConstructorBun: [],
		orderNumber: null,
	});

	// TODO вычистить
	const [modalVisible, setVisible] = React.useState(false)
	const [modalChildren, setModalChildren] = React.useState(null);

	function clickHandle(event) {

		if ( event.currentTarget.getAttribute('modaltype') )
		{
			let component = null;
		  switch( event.currentTarget.getAttribute('modaltype') ) {
		    case "ingredients":		      
		      component = <IngredientDetails />;
		      dispatch({
		      	type: 'SET_AS_DETAILED',
	      		arraykey: event.currentTarget.getAttribute('arraykey'),
		      });
		      break;
		    case "order":
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
				        dispatch({ type: 'GET_ORDER_NUMBER', orderNumber: data.order.number });
				      })
				      .catch(e => console.log('Error see can I in order number, my young padavan'));
				  }
				  getOrderNum(ingredientsIDs);
		    	component = <OrderDetails  />;
		    	break;
		    default:
		      component = 'Сюда можно поставить компонент-заглушку модалки';
		  }
		  setModalChildren(component);
		} else {
			setModalChildren(null);
			dispatch({type: 'CLEAN_DETAILED'});
		}
		setVisible(!modalVisible);
		event.preventDefault();
	}

	function handleUserKeyPress(event) { 
	  if (event.keyCode === 27) {
	  	setVisible(false);
	  	dispatch({type: 'CLEAN_DETAILED'});
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

  // TODO: поправить state.isLoading на хранилище
  return (
    <>
      <AppHeader />
      <main>
      	<DndProvider backend={HTML5Backend}>
        	<BurgerIngredients appStyles={AppStyles} isLoading={state.isLoading} clickHandle={clickHandle} />
        	<BurgerConstructor appStyles={AppStyles} clickHandle={clickHandle}  />
        </DndProvider>

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