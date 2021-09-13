import {
	WS_CONNECTION_START,
	WS_CONNECTION_SUCCESS,
	WS_CONNECTION_ERROR,
	WS_CONNECTION_CLOSE,
	WS_GET_MESSAGE,
	WS_SEND_MESSAGE,
} from '../actions/socket';

const initialState = {
	isConnecting: false,
	connected: false,
	orders: [],
	count: {
		total: 0,
		totalToday: 0,
	},
	error: false,
}

export const socketReducer = (state = initialState, action) => {
	switch (action.type){
		case WS_CONNECTION_START: {
			return {
				...state,
				isConnecting: true,
				connected: initialState.connected,
			}
		}
		case WS_CONNECTION_SUCCESS: {
			return {
				...state,
				isConnecting: initialState.isConnecting,
				connected: true,
				error: initialState.error,
			};
		}
		case WS_CONNECTION_ERROR: {
			return {
				...state,
				connected: initialState.connected,
				error: true,
			}
		}
		case WS_GET_MESSAGE: {
			console.log('пришла инфа по сокету');
			return {
				...state,
				orders: action.payload.orders.slice(0,12),
				count: {
					total: action.payload.total,
					totalToday: action.payload.totalToday,
				}
			}
		}
		case WS_CONNECTION_CLOSE: {
			return {
				...state,
				connected: initialState.connected,
			}
		}
		default: {
			return state;
		}
	}
}