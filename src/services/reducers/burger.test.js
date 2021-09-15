import { burgerReducer } from './burger';
import * as actions from '../actions/';

describe('burger-reducer', () => {
	it ('should return initial state', () => {
		expect(burgerReducer(undefined,{})).toEqual(
				{
					ingredients: {
						all: [],
						constructor: [],
						bunChosen: false,
						bunIndex: -1,
						error: false,
					},
					currentIngredient: [],
					currentOrder: [],
					order: {
						number: 0,
						notice: false,
						error: false,
					},
					loaders: {
						ingredients: true,
						order: false,
						orderDetails: false,
					}
				}
			);
	});

	it ('should handle the LOAD_INGREDIENTS_REQUEST action',() => {
		expect(burgerReducer(undefined, { type: actions.LOAD_INGREDIENTS_REQUEST })).toEqual(
				{
					ingredients: {
						all: [],
						constructor: [],
						bunChosen: false,
						bunIndex: -1,
						error: false,
					},
					currentIngredient: [],
					currentOrder: [],
					order: {
						number: 0,
						notice: false,
						error: false,
					},
					loaders: {
						ingredients: true,
						order: false,
						orderDetails: false,
					}
				}
			);
	});
	it ('should handle the LOAD_INGREDIENTS_SUCCESS action',() => {});
	it ('should handle the LOAD_INGREDIENTS_ERROR action',() => {
		expect(burgerReducer(undefined, { type: actions.LOAD_INGREDIENTS_ERROR })).toEqual(
				{
					ingredients: {
						all: [],
						constructor: [],
						bunChosen: false,
						bunIndex: -1,
						error: true,
					},
					currentIngredient: [],
					currentOrder: [],
					order: {
						number: 0,
						notice: false,
						error: false,
					},
					loaders: {
						ingredients: false,
						order: false,
						orderDetails: false,
					}
				}
			);
	});

	it ('should handle the MOVE_TO_CONSTRUCTOR action',() => {});

	it ('should handle the DELETE_FROM_CONSTRUCTOR action',() => {});
	it ('should handle the MOVE_CONSTRUCTOR action',() => {});

	it ('should handle the SET_AS_DETAILED action',() => {});
	it ('should handle the CLEAN_DETAILED action',() => {});

	it ('should handle the GET_ORDER_NUMBER_REQUEST action',() => {});
	it ('should handle the GET_ORDER_NUMBER_SUCCESS action',() => {});
	it ('should handle the GET_ORDER_NUMBER_ERROR action',() => {});

	it ('should handle the GET_ORDER_BY_NUMBER_REQUEST action',() => {});
	it ('should handle the GET_ORDER_BY_NUMBER_SUCCESS action',() => {});
	it ('should handle the GET_ORDER_BY_NUMBER_ERROR action',() => {});

	it ('should handle the TURN_ON_NOTICE action',() => {});

});