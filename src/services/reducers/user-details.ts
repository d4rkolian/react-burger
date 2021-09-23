import {
	PASS_RESET_REQUEST,
	PASS_RESET_SUCCESS,
	PASS_RESET_ERROR,
	PASS_RESET_STEP2_REQUEST,
	PASS_RESET_STEP2_SUCCESS,
	PASS_RESET_STEP2_ERROR,
	PASS_RESET_STEP2_SUCCESS_AFTER,
} from '../actions/user-details';

import type { TUserDetailsActions } from '../actions/user-details';
export type TUserDetailsState = {
	isPasswordRequested: {
		step1: boolean;
		step2: boolean;
	};
	stepTwoAllowed: boolean;
	isPasswordReset: boolean;
	passwordResetErr: boolean;
}

const initialState: TUserDetailsState = {
	isPasswordRequested: {
		step1: false,
		step2: false,
	},
	stepTwoAllowed: false,
	isPasswordReset: false,
	passwordResetErr: false,
}

export const userDetailsReducer = (state = initialState, action:TUserDetailsActions) => {
	switch (action.type){
		case PASS_RESET_REQUEST: {
			return {
				...state,
				isPasswordRequested: {
					...state.isPasswordRequested,
					step1: true,
					step2: false,
				},
				stepTwoAllowed: initialState.stepTwoAllowed,
			}
		}
		case PASS_RESET_SUCCESS: {
			// тут еще ставим флаг, что человек прошел первый шаг
			return {
				...state,
				isPasswordRequested: {
					...state.isPasswordRequested,
					step1: false,
				},
				stepTwoAllowed: true,
			}
		}
		case PASS_RESET_ERROR: {
			return {
				...state,
				isPasswordRequested: {
					...state.isPasswordRequested,
					step1: false,
				},
				stepTwoAllowed: initialState.stepTwoAllowed,
			}
		}
		case PASS_RESET_STEP2_REQUEST: {
			return {
				...state,
				isPasswordRequested: {
					...state.isPasswordRequested,
					step2: true,
				},
				passwordResetErr: initialState.passwordResetErr,
			}
		}
		case PASS_RESET_STEP2_SUCCESS: {
			return {
				...state,
				isPasswordRequested: initialState.isPasswordRequested,
				stepTwoAllowed: initialState.stepTwoAllowed,
				isPasswordReset: true,
			}
		}
		case PASS_RESET_STEP2_ERROR: {
			return {
				...state,
				isPasswordRequested: initialState.isPasswordRequested,
				isPasswordReset: initialState.isPasswordReset,
				passwordResetErr: true,
			}
		}
		case PASS_RESET_STEP2_SUCCESS_AFTER: {
			return {
				...state,
				isPasswordReset: initialState.isPasswordReset,
			}
		}
		default: {
			return state;
		}
	}
}