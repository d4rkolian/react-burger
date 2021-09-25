import {
	USER_REGISTRATION_START,
	USER_REGISTRATION_SUCCESS,
	USER_REGISTRATION_ERROR,
	USER_AUTH_START,
	USER_AUTH_SUCCESS,
	USER_AUTH_ERROR,
	USER_LOGOUT_START,
	USER_LOGOUT_SUCCESS,
	USER_LOGOUT_ERROR,
	AUTH_BY_TOKEN,
	AUTH_FAILED,
} from '../actions/user';

import type { TUserActions } from '../actions/user';

export type TUserState = {
	isCreating: boolean;
	isAuthorizing: boolean;
	isAuthorized: boolean;
	details: {
		name?: string;
		email?: string;
	};
	isLoggingOut: boolean;
	authFailed: boolean;
};

const initialState: TUserState = {
	isCreating: false,
	isAuthorizing: false,
	isAuthorized: false,
	details: {},
	isLoggingOut: false,
	authFailed: false,
}

export const userReducer = (state = initialState, action: TUserActions): TUserState => {

	switch (action.type) {
		case USER_REGISTRATION_START: {
			return {
				...state,
				isCreating: true,
			}
		}
		case USER_REGISTRATION_SUCCESS: {
			return {
				...state,
				isCreating: false,
				isAuthorized: true,
			}
		}
		case USER_REGISTRATION_ERROR: {
			return {
				...state,
				isCreating: false,
			}
		}
		case USER_AUTH_START: {
			return {
				...state,
				isAuthorizing: true,
				authFailed: initialState.authFailed,
			}
		}
		case USER_AUTH_SUCCESS: {
			return {
				...state,
				isAuthorizing: initialState.isAuthorizing,
				isAuthorized: true,
				details: {
					email: action.user.email,
					name: action.user.name,
				}
			}
		}
		case USER_AUTH_ERROR: {
			return {
				...state,
				isAuthorizing: initialState.isAuthorizing,
			}
		}
		case USER_LOGOUT_START: {
			return {
				...state,
				isLoggingOut: true,
			}
		}
		case USER_LOGOUT_SUCCESS: {
			return {
				...state,
				isLoggingOut: initialState.isLoggingOut,
				isAuthorized: false,
				details: {}
			}
		}
		case USER_LOGOUT_ERROR: {
			return {
				...state,
				isLoggingOut: initialState.isLoggingOut,
			}
		}
		// TODO: проверить тут detailed 
		case AUTH_BY_TOKEN: {
			return {
				...state,
				isAuthorized: true,
				authFailed: initialState.authFailed,
			}
		}
		case AUTH_FAILED: {
			return {
				...state,
				authFailed: true,
			}
		}
		default: {
			return state;
		}
	}
}

