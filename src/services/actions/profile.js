import { USER_INFORMATION_GET_ENDPOINT, USER_INFORMATION_PATCH_ENDPOINT, TOKEN_ENDPOINT } from '../../utils/endpoints';
import { getCookie, setCookie } from '../../utils'; 

export const PROFILE_UPDATE_REQUEST = 'PROFILE_UPDATE_REQUEST';
export const PROFILE_UPDATE_SUCCESS = 'PROFILE_UPDATE_SUCCESS';
export const PROFILE_UPDATE_ERROR = 'PROFILE_UPDATE_ERROR';

export function getUserInfo () {
	return function(dispatch){
		dispatch({ type: PROFILE_UPDATE_REQUEST });
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
					dispatch({ type: PROFILE_UPDATE_SUCCESS, payload: data.user })
				} else {
					if ( data.message === "jwt expired" ){
						dispatch(refreshAccessToken('1'));
					}
				}
			})
			.catch( (error) => {
				console.log('Ошибка получения данных');
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