import { userReducer } from './user';
import * as actions from '../actions/user';
import type { TUserState } from './user'; 

const originState:TUserState = {
	isCreating: false,
	isAuthorizing: false,
	isAuthorized: false,
	details: {},
	isLoggingOut: false,
	authFailed: false,
}

describe('user reducer', () => {
	
	it('should handle initial state of user reducer', () => {
		expect(userReducer(undefined,{})).toEqual(originState);
	})

	it('should handle USER_REGISTRATION_START action', () => {

		const init = originState;
		const expected = {
			...init,
			isCreating: true,
		}
		const received = userReducer(init,{ type: actions.USER_REGISTRATION_START });
		expect(received).toEqual(expected);

	});
	it('should handle USER_REGISTRATION_SUCCESS action', () => {

		const init = originState;
		const expected = {
			...init,
			isAuthorized: true,
		}
		const received = userReducer(init,{ type: actions.USER_REGISTRATION_SUCCESS })
		expect(received).toEqual(expected);

	});
	it('should handle USER_REGISTRATION_ERROR action', () => {

		const init = originState;
		const expected = init;
		const received = userReducer(init,{ type: actions.USER_REGISTRATION_ERROR });
		expect(received).toEqual(expected);

	});

	it('should handle USER_AUTH_START action', () => {

		const init = originState;
		const expected = {
			...init,
			isAuthorizing: true,
		}
		const received = userReducer(init,{ type: actions.USER_AUTH_START });
		expect(received).toEqual(expected);

	});
	it('should handle USER_AUTH_SUCCESS action', () => {

		const init = originState;
		const user = {
			email: 'test mail',
			name: 'test name',
		}
		const expected = {
			...init,
			isAuthorized: true,
			details: {
				email: user.email,
				name: user.name,
			}
		}
		const received = userReducer(init, { type: actions.USER_AUTH_SUCCESS, user: user });
		expect(received).toEqual(expected);

	});
	it('should handle USER_AUTH_ERROR action', () => {

		const init = originState;
		const expected = init;
		const received = userReducer(init,{ type: actions.USER_AUTH_ERROR });
		expect(received).toEqual(expected);

	});

	it('should handle USER_LOGOUT_START action', () => {

		const init = originState;
		const expected = {
			...init,
			isLoggingOut: true,
		}
		const received = userReducer(init,{ type: actions.USER_LOGOUT_START });
		expect(received).toEqual(expected);

	});
	it('should handle USER_LOGOUT_SUCCESS action', () => {

		const init = originState;
		const expected = {
			...init,
			isAuthorized: false,
			details: {}
		}
		const received = userReducer(init, { type: actions.USER_LOGOUT_SUCCESS });
		expect(received).toEqual(expected);

	});
	it('should handle USER_LOGOUT_ERROR action', () => {

		const init = originState;
		const expected = init;
		const received = userReducer(init,{ type: actions.USER_LOGOUT_ERROR });
		expect(received).toEqual(expected);

	});

	it('should handle AUTH_BY_TOKEN action', () => {

		const init = originState;
		const expected = {
			...init,
			isAuthorized: true,
		}
		const received = userReducer(init, { type: actions.AUTH_BY_TOKEN });
		expect(received).toEqual(expected);

	});
	it('should handle AUTH_FAILED action', () => {

		const init = originState;
		const expected = {
			...init,
			authFailed: true,
		}
		const received = userReducer(init, { type: actions.AUTH_FAILED });
		expect(received).toEqual(expected);

	});

});