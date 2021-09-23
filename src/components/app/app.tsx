import React, { useEffect, FC } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Route, Switch, useHistory, useLocation } from 'react-router-dom';
import * as Pages from '../../pages'; 
import IngredientDetails from '../ingredient-details/ingredient-details';
import { OrderView } from '../order-view/order-view';
import OrderDetails from '../order-details/order-details';
import ProtectedRoute from '../protected-route/protected-route';
import AppHeader from '../app-header/app-header';
import Modal from '../modal/modal';
import { CLEAN_DETAILED, DELETE_FROM_CONSTRUCTOR, TURN_ON_NOTICE, getOrderNumber } from '../../services/actions/index';
import { isAuth } from '../../services/actions/user';
import AppStyles from './app.module.css';

import type { TRootState } from '../../index';

function App() {

	const dispatch = useDispatch();	
	const history = useHistory();
	const location:any = useLocation(); // TODO
	const background = (history.action === 'PUSH' || history.action === 'REPLACE') && location.state && location.state.background;

	const ingredientsIDs:any[] = []; 	// TODO

	useSelector( (store:TRootState) => store.burger.ingredients.constructor ).map( (item:any, index:number) => {
		if ( item.type === 'bun' ) { ingredientsIDs.push(item._id); } // дополнительная булочка
		return ingredientsIDs.push(item._id);
	});
	const { isLoading, bunChosen, isAuthorized } = useSelector( (store:TRootState) => ({
		isLoading: store.burger.loaders.ingredients,
		bunChosen: store.burger.ingredients.bunChosen,
		isAuthorized: store.user.isAuthorized,
	}));

	useEffect(
		() => {
			if ( !isAuthorized ) {
				// если в хранилище нет флага об авторизации - проверить, возможно стоит кука
				dispatch(isAuth());
			}
		},
		[]
	);

	const [modalVisible, setVisible] = React.useState(false);
	const [modalChildren, setModalChildren] = React.useState<any>(null);

	function clickHandle(event:any) {

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
		      dispatch({
		      	type: 'SET_AS_DETAILED',
	      		arraykey: event.currentTarget.getAttribute('arraykey'),
		      });
		      break;
		    case "order":
		    	// оформляем заказ
				  if ( bunChosen ) {
				  	// sprint #3 - проверить, что юзер авторизован
				  	if ( isAuthorized ) {
				  		dispatch(getOrderNumber(ingredientsIDs));
				  		visible = true;
				  		setVisible(visible);
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
		}
		setVisible(visible);
		if ( event.currentTarget.tagName !== 'A' ){
			event.preventDefault();
		}
	}

  return (
  	<>
      <AppHeader />
      <main>
    		<Switch location={background || location} >
      		<Route path="/" exact={true}>
		      	<Pages.HomePage appStyles={AppStyles} isLoading={isLoading} clickHandle={clickHandle} />
	        </Route>
	        <Route path="/ingredients/:id" exact >
	        	<Pages.IngredientPage />
	        </Route>
	       	<ProtectedRoute path="/login" exact reqauth={false} isAuthorized={isAuthorized}>
	        	<Pages.LoginPage />
	        </ProtectedRoute>
	        <ProtectedRoute path="/register" exact reqauth={false} isAuthorized={isAuthorized}>
	        	<Pages.RegistrationPage />
	        </ProtectedRoute>
	        <ProtectedRoute path="/forgot-password" exact reqauth={false} isAuthorized={isAuthorized}>
	        	<Pages.PasswordForgotPage />
	        </ProtectedRoute>
	        <ProtectedRoute path="/reset-password" exact reqauth={false} isAuthorized={isAuthorized}>
	        	<Pages.PasswordResetPage />
	        </ProtectedRoute>
	        <ProtectedRoute path="/profile" exact reqauth={true} isAuthorized={isAuthorized}>
	        	<Pages.ProfilePage />
	        </ProtectedRoute>
	        <ProtectedRoute path="/profile/orders" exact reqauth={true} isAuthorized={isAuthorized}>
	        	<Pages.ProfilePage child="orders" />
	        </ProtectedRoute>
	        <Route path="/feed" exact >
	        	<Pages.FeedPage />
	        </Route>
	        <Route path="/feed/:id" exact >
	        	<Pages.OrderPage appStyles={AppStyles} />
	        </Route>
	        <ProtectedRoute path="/profile/orders/:id" exact reqauth={true} isAuthorized={isAuthorized}>
	        	<Pages.OrderPage appStyles={AppStyles} />
	        </ProtectedRoute>
	        <Route>
	        	<Pages.Page404 />
	        </Route>
        </Switch>
        {/* ниже первая строчка - это временная заглушка из "обычной" модалки для номера заказа, перед доработками спринта №4 
        { modalVisible && <Modal isVisible={modalVisible} clickHandle={clickHandle}>{modalChildren}</Modal>  */ }

        { background && !modalVisible && <Route path="/ingredients/:id" children={<Modal ><IngredientDetails /></Modal>} /> }
        { background && !modalVisible && <Route path="/feed/:id" exact children={<Modal ><OrderView appStyles={AppStyles} /></Modal>} /> }
        { background && !modalVisible && <Route path="/profile/orders/:id" exact reqauth={true} isAuthorized={isAuthorized} children={<Modal ><OrderView appStyles={AppStyles} /></Modal>} /> }
     
      </main>
   </>
  );
}

export default App;