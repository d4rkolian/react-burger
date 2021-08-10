import {
		MOVE_TO_CONSTRUCTOR,
		LOAD_INGREDIENTS,
		SET_AS_DETAILED,
		CLEAN_DETAILED,
		GET_ORDER_NUMBER,
	} from '../actions';

const initialState = {
	ingredients: {
		all: [],
		constructor: [],
		bunChosen: false,
		bunIndex: -1,
	},
	currentIngredient: [],
	orderNumber: 0,
	loaders: {
		ingredients: true,
		order: true,
	}
};

export const burgerReducer = (state = initialState, action) => {
	switch (action.type){
		// подставляем полученные с сервера данные
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
		// добавляем ингредиент в конструктор
		case MOVE_TO_CONSTRUCTOR: {
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
		// ставим продуктом для просмотра в модальном окне
		case SET_AS_DETAILED: {
			return {
				...state,
				currentIngredient: state.ingredients.all[action.arraykey],
			}
		}
		// очищаем массив с объектом для просмотра согласно заданию
		case CLEAN_DETAILED: {
			return {
				...state,
				currentIngredient: initialState.currentIngredient,
			}
		}
		// получаем номер заказа
		case GET_ORDER_NUMBER: {
			return {
				...state,
				orderNumber: action.orderNumber,
				loaders: {
					...state.loaders,
					order: false,
				}
			}
		}
		default: {
			return state;
		}
	}
}