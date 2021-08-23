export const USER_REGISTRATION_START = 'USER_REGISTRATION_START';
export const USER_REGISTRATION_SUCCESS = 'USER_REGISTRATION_SUCCESS';
export const USER_REGISTRATION_ERROR = 'USER_REGISTRATION_ERROR';

export function createUser () {
	return function(dispatch){
		// вызвать dispatch о начале запроса
		console.log('мы начали регистрацию пользователя');
		dispatch({type: USER_REGISTRATION_START});
	}
}