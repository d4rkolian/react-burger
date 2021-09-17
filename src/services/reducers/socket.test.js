import { socketReducer} from './socket';
import * as actions from '../actions/socket';

const originState = {
	isConnecting: false,
	connected: false,
	orders: [],
	count: {
		total: 0,
		totalToday: 0,
	},
	error: false,
}

describe('socket-reducer', () => {

	it('should handle initial state of socket reducer', () => {
		expect(socketReducer(undefined,{})).toEqual(originState);
	})

	it ('should handle the WS_CONNECTION_START action',() => {

		const init = originState;
		const expected = {
			...originState,
			isConnecting: true,
		}
		const received = socketReducer(init, { type: actions.WS_CONNECTION_START });
		expect(received).toEqual(expected);

	});
	it ('should handle the WS_CONNECTION_SUCCESS action',() => {

		const init = originState;
		const expected = {
			...originState,
			connected: true,
		}
		const received = socketReducer(init,{ type: actions.WS_CONNECTION_SUCCESS });
		expect(received).toEqual(expected);

	});
	it ('should handle the WS_CONNECTION_ERROR action',() => {

		const init = originState;
		const expected = {
			...originState,
			error: true,
		}
		const received = socketReducer(init,{ type: actions.WS_CONNECTION_ERROR });
		expect(received).toEqual(expected);

	});
	it ('should handle the WS_CONNECTION_CLOSE action',() => {

		const init = originState;
		const expected = {
			...init,
			connected: false,
		}
		const received = socketReducer(init,{ type: actions.WS_CONNECTION_CLOSE });
		expect(received).toEqual(expected);

	});
	it ('should handle the WS_GET_MESSAGE action',() => {

		const init = {
			...originState,
			connected: true,
		}
		const mockedData = {
			orders: ['order1', 'order2'],
			total: 10,
			totalToday: 2,
		}
		const expected = {
			...originState,
			connected: true,
			orders: mockedData.orders,
			count: {
				total: mockedData.total,
				totalToday: mockedData.totalToday
			}
		}

		const received = socketReducer(init, {
			type: actions.WS_GET_MESSAGE,
			payload: mockedData,
		});

		expect(received).toEqual(expected);

	});

});