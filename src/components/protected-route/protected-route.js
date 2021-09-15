import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Redirect, useHistory } from 'react-router-dom';
import { isAuth } from '../../services/actions/user';

const ProtectedRoute = ({children, ...rest}) => {

	const history = useHistory();
	const dispatch = useDispatch();
	const { authFailed } = useSelector( store => ({ authFailed: store.user.authFailed }) );
	let pageGoTo = '';

	// если страница задана принудительно в state.from - переопределили
	if ( history.location.state !== undefined && history.location.state !== null && history.location.state.from !== undefined ) {
		pageGoTo = history.location.state.from;
	}

	// отдельное правило для случая, когда по прямой ссылке открывается просмотр заказа
	if ( !rest.isAuthorized && history.location.pathname.includes('/profile/orders/') ) { pageGoTo = history.location.pathname; }

	// определили страницу в зависимости от типа protected route - если после попытки входа по токену не получилось
	if ( authFailed ){
		pageGoTo = rest.reqauth ? '/login' : '/profile';
	}

	useEffect(
		() => {
			if ( !rest.isAuthorized ) {
				// если в пропсах нет флага об авторизации - проверить, возможно стоит кука
				dispatch(isAuth());
			}
		},
		[]
	);

	return (
		<Route
      {...rest}
      	render={() => (rest.isAuthorized === rest.reqauth) ? (children) : (<Redirect to={pageGoTo} />)
      }
    />
	);
}

export default ProtectedRoute