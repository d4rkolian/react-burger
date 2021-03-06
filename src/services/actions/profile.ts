import { USER_INFORMATION_GET_ENDPOINT, USER_INFORMATION_PATCH_ENDPOINT, TOKEN_ENDPOINT } from '../../utils/endpoints';
import { getCookie, setCookie } from '../../utils'; 
import type { TUser, AppThunk, AppDispatch } from '../../types/data';

export const PROFILE_GETINFO_REQUEST:'PROFILE_GETINFO_REQUEST' = 'PROFILE_GETINFO_REQUEST';
export const PROFILE_GETINFO_SUCCESS:'PROFILE_GETINFO_SUCCESS' = 'PROFILE_GETINFO_SUCCESS';
export const PROFILE_GETINFO_ERROR:'PROFILE_GETINFO_ERROR' = 'PROFILE_GETINFO_ERROR';

export const PROFILE_SETINFO_REQUEST:'PROFILE_SETINFO_REQUEST' = 'PROFILE_SETINFO_REQUEST';
export const PROFILE_SETINFO_SUCCESS:'PROFILE_SETINFO_SUCCESS' = 'PROFILE_SETINFO_SUCCESS';
export const PROFILE_SETINFO_ERROR:'PROFILE_SETINFO_ERROR' = 'PROFILE_SETINFO_ERROR';

export const PROFILE_WAS_UPDATED:'PROFILE_WAS_UPDATED' = 'PROFILE_WAS_UPDATED';

export interface IProfileGetRequestAction {
	readonly type: typeof PROFILE_GETINFO_REQUEST;
}
export interface IProfileGetSuccessAction {
	readonly type: typeof PROFILE_GETINFO_SUCCESS;
	readonly payload: TUser;
}
export interface IProfileGetErrorAction {
	readonly type: typeof PROFILE_GETINFO_ERROR;
	readonly payload: TUser;
}

export interface IProfileSetRequestAction {
	readonly type: typeof PROFILE_SETINFO_REQUEST;
}
export interface IProfileSetSuccessAction {
	readonly type: typeof PROFILE_SETINFO_SUCCESS;
	readonly payload: TUser;
}
export interface IProfileSetErrorAction {
	readonly type: typeof PROFILE_SETINFO_ERROR;
	readonly payload: TUser;
}

export interface IProfileWasUpdatedAction {
	readonly type: typeof PROFILE_WAS_UPDATED;
	readonly payload: TUser;
}

export type TProfileActions = 
	| IProfileGetRequestAction
 	| IProfileGetSuccessAction
 	| IProfileGetErrorAction
 	| IProfileSetRequestAction
 	| IProfileSetSuccessAction
 	| IProfileSetErrorAction
 	| IProfileWasUpdatedAction;

export const getUserInfo:AppThunk = () => {
	return function(dispatch: AppDispatch){
		dispatch({ type: PROFILE_GETINFO_REQUEST });
		const accessToken = getCookie('token');
		const reqOptions = {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				Authorization: 'Bearer '+accessToken,
			},
		};
		fetch(USER_INFORMATION_GET_ENDPOINT, reqOptions)
			.then(res => { 
				return res.json();
			})
			.then( data => {
				if (data.success) {
					dispatch({ type: PROFILE_GETINFO_SUCCESS, payload: data.user })
				} else {
					if ( data.message === "jwt expired" ){
						// dispatch(refreshAccessToken('1'));
						// ???? ???????????????????????? ???????? ????????????????, ???????????? ?????? ???????????? ???????? accessToken ???? ?????????? ?????????????? ???? 20 ??????????
					}
				}
			})
			.catch( (error) => {
				console.log('???????????? ?????????????????? ????????????');
			});
	}
}

export const setUserInfo:AppThunk = (user:TUser) => {
	return function(dispatch: AppDispatch){
		dispatch({ type: PROFILE_SETINFO_REQUEST });
		const accessToken = getCookie('token');
		const reqOptions = {
			method: 'PATCH',
			body: JSON.stringify({ email: user.email, name: user.name }),
			headers: {
				'Content-Type': 'application/json',
				Authorization: 'Bearer '+accessToken,
			},
		};
		fetch(USER_INFORMATION_PATCH_ENDPOINT, reqOptions)
			.then( res => {
				return res.json();
			})
			.then( data => {
				// console.log(data);
				if ( data.success ) {
					dispatch({ type: PROFILE_SETINFO_SUCCESS, payload: data.user })
				}
			})
			.catch( (e) => {
				console.log('????????????'); 
			});
	}
}

export function refreshAccessToken(afterrefresh:any){
	console.log('???? ?????????????????? ???????????? ???? ???????????????????? ????????????');
	const data = {
		token: getCookie('refreshToken'),
	}
	const reqOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  };
  fetch(TOKEN_ENDPOINT, reqOptions)
  	.then( res => { return res.json })
  	.then( (data:any) => { console.log(data); setCookie('token', data.refreshToken); } )
  	.catch( (err) => { console.log('???????????? ?????????????? ???? ???????????????????? ????????????'); } );
  
}