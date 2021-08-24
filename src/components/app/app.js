import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import * as Pages from '../../pages'; 
import IngredientDetails from '../ingredient-details/ingredient-details';
import OrderDetails from '../order-details/order-details';

import AppHeader from '../app-header/app-header';
import AppStyles from './app.module.css';
import Modal from '../modal/modal';
import {
		CLEAN_DETAILED, DELETE_FROM_CONSTRUCTOR,
		TURN_ON_NOTICE, getOrderNumber } from '../../services/actions';

function App() {

	const ORDER_URL = 'https://norma.nomoreparties.space/api/orders';
	const dispatch = useDispatch();
	const ingredientsIDs = []; 
	useSelector( store => store.burger.ingredients.constructor ).map( (item, index) => {
		return ingredientsIDs.push(item._id);
	});
	const {isLoading, bunChosen} = useSelector( store => ({
		isLoading: store.burger.loaders.ingredients,
		bunChosen: store.burger.ingredients.bunChosen
	}));

	const [modalVisible, setVisible] = React.useState(false)
	const [modalChildren, setModalChildren] = React.useState(null);

	function handleUserKeyPress(event) { 
	  if (event.keyCode === 27) {
	  	setVisible(false);
	  	dispatch({type: CLEAN_DETAILED});
	  }
	}

	function clickHandle(event) {

		if ( event.currentTarget.tagName === 'svg' ){
			// получить индекс элемента, которого надо удалить
			const listkey = event.currentTarget.closest('li').getAttribute('listkey');
			dispatch({type: DELETE_FROM_CONSTRUCTOR, id: listkey});
			event.stopPropagation();
		}

		let visible = false;
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
		      visible = true;
		      break;
		    case "order":
		    // получаем номер заказа
				  if ( bunChosen ) {
				  	dispatch(getOrderNumber(ingredientsIDs,ORDER_URL));
				  	visible = true;
				  } else {
				  	dispatch({type: TURN_ON_NOTICE});
				  	break;
				  }
		    	component = <OrderDetails  />;
		    	break;
		    default:
		      component = 'Сюда можно поставить компонент-заглушку модалки';
		  }
		  setModalChildren(component);
		} else {
			setModalChildren(null);
			dispatch({type: CLEAN_DETAILED});
		}
		setVisible(visible);
		event.preventDefault();
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

  return (
    <>
    	<Router>
      <AppHeader />
      <main>
      		<Switch>
	      		<Route path="/" exact={true}>{ /* TODO: перенести на страницу HomePage*/ }
			      	<Pages.HomePage appStyles={AppStyles} isLoading={isLoading} clickHandle={clickHandle} />
		        </Route>
		        <Route path="/login" exact={true}>
		        	<Pages.LoginPage />
		        </Route>
		        <Route path="/register" exact={true}>
		        	<Pages.RegistrationPage />
		        </Route>
		        <Route path="/forgot-password" exact={true}>
		        	<Pages.PasswordForgotPage />
		        </Route>
		        <Route path="/reset-password" exact={true}>
		        	<Pages.PasswordResetPage />
		        </Route>
		        <Route path="/profile" exact={true}>
		        	<Pages.ProfilePage />
		        </Route>
		        <Route>
		        	<Pages.Page404 />
		        </Route>
	        </Switch>
        { modalVisible && (
        	<Modal clickHandle={clickHandle}  >
        		{modalChildren}
        	</Modal>
        )}
      </main>
      </Router>
    </>
  );
}

export default App;