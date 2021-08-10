import { MOVE_TO_CONSTRUCTOR, LOAD_INGREDIENTS } from '../actions';

const initialState = {
	ingredients: {
		all: [],
		constructor: [],
		bunChosen: false,
		bunIndex: -1,
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
		case MOVE_TO_CONSTRUCTOR: {
			// console.log(action); // TODO убрать

			// проверяем, если уже есть булочка
			var newConstructor = [];
			if ( state.ingredients.bunChosen && action.productType === 'bun' ) {				
				newConstructor = [...state.ingredients.constructor];
				newConstructor[state.ingredients.bunIndex] = state.ingredients.all[action.arraykey];
			} else {
				newConstructor = [
						...state.ingredients.constructor,
						state.ingredients.all[action.arraykey],
					]
			}

			return {
				...state,
				ingredients: {
					...state.ingredients,
					constructor: newConstructor,
					bunChosen: action.productType === 'bun' ? true : state.ingredients.bunChosen,
					bunIndex: action.productType === 'bun' && !state.ingredients.bunChosen
						? state.ingredients.constructor.length
						: action.productType !== 'bun' && state.ingredients.bunChosen
						? state.ingredients.bunIndex : -1,
				}
			}
		}
		default: {
			return state;
		}
	}
}