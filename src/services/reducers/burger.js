import {
		MOVE_TO_CONSTRUCTOR,
		LOAD_INGREDIENTS,
		SET_AS_DETAILED,
		CLEAN_DETAILED,
		GET_ORDER_NUMBER,
		TURN_ON_NOTICE,
		DELETE_FROM_CONSTRUCTOR,
		MOVE_CONSTRUCTOR ,
	} from '../actions';

const initialState = {
	ingredients: {
		all: [],
		constructor: [],
		bunChosen: false,
		bunIndex: -1,
	},
	currentIngredient: [],
	order: {
		number: 0,
		notice: false,
	},
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
						? state.ingredients.bunIndex : state.ingredients.bunIndex,
				},
				order: {
					...state.order,
					notice: action.productType === 'bun' || state.ingredients.bunChosen ? false : true,
				}
			}
		}
		// удаляем из конструкторам
		case DELETE_FROM_CONSTRUCTOR: {
			// надо обновить bunIndex
			var newConstructor = [...state.ingredients.constructor];
			newConstructor.splice(action.id,1);
			return {
				...state,
				ingredients: {
					...state.ingredients,
					constructor: newConstructor,
					bunIndex: action.id < state.ingredients.bunIndex ? state.ingredients.bunIndex-1 : state.ingredients.bunIndex,
				}
			}
		}
		case MOVE_CONSTRUCTOR: {
			if ( action.fromIndex !== undefined ) {
				var newConstructor = [...state.ingredients.constructor];
				var backup = newConstructor[action.toIndex]; // сохранили элемент, который заменим
				newConstructor[action.toIndex] = newConstructor[action.fromIndex];
				newConstructor[action.fromIndex] = backup;
				return {
					...state,
					ingredients: {
						...state.ingredients,
						constructor: newConstructor
					}
				}
			} else {
				return state;
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
				order: {
					...state.order,
					number: action.orderNumber
				},
				loaders: {
					...state.loaders,
					order: false,
				}
			}
		}
		// включаем уведомление о том, что нельзя отправить заказ
		case TURN_ON_NOTICE: {
			return {
				...state,
				order: {
					...state.order,
					notice: true,
				}
			}
		}
		default: {
			return state;
		}
	}
}