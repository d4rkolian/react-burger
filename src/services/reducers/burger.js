import { MOVE_TO_CONSTRUCTOR, LOAD_INGREDIENTS } from '../actions';

const initialState = {
	element: 'тут хрень', // TODO удалить
	ingredients: {
		all: [],
		constructor: []
	},
	currentIngredient: null,
	order: null,
	loaders: {
		ingredients: true,
		order: false,
	}
};

export const burgerReducer = (state = initialState, action) => {
	switch (action.type){
		case LOAD_INGREDIENTS: {
			// console.log('gat ya'); TODO убрать
			return {
				...state,
				ingredients: {
					...state.ingredients,
					all: action.data,
				},
				loaders: {
					...state.loaders,
					ingredients: false,
				}
			}
		}
		default: {
			return state;
		}
	}
}