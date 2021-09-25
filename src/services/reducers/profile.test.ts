import { profileReducer } from './profile';
import * as actions from '../actions/profile';
import type { TProfileState } from './profile'; 

const originState:TProfileState = {
	isLoading: false,
	isLoaded: false,
	user: {},
	isUpdating: false,
	isUpdated: false,
}

describe('profile-reducer', () => {
	
	it ('should return initial state', () => {
		expect(profileReducer(originState,{})).toEqual(originState);
	});

	it ('should handle the PROFILE_GETINFO_REQUEST action',() => {

		const init = originState;
		const expected = {
			...init,
			isLoading: true,
		}
		const received = profileReducer(init, {
			type: actions.PROFILE_GETINFO_REQUEST
		});

		expect(received).toEqual(expected);

	});
	it ('should handle the PROFILE_GETINFO_SUCCESS action',() => {

		const init = originState;
		const user = {
			name: 'mock юзер',
			email: 'mock email'
		};

		const expected = {
			...init,
			user: user,
			isLoaded: true,
		}

		const received = profileReducer(init,{
			type: actions.PROFILE_GETINFO_SUCCESS,
			payload: user,
		});

		expect(received).toEqual(expected);

	});
	it ('should handle the PROFILE_GETINFO_ERROR action',() => {

		const init = originState;
		const expected = init;
		const received = profileReducer(init, { type: actions.PROFILE_GETINFO_ERROR });
		expect(received).toEqual(expected);

	});

	it ('should handle the PROFILE_SETINFO_REQUEST action',() => {

		const init = originState;
		const expected = {
			...init,
			isUpdating: true,
		}
		const received = profileReducer(init, {
			type: actions.PROFILE_SETINFO_REQUEST
		});

		expect(received).toEqual(expected);

	});
	it ('should handle the PROFILE_SETINFO_SUCCESS action',() => {

		const init = originState;
		const user = {
			name: 'mock юзер',
			email: 'mock email'
		};

		const expected = {
			...init,
			user: user,
			isUpdated: true,
		}

		const received = profileReducer(init,{
			type: actions.PROFILE_SETINFO_SUCCESS,
			payload: user,
		});

		expect(received).toEqual(expected);

	});
	it ('should handle the PROFILE_SETINFO_ERROR action',() => {

		const init = originState;
		const expected = init;
		const received = profileReducer(init, { type: actions.PROFILE_SETINFO_ERROR });
		expect(received).toEqual(expected);

	});

	it ('should handle the PROFILE_WAS_UPDATED action',() => {

		const init = originState;
		const expected = init;
		const received = profileReducer(init, { type: actions.PROFILE_WAS_UPDATED });
		expect(received).toEqual(expected);

	});

});