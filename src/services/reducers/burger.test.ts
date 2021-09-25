import { burgerReducer } from './burger';
import * as actions from '../actions/';
import type { TBurgerState } from './burger'; 

const originState:TBurgerState = {
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

describe('burger-reducer', () => {
	it ('should return initial state', () => {
		expect(burgerReducer(undefined,{})).toEqual(originState);
	});

	it ('should handle the LOAD_INGREDIENTS_REQUEST action',() => {
		expect(burgerReducer(undefined, { type: actions.LOAD_INGREDIENTS_REQUEST })).toEqual(originState);
	});
	it ('should handle the LOAD_INGREDIENTS_SUCCESS action',() => {
		expect(burgerReducer(undefined, { type: actions.LOAD_INGREDIENTS_SUCCESS, data: [0,1] })).toEqual(
			{
				...originState,
				ingredients: {
					...originState.ingredients,
					all: [0,1],
					error: false,
				},
				loaders: {
					...originState.loaders,
					ingredients: false,
				}
			}
		);
	});
	it ('should handle the LOAD_INGREDIENTS_ERROR action',() => {
		expect(burgerReducer(undefined, { type: actions.LOAD_INGREDIENTS_ERROR })).toEqual(
			{
			...originState,
			ingredients: {
				...originState.ingredients,
				all: originState.ingredients.all,
				error: true,
				},
			loaders: {
					...originState.loaders,
					ingredients: false,
				},
			}
			);
	});

	it ('should handle the MOVE_TO_CONSTRUCTOR action // when type of product is not bun and bun is not chosen',() => {
		const init = {
			...originState,
			ingredients: {
				...originState.ingredients,
				all: ['ingredient1', 'ingredient2', 'ingredient3']
			}
		}
		const ingredientIndex = 1;

		const newConstructor = [
			...init.ingredients.constructor,
			init.ingredients.all[ingredientIndex],
		]

		const expected = {
			...init,
				ingredients: {
					...init.ingredients,
					constructor: newConstructor,
				},
				order: {
					...init.order,
					notice: true,
				}
		}

		const received = burgerReducer(init, {
			arraykey: ingredientIndex,
			productType: 'sauce"',
			type: actions.MOVE_TO_CONSTRUCTOR
		});

		expect(received).toEqual(expected);

	});

	it ('should handle the DELETE_FROM_CONSTRUCTOR action // when we delete not bun',() => {
		const init = {
			...originState,
			ingredients: {
				...originState.ingredients,
				all: ['ingredient1', 'ingredient2', 'ingredient3'],
				constructor: ['ingredient2'],
			}
		}

		const ingredientIndex = 0;

		let newConstructor = [...init.ingredients.constructor];
		newConstructor.splice(ingredientIndex,1);

		const expected = {
			...init,
			ingredients: {
				...init.ingredients,
				constructor: [],
			}
		}

		const received = burgerReducer(init,{
			type: actions.DELETE_FROM_CONSTRUCTOR,
			id: ingredientIndex
		});

		expect(received).toEqual(expected);

	});
	it ('should handle the MOVE_CONSTRUCTOR action',() => {

		const init = {
			...originState,
			ingredients: {
				...originState.ingredients,
				all: ['ingredient1', 'ingredient2', 'ingredient3'],
				constructor: ['ingredient2','ingredient3'],
			}
		}

		const expected = {
			...init,
			ingredients: {
				...init.ingredients,
				constructor: ['ingredient3','ingredient2'],
			}
		}

		const received = burgerReducer(init, {
			type: actions.MOVE_CONSTRUCTOR,
			toIndex: 0,
			fromIndex: 1,
		});

		expect(received).toEqual(expected);

	});

	it ('should handle the SET_AS_DETAILED action',() => {

		const init = {
			...originState,
			ingredients: {
				...originState.ingredients,
				all: ['ingredient1','ingredient3']
			}
		}
		const ingredientIndex = 1;

		const expected = {
			...init,
			currentIngredient: init.ingredients.all[ingredientIndex],
		}

		const received = burgerReducer(init, {
			type: actions.SET_AS_DETAILED,
			arraykey: ingredientIndex
		});

		expect(received).toEqual(expected);

	});
	it ('should handle the CLEAN_DETAILED action',() => {

		const init = {
			...originState,
			currentIngredient: ['test']
		}

		const expected = {
			...init,
			currentIngredient: originState.currentIngredient,
		}

		const received = burgerReducer(init, {
			type: actions.CLEAN_DETAILED,
		});

		expect(received).toEqual(expected); 
	});

	it ('should handle the GET_ORDER_NUMBER_REQUEST action',() => {

		const init = originState;
		const expected = {
			...init,
			loaders: {
				...init.loaders,
				order: true
			}
		}
		const received = burgerReducer(init, { type: actions.GET_ORDER_NUMBER_REQUEST });
		expect(received).toEqual(expected);

	});
	it ('should handle the GET_ORDER_NUMBER_SUCCESS action',() => {

		const init = originState;
		const orderNumber = 200;

		const expected = {
			...init,
				ingredients: {
					...init.ingredients,
					constructor: init.ingredients.constructor,
					bunChosen: init.ingredients.bunChosen,
					bunIndex: init.ingredients.bunIndex,
					error: init.ingredients.error,
				},
				order: {
					...init.order,
					number: orderNumber,
					error: init.order.error,
				},
				loaders: {
					...init.loaders,
					order: false,
				}
		}

		const received = burgerReducer(init, {
			type: actions.GET_ORDER_NUMBER_SUCCESS,
			orderNumber: orderNumber,
		});

		expect(received).toEqual(expected);

	});
	it ('should handle the GET_ORDER_NUMBER_ERROR action',() => {

		const init = originState;
		const expected = {
			...init,
			order: {
					number: init.order.number,
					notice: init.order.notice,
					error: true,
				}
		}
		const received = burgerReducer( init, { type: actions.GET_ORDER_NUMBER_ERROR });
		expect(received).toEqual(expected);

	});

	it ('should handle the GET_ORDER_BY_NUMBER_REQUEST action',() => {

		const init = originState;
		const expected = {
			...init,
			loaders: {
				...init.loaders,
				orderDetails: true
			}
		}
		const received = burgerReducer(init, { type: actions.GET_ORDER_BY_NUMBER_REQUEST });
		expect(received).toEqual(expected); 

	});
	it ('should handle the GET_ORDER_BY_NUMBER_SUCCESS action',() => {

		const init = originState;
		const orderDetails = 'order details';

		const expected = {
			...init,
			currentOrder: orderDetails
		}
		
		const received = burgerReducer(init, {
			type: actions.GET_ORDER_BY_NUMBER_SUCCESS,
			order: orderDetails,
		});

		expect(received).toEqual(expected);

	});
	it ('should handle the GET_ORDER_BY_NUMBER_ERROR action',() => {

		const init = originState;
		const expected = init;
		const received = burgerReducer(init, { type: actions.GET_ORDER_BY_NUMBER_ERROR });
		expect(received).toEqual(expected);

	});

	it ('should handle the TURN_ON_NOTICE action',() => {

		const init = originState;
		const expected = {
			...init,
			order: {
				...init.order,
				notice: true,
			}
		}
		const received = burgerReducer(init, { type: actions.TURN_ON_NOTICE });
		expect(received).toEqual(expected);

	});

});