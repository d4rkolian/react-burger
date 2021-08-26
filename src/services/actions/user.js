import {
  REGISTER_ENDPOINT,
  AUTH_ENDPOINT,
  LOGOUT_ENDPOINT,
} from '../../utils/endpoints';
import { setCookie, getCookie } from '../../utils/';

export const USER_REGISTRATION_START = 'USER_REGISTRATION_START';
export const USER_REGISTRATION_SUCCESS = 'USER_REGISTRATION_SUCCESS';
export const USER_REGISTRATION_ERROR = 'USER_REGISTRATION_ERROR';
export const USER_AUTH_START = 'USER_AUTH_START';
export const USER_AUTH_SUCCESS = 'USER_AUTH_SUCCESS';
export const USER_AUTH_ERROR = 'USER_AUTH_ERROR';
export const USER_LOGOUT_START = 'USER_LOGOUT_START';
export const USER_LOGOUT_SUCCESS = 'USER_LOGOUT_SUCCESS';
export const USER_LOGOUT_ERROR = 'USER_LOGOUT_ERROR';

export function createUser (user) {
	return function(dispatch){
		// вызвать dispatch о начале запроса
		dispatch({type: USER_REGISTRATION_START});
		const reqOptions = {
	      method: 'POST',
	      headers: { 'Content-Type': 'application/json' },
	      body: JSON.stringify(user)
	    };
	    fetch(REGISTER_ENDPOINT, reqOptions)
	      .then(res => {
	      if (res.ok) {
	        return res.json();
	      }
	        return Promise.reject(`Ошибка ${res.status}`);
	      })
	      .then(data => {
	      	console.log(data);
	      	if (data.success) {
	        	dispatch({type: USER_REGISTRATION_SUCCESS}); 
	      	}
	      })
	      .catch(e => dispatch({type: USER_REGISTRATION_ERROR}) );
	}
}

export function authUser (data) {
	return function (dispatch){
		// авторизовываем
		dispatch({type: USER_AUTH_START});
		const reqOptions = {
	      method: 'POST',
	      headers: { 'Content-Type': 'application/json' },
	      body: JSON.stringify(data)
	    };
    fetch(AUTH_ENDPOINT, reqOptions)
      .then(res => {
      if (res.ok) {
        return res.json();
      }
        return Promise.reject(`Ошибка ${res.status}`);
      })
      .then(data => {
      	const accessToken = data.accessToken.split('Bearer ')[1];
      	const refreshToken = data.refreshToken;
   			setCookie('refreshToken', refreshToken);
   			setCookie('token', accessToken);
   			if ( data.success ) {
        	dispatch({ type: USER_AUTH_SUCCESS, user: data.user });
        }
      })
      .catch(e => dispatch({type: USER_AUTH_ERROR}) );
	}
}

export function logOut() {
	return function (dispatch){
		dispatch({type: USER_LOGOUT_START});
		const data = {
			token: getCookie('refreshToken'),
		}
		const reqOptions = {
	      method: 'POST',
	      headers: { 'Content-Type': 'application/json' },
	      body: JSON.stringify(data)
	    };
	    fetch(LOGOUT_ENDPOINT, reqOptions)
	      .then(res => {
	      if (res.ok) {
	        return res.json();
	      }
	        return Promise.reject(`Ошибка ${res.status}`);
	      })
	      .then(data => {
	      	// const accessToken = data.accessToken.split('Bearer ')[1];
	      	// const refreshToken = data.refreshToken;
	   			// setCookie('refreshToken', refreshToken);
	   			console.log(data);
	        dispatch({type: USER_LOGOUT_SUCCESS});
	      })
	      .catch(e => dispatch({type: USER_LOGOUT_ERROR}) );
	}
}