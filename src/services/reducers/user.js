import {
	USER_REGISTRATION_START,
	USER_REGISTRATION_SUCCESS,
	USER_REGISTRATION_ERROR
} from '../actions/user';

const initialState = {
	isCreating: false,
}

export const userReducer = (state = initialState, action) => {

	switch (action.type) {
		case USER_REGISTRATION_START: {
			return {
				...state,
				isCreating: true,
			}
		}
		case USER_REGISTRATION_SUCCESS: {
			return state;
		}
		case USER_REGISTRATION_ERROR: {
			return state;
		}
		default: {
			return state;
		}
	}
}

