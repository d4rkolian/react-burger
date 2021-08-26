import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

const ProtectedRoute = ({children, ...rest}) => {

	const { isAuthorized } = useSelector( store => ({
		isAuthorized: store.user.isAuthorized,
	}));
	const pageGoTo = rest.reqauth ? 'login' : 'profile';

	return (
		<Route
      {...rest}
      	render={() => (isAuthorized === rest.reqauth) ? (children) : (<Redirect to={"/"+pageGoTo} />)
      }
    />
	);
}

export default ProtectedRoute