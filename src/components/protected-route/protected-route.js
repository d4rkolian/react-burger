import React from 'react';
import { Route, Redirect, useHistory } from 'react-router-dom';

const ProtectedRoute = ({children, ...rest}) => {
	const history = useHistory();

	// определили страницу в зависимости от типа protected route
	let pageGoTo = rest.reqauth ? '/login' : '/profile';

	// если страница задана принудительно в state.from - переопределили
	if ( history.location.state !== undefined && history.location.state !== null ) {
		pageGoTo = history.location.state.from;
	}

	return (
		<Route
      {...rest}
      	render={() => (rest.isAuthorized === rest.reqauth) ? (children) : (<Redirect to={pageGoTo} />)
      }
    />
	);
}

export default ProtectedRoute