import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Route, Switch, useHistory } from 'react-router-dom';
import * as Pages from '../../pages'; 
import IngredientDetails from '../ingredient-details/ingredient-details';
import OrderDetails from '../order-details/order-details';
import ProtectedRoute from '../protected-route/protected-route';

import AppHeader from '../app-header/app-header';
import AppStyles from './app.module.css';
import Modal from '../modal/modal';
import {
		CLEAN_DETAILED, DELETE_FROM_CONSTRUCTOR,
		TURN_ON_NOTICE, getOrderNumber } from '../../services/actions';
import { isAuth } from '../../services/actions/user';

function App() {

	const ORDER_URL = 'https://norma.nomoreparties.space/api/orders';
	const dispatch = useDispatch();	
	const history = useHistory();

	const ingredientsIDs = []; 
	useSelector( store => store.burger.ingredients.constructor ).map( (item, index) => {
		return ingredientsIDs.push(item._id);
	});
	const { isLoading, bunChosen, isAuthorized } = useSelector( store => ({
		isLoading: store.burger.loaders.ingredients,
		bunChosen: store.burger.ingredients.bunChosen,
		isAuthorized: store.user.isAuthorized,
	}));

	if ( !isAuthorized ) {
		// если в хранилище нет флага об авторизации - проверить, возможно стоит кука
		dispatch(isAuth());
	}

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
		      component = <IngredientDetails id={event.currentTarget.getAttribute('arraykey')} />;
		      dispatch({
		      	type: 'SET_AS_DETAILED',
	      		arraykey: event.currentTarget.getAttribute('arraykey'),
		      });
		      visible = true;
		      break;
		    case "order":
		    // оформляем заказ
				  if ( bunChosen ) {
				  	// sprint #3 - проверить, что юзер авторизован
				  	if ( isAuthorized ) {
				  		dispatch(getOrderNumber(ingredientsIDs,ORDER_URL));
				  		visible = true;
				  	} else {
				  		history.replace({
				  			pathname: '/login',
				  			state: { from : '/' }
				  		});
				  	}
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
			if ( window.location.pathname !== '/' ) {
				window.history.replaceState(null, "Stellar Burgers", "/");
			} 
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
      <AppHeader />
      <main>
      		<Switch>
	      		<Route path="/" exact={true}>
			      	<Pages.HomePage appStyles={AppStyles} isLoading={isLoading} clickHandle={clickHandle} />
		        </Route>
		        <ProtectedRoute path="/login" exact={true} reqauth={false} isAuthorized={isAuthorized}>
		        	<Pages.LoginPage />
		        </ProtectedRoute>
		        <ProtectedRoute path="/register" exact={true} reqauth={false} isAuthorized={isAuthorized}>
		        	<Pages.RegistrationPage />
		        </ProtectedRoute>
		        <ProtectedRoute path="/forgot-password" exact={true} reqauth={false} isAuthorized={isAuthorized}>
		        	<Pages.PasswordForgotPage />
		        </ProtectedRoute>
		        <ProtectedRoute path="/reset-password" exact={true} reqauth={false} isAuthorized={isAuthorized}>
		        	<Pages.PasswordResetPage />
		        </ProtectedRoute>
		        <ProtectedRoute path="/profile" exact={true} reqauth={true} isAuthorized={isAuthorized}>
		        	<Pages.ProfilePage />
		        </ProtectedRoute>
		        <ProtectedRoute path="/profile/orders" exact={true} reqauth={true} isAuthorized={isAuthorized}>
		        	<Pages.ProfilePage child="orders" />
		        </ProtectedRoute>
		        <Route path="/ingredients/:id" exact={true}  >
		        	<Pages.IngredientPage />
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
   </>
  );
}

export default App;