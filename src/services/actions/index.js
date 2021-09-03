export const MOVE_TO_CONSTRUCTOR = 'MOVE_TO_CONSTRUCTOR';
export const LOAD_INGREDIENTS_REQUEST = 'LOAD_INGREDIENTS_REQUEST';
export const LOAD_INGREDIENTS_SUCCESS = 'LOAD_INGREDIENTS_SUCCESS';
export const LOAD_INGREDIENTS_ERROR = 'LOAD_INGREDIENTS_ERROR';
export const SET_AS_DETAILED = 'SET_AS_DETAILED';
export const CLEAN_DETAILED = 'CLEAN_DETAILED';
export const GET_ORDER_NUMBER_REQUEST = 'GET_ORDER_NUMBER_REQUEST';
export const GET_ORDER_NUMBER_SUCCESS = 'GET_ORDER_NUMBER_SUCCESS';
export const GET_ORDER_NUMBER_ERROR = 'GET_ORDER_NUMBER_ERROR';
export const TURN_ON_NOTICE = 'TURN_ON_NOTICE';
export const DELETE_FROM_CONSTRUCTOR = 'DELETE_FROM_CONSTRUCTOR';
export const MOVE_CONSTRUCTOR = 'MOVE_CONSTRUCTOR';

export function getOrderNumber(ingredientsIDs, ORDER_URL) {
  return function(dispatch) {
    dispatch({type: GET_ORDER_NUMBER_REQUEST});
    const reqOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        'ingredients': ingredientsIDs
      })
    };
    fetch(ORDER_URL, reqOptions)
      .then(res => {
      if (res.ok) {
        return res.json();
      }
        return Promise.reject(`Ошибка ${res.status}`);
      })
      .then(data => {
        dispatch({ type: GET_ORDER_NUMBER_SUCCESS, orderNumber: data.order.number });
      })
      .catch(e => dispatch({type: GET_ORDER_NUMBER_ERROR}) );
  }
}

export function getIngredients(API_URL) {
	return function(dispatch) {

		dispatch({type: LOAD_INGREDIENTS_REQUEST});
    fetch(API_URL)
    .then(res => {
			if (res.ok) {
				return res.json();
			}
				return Promise.reject(`Ошибка ${res.status}`);
		})
    .then(data => {
    	dispatch({type: LOAD_INGREDIENTS_SUCCESS, data: data.data});
    	})
    .catch(e => dispatch({type: LOAD_INGREDIENTS_ERROR}));

	}
}
