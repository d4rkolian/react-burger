import {
  REGISTER_ENDPOINT,
  AUTH_ENDPOINT,
  LOGOUT_ENDPOINT,
  TOKEN_ENDPOINT,
} from '../../utils/endpoints';
import { Dispatch } from 'redux';
import type { TUser } from '../../types/data';
import { setCookie, getCookie } from '../../utils/';

export const USER_REGISTRATION_START:'USER_REGISTRATION_START' = 'USER_REGISTRATION_START';
export const USER_REGISTRATION_SUCCESS:'USER_REGISTRATION_SUCCESS' = 'USER_REGISTRATION_SUCCESS';
export const USER_REGISTRATION_ERROR:'USER_REGISTRATION_ERROR' = 'USER_REGISTRATION_ERROR';
export const USER_AUTH_START:'USER_AUTH_START' = 'USER_AUTH_START';
export const USER_AUTH_SUCCESS:'USER_AUTH_SUCCESS' = 'USER_AUTH_SUCCESS';
export const USER_AUTH_ERROR:'USER_AUTH_ERROR' = 'USER_AUTH_ERROR';
export const USER_LOGOUT_START:'USER_LOGOUT_START' = 'USER_LOGOUT_START';
export const USER_LOGOUT_SUCCESS:'USER_LOGOUT_SUCCESS' = 'USER_LOGOUT_SUCCESS';
export const USER_LOGOUT_ERROR:'USER_LOGOUT_ERROR' = 'USER_LOGOUT_ERROR';
export const AUTH_BY_TOKEN:'AUTH_BY_TOKEN' = 'AUTH_BY_TOKEN';
export const AUTH_FAILED:'AUTH_FAILED' = 'AUTH_FAILED';

export interface IUserRegStartAction {
	readonly type: typeof USER_REGISTRATION_START;
}
export interface IUserRegSuccessAction {
	readonly type: typeof USER_REGISTRATION_SUCCESS;

}
export interface IUserRegErrorAction {
	readonly type: typeof USER_REGISTRATION_ERROR;
}
export interface IUserAuthStartAction {
	readonly type: typeof USER_AUTH_START;
}
export interface IUserAuthSuccessAction {
	readonly type: typeof USER_AUTH_SUCCESS;
	readonly user: TUser;
}
export interface IUserAuthErrorAction {
	readonly type: typeof USER_AUTH_ERROR;
}
export interface IUserLogoutStartAction {
	readonly type: typeof USER_LOGOUT_START;
}
export interface IUserLogoutSuccessAction {
	readonly type: typeof USER_LOGOUT_SUCCESS;
}
export interface IUserLogoutErrorAction {
	readonly type: typeof USER_LOGOUT_ERROR;
}
export interface IUserAuthByTokenAction {
	readonly type: typeof AUTH_BY_TOKEN;
}
export interface IUserAuthFailedAction {
	readonly type: typeof AUTH_FAILED;
}

export type TUserActions = 
	IUserRegStartAction
	| IUserRegSuccessAction
	| IUserRegErrorAction
	| IUserAuthStartAction
	| IUserAuthSuccessAction
	| IUserAuthErrorAction
	| IUserAuthByTokenAction
	| IUserAuthFailedAction
	| IUserLogoutStartAction
	| IUserLogoutSuccessAction
	| IUserLogoutErrorAction;

export function createUser (user: { email: string; name: string; password: string; }) {
	return function(dispatch:Dispatch){
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

export function authUser (data:{ email:string; password: string;}) {
	return function (dispatch:Dispatch){
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
   			setCookie('token', accessToken, { expires: 1200 });
   			if ( data.success ) {
        	dispatch({ type: USER_AUTH_SUCCESS, user: data.user });
        }
      })
      .catch(e => dispatch({ type: USER_AUTH_ERROR }) );
	}
}

export function isAuth() {
	return function(dispatch:Dispatch){
		const accessToken = getCookie('token');
		const refreshToken = getCookie('refreshToken');
		
		if ( accessToken && accessToken !== '' ){
			// есть accessToken
			dispatch({ type: AUTH_BY_TOKEN });
		} else if ( refreshToken && refreshToken !== '' ){
			// accessToken нет, но есть refreshToken, чтобы получить новый
			refreshAccessToken(refreshToken, isAuth);
		} else {
			dispatch({ type: AUTH_FAILED });
		}
		
	}
}

export function logOut() {
	return function (dispatch:Dispatch){
		dispatch({type: USER_LOGOUT_START});
		const data = {
			token: getCookie('refreshToken'),
		}
		setCookie('token', '', { expires: -1 });
	  setCookie('refreshToken', '', { expires: -1 });
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
	      	if ( data.success ){
	        	dispatch({type: USER_LOGOUT_SUCCESS});	
	      	}
	      })
	      .catch(e => { dispatch({type: USER_LOGOUT_ERROR}); console.log(e); } );
	}
}

export function refreshAccessToken(refreshToken: string, afterRefresh: any){
	const data = {
		token: refreshToken,
	}
	const reqOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  };
  fetch(TOKEN_ENDPOINT, reqOptions)
  	.then( res => { return res.json() })
  	.then( data => { 
  		if ( data.success ){
  			const accessToken = data.accessToken.split('Bearer ')[1];
      	const refreshToken = data.refreshToken;
   			setCookie('refreshToken', refreshToken);
   			setCookie('token', accessToken, { expires: 1200 });
   			afterRefresh();
  		} 
  	})
  	.catch( (err) => { console.log('Ошибка запроса на перевыпуск токена'); } );
}

