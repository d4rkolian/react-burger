import {
	PASS_RESET_REQUEST,
	PASS_RESET_SUCCESS,
	PASS_RESET_ERROR,
	PASS_RESET_STEP2_REQUEST,
	PASS_RESET_STEP2_SUCCESS,
	PASS_RESET_STEP2_ERROR,
} from '../actions/user-details';

const initialState = {
	isPasswordRequested: {
		step1: false,
		step2: false,
	},
	stepTwoAllowed: false,
}

export const userDetailsReducer = (state = initialState, action) => {
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
				}
			}
		}
		case PASS_RESET_STEP2_SUCCESS: {
			return state;
		}
		case PASS_RESET_STEP2_ERROR: {
			return state;
		}
		default: {
			return state;
		}
	}
}