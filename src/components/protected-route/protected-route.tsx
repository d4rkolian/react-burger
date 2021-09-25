import React, { FC, useEffect } from 'react';
import { History } from 'history';
// import { useDispatch, useSelector } from 'react-redux';
import { useSelector, useDispatch } from '../../utils/hooks';
import { Route, Redirect, useHistory } from 'react-router-dom';
import { isAuth } from '../../services/actions/user';

type TProps = {
	path: string;
	exact: boolean;
	reqauth?: boolean;
	isAuthorized?: boolean;
	appStyles?: {
		[x: string]:string;
	}
};

interface IHistory extends History {
	location: {
		pathname: string;
		search: string;
		hash: string;
		state: any;
	};
}

const ProtectedRoute: FC<TProps> = ({children, reqauth, ...rest}) => {

	const history:IHistory = useHistory();
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
		pageGoTo = reqauth ? '/login' : '/profile';
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
      	render={() => (rest.isAuthorized === reqauth) ? (children) : (<Redirect to={pageGoTo} />)
      }
    />
	);
}

export default ProtectedRoute