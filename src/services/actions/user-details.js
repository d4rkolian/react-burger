import {
  PASS_RESET_ENDPOINT,
  PASS_RESET_STEP2_ENDPOINT,
} from '../../utils/endpoints';

export const PASS_RESET_REQUEST = 'PASS_RESET_REQUEST';
export const PASS_RESET_SUCCESS = 'PASS_RESET_SUCCESS';
export const PASS_RESET_ERROR = 'PASS_RESET_ERROR';
export const PASS_RESET_STEP2_REQUEST = 'PASS_RESET_STEP2_REQUEST';
export const PASS_RESET_STEP2_SUCCESS = 'PASS_RESET_STEP2_SUCCESS';
export const PASS_RESET_STEP2_ERROR = 'PASS_RESET_STEP2_ERROR';
export const PASS_RESET_STEP2_SUCCESS_AFTER = 'PASS_RESET_STEP2_SUCCESS_AFTER';

export function passReset(data, step){
	return function(dispatch){
		switch (step) {
			case 'first': {
				dispatch({ type: PASS_RESET_REQUEST });
				let requestOptions = {
					method: 'POST',
					body: JSON.stringify({'email': data.email}),
					headers: { 'Content-Type': 'application/json' },
				}
				fetch(PASS_RESET_ENDPOINT, requestOptions)
					.then(res => {
		      if (res.ok) {
		        return res.json();
		      }
		        return Promise.reject(`Ошибка ${res.status}`);
		      })
		      .then(data => {
		      	if ( data.success ){
		      		dispatch({type: PASS_RESET_SUCCESS});
		      	}
		      	console.log(data);
		      })
		      .catch(e => dispatch({type: PASS_RESET_ERROR}) );
				break;
			}
			case 'second': {
				dispatch({ type: PASS_RESET_STEP2_REQUEST });
				let requestOptions = {
					method: 'POST',
					body: JSON.stringify({'password': data.password, 'token': data.token}),
					headers: { 'Content-Type':'application/json' },
				}
				fetch(PASS_RESET_STEP2_ENDPOINT, requestOptions)
					.then(res => {
						if (res.ok) {
							return res.json();
						}
						return Promise.reject(`Ошибка ${res.status}`);
					})
					.then( data => {
						dispatch({ type: PASS_RESET_STEP2_SUCCESS });
					})
					.catch (e => dispatch({ type: PASS_RESET_STEP2_ERROR }));
				break;
			}
			default: {
				return true;
			}
		}
		
	}
}