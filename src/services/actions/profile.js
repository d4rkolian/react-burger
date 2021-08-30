import { USER_INFORMATION_GET_ENDPOINT, USER_INFORMATION_PATCH_ENDPOINT, TOKEN_ENDPOINT } from '../../utils/endpoints';
import { getCookie, setCookie } from '../../utils'; 

export const PROFILE_GETINFO_REQUEST = 'PROFILE_GETINFO_REQUEST';
export const PROFILE_GETINFO_SUCCESS = 'PROFILE_GETINFO_SUCCESS';
export const PROFILE_GETINFO_ERROR = 'PROFILE_GETINFO_ERROR';

export const PROFILE_SETINFO_REQUEST = 'PROFILE_SETINFO_REQUEST';
export const PROFILE_SETINFO_SUCCESS = 'PROFILE_SETINFO_SUCCESS';
export const PROFILE_SETINFO_ERROR = 'PROFILE_SETINFO_ERROR';

export const PROFILE_WAS_UPDATED = 'PROFILE_WAS_UPDATED';

export function getUserInfo () {
	return function(dispatch){
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
						// не обрабатываем этот сценарий, потому что ставим куку accessToken на своей стороне на 20 минут
					}
				}
			})
			.catch( (error) => {
				console.log('Ошибка получения данных');
			});
	}
}

export function setUserInfo (user) {
	return function(dispatch){
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
				console.log('Ошибка'); 
			});
	}
}

export function refreshAccessToken(afterrefresh){
	console.log('мы отправили запрос на перевыпуск токена');
	const data = {
		token: getCookie('refreshToken'),
	}
	console.log(data);
	const reqOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  };
  fetch(TOKEN_ENDPOINT, reqOptions)
  	.then( res => { return res.json })
  	.then( data => { console.log(data); setCookie('token', data.refreshToken); } )
  	.catch( (err) => { console.log('Ошибка запроса на перевыпуск токена'); } );
  
}