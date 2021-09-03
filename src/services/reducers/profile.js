import {
	PROFILE_GETINFO_REQUEST,
	PROFILE_GETINFO_SUCCESS,
	PROFILE_GETINFO_ERROR,
	PROFILE_SETINFO_REQUEST,
	PROFILE_SETINFO_SUCCESS,
	PROFILE_SETINFO_ERROR,
	PROFILE_WAS_UPDATED,
} from '../actions/profile.js';

const initialState = {
	isLoading: false,
	isLoaded: false,
	user: {},
	isUpdating: false,
	isUpdated: false,
};

export const profileReducer = ( state = initialState, action ) => {
	switch (action.type) {
		case PROFILE_GETINFO_REQUEST: {
			return {
				...state,
				isLoading: true,
				isLoaded: initialState.isLoaded,
			}
		}
		case PROFILE_GETINFO_SUCCESS: {
			return {
				...state,
				isLoading: initialState.isLoading,
				isLoaded: true,
				user: action.payload,
			}
		}
		case PROFILE_GETINFO_ERROR: {
			return state;
		}
		case PROFILE_SETINFO_REQUEST: {
			return {
				...state,
				isUpdating: true,
			}
		}
		case PROFILE_SETINFO_SUCCESS: {
			return {
				...state,
				isUpdating: initialState.isUpdating,
				user: action.payload,
				isUpdated: true,
			}
		}
		case PROFILE_SETINFO_ERROR: {
			return state;
		}
		case PROFILE_WAS_UPDATED: {
			return {
				...state,
				isUpdated: initialState.isUpdated,
			}
		}
		default: {
			return state;
		}
	}
}