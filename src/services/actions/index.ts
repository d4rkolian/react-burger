import { API_URL, ORDER_URL } from '../../utils/endpoints';
import { getCookie } from '../../utils'; 
import type { AppThunk, AppDispatch } from '../../types/data';

export const MOVE_TO_CONSTRUCTOR:'MOVE_TO_CONSTRUCTOR' = 'MOVE_TO_CONSTRUCTOR';
export const LOAD_INGREDIENTS_REQUEST:'LOAD_INGREDIENTS_REQUEST' = 'LOAD_INGREDIENTS_REQUEST';
export const LOAD_INGREDIENTS_SUCCESS:'LOAD_INGREDIENTS_SUCCESS' = 'LOAD_INGREDIENTS_SUCCESS';
export const LOAD_INGREDIENTS_ERROR:'LOAD_INGREDIENTS_ERROR' = 'LOAD_INGREDIENTS_ERROR';
export const SET_AS_DETAILED:'SET_AS_DETAILED' = 'SET_AS_DETAILED';
export const CLEAN_DETAILED:'CLEAN_DETAILED' = 'CLEAN_DETAILED';
export const GET_ORDER_NUMBER_REQUEST:'GET_ORDER_NUMBER_REQUEST' = 'GET_ORDER_NUMBER_REQUEST';
export const GET_ORDER_NUMBER_SUCCESS:'GET_ORDER_NUMBER_SUCCESS' = 'GET_ORDER_NUMBER_SUCCESS';
export const GET_ORDER_NUMBER_ERROR:'GET_ORDER_NUMBER_ERROR' = 'GET_ORDER_NUMBER_ERROR';
export const GET_ORDER_BY_NUMBER_REQUEST:'GET_ORDER_BY_NUMBER_REQUEST' = 'GET_ORDER_BY_NUMBER_REQUEST';
export const GET_ORDER_BY_NUMBER_SUCCESS:'GET_ORDER_BY_NUMBER_SUCCESS' = 'GET_ORDER_BY_NUMBER_SUCCESS';
export const GET_ORDER_BY_NUMBER_ERROR:'GET_ORDER_BY_NUMBER_ERROR' = 'GET_ORDER_BY_NUMBER_ERROR';
export const TURN_ON_NOTICE:'TURN_ON_NOTICE' = 'TURN_ON_NOTICE';
export const DELETE_FROM_CONSTRUCTOR:'DELETE_FROM_CONSTRUCTOR' = 'DELETE_FROM_CONSTRUCTOR';
export const MOVE_CONSTRUCTOR:'MOVE_CONSTRUCTOR' = 'MOVE_CONSTRUCTOR';

export const getOrderNumber:AppThunk = (ingredientsIDs:string[]) => {
  return function(dispatch: AppDispatch) {
    dispatch({type: GET_ORDER_NUMBER_REQUEST});
    const accessToken = getCookie('token');
    const reqOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer '+accessToken,
      },
      body: JSON.stringify({ 'ingredients': ingredientsIDs })
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

export const getOrderByNumber:AppThunk = (orderNumber:number) => {
  return function (dispatch: AppDispatch){
    dispatch({ type: GET_ORDER_BY_NUMBER_REQUEST });
    const reqOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    };
    fetch(ORDER_URL+'/'+orderNumber, reqOptions)
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject('Ошибка запроса заказа по номеру');
      })
      .then(data => {
        if ( data.success ) {
          dispatch({ type: GET_ORDER_BY_NUMBER_SUCCESS, order: data.orders[0] });
        }
      })
      .catch(e => dispatch({type: GET_ORDER_BY_NUMBER_ERROR}) );
  }
}

export const getIngredients:AppThunk = () => {
	return function(dispatch: AppDispatch) {

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
