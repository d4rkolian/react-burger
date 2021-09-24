import { userDetailsReducer } from './user-details';
import * as actions from '../actions/user-details';
import type { TUserDetailsState } from './user-details'; 

const originState:TUserDetailsState = {
	isPasswordRequested: {
		step1: false,
		step2: false,
	},
	stepTwoAllowed: false,
	isPasswordReset: false,
	passwordResetErr: false,
}

describe('user-details reducer', () => {
	
	it('should handle initial state of user details reducer', () => {
		expect(userDetailsReducer(undefined,{})).toEqual(originState);
	})

	it ('should handle the PASS_RESET_REQUEST action', () => {

		const init = originState;

		const expected = {
			...init,
			isPasswordRequested: {
				step1: true,
				step2: false,
			}
		}

		const received = userDetailsReducer(init, { type: actions.PASS_RESET_REQUEST });

		expect(received).toEqual(expected);

	})
	it ('should handle the PASS_RESET_SUCCESS action', () => {

		const init = originState;

		const expected = {
			...init,
			isPasswordRequested: {
				...init.isPasswordRequested,
				step1: false,
			},
			stepTwoAllowed: true,
		}

		const received = userDetailsReducer(init, { type: actions.PASS_RESET_SUCCESS });

		expect(received).toEqual(expected);

	})
	it ('should handle the PASS_RESET_ERROR action', () => {

		const init = originState;
		const expected = init;
		const received = userDetailsReducer(init, { type: actions.PASS_RESET_ERROR });
		expect(received).toEqual(expected);

	})

	it ('should handle the PASS_RESET_STEP2_REQUEST action', () => {

		const init = originState;

		const expected = {
			...init,
			isPasswordRequested: {
				...init.isPasswordRequested,
				step2: true,
			}
		}

		const received = userDetailsReducer(init, { type: actions.PASS_RESET_STEP2_REQUEST });
		expect(received).toEqual(expected);

	})
	it ('should handle the PASS_RESET_STEP2_SUCCESS action', () => {

		const init = originState;

		const expected = {
			...init,
			isPasswordReset: true,
		}

		const received = userDetailsReducer(init, { type: actions.PASS_RESET_STEP2_SUCCESS });

		expect(received).toEqual(expected);

	})
	it ('should handle the PASS_RESET_STEP2_ERROR action', () => {

		const init = originState;
		const expected = {
			...init,
			passwordResetErr: true,
		}
		const received = userDetailsReducer(init, { type: actions.PASS_RESET_STEP2_ERROR });

		expect(received).toEqual(expected);

	})
	it ('should handle the PASS_RESET_STEP2_SUCCESS_AFTER action', () => {

		const init = originState;
		const expected = init;
		const received = userDetailsReducer(init, { type: actions.PASS_RESET_STEP2_SUCCESS_AFTER });
		expect(received).toEqual(expected);

	})

});