import {
	PROFILE_UPDATE_REQUEST,
	PROFILE_UPDATE_SUCCESS,
	PROFILE_UPDATE_ERROR,
} from '../actions/profile.js';

const initialState = {
	isLoading: false,
	isLoaded: false,
	user: {},
};

export const profileReducer = ( state = initialState, action ) => {
	switch (action.type) {
		case PROFILE_UPDATE_REQUEST: {
			return {
				...state,
				isLoading: true,
				isLoaded: initialState.isLoaded,
			}
		}
		case PROFILE_UPDATE_SUCCESS: {
			return {
				...state,
				isLoading: initialState.isLoading,
				isLoaded: true,
				user: action.payload,
			}
		}
		case PROFILE_UPDATE_ERROR: {
			return state;
		}
		default: {
			return state;
		}
	}
}