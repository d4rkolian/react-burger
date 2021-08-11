import {
		MOVE_TO_CONSTRUCTOR,
		LOAD_INGREDIENTS_REQUEST,
		LOAD_INGREDIENTS_SUCCESS,
		LOAD_INGREDIENTS_ERROR,
		SET_AS_DETAILED,
		CLEAN_DETAILED,
		GET_ORDER_NUMBER_REQUEST,
		GET_ORDER_NUMBER_SUCCESS,
		GET_ORDER_NUMBER_ERROR,
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
		error: false,
	},
	currentIngredient: [],
	order: {
		number: 0,
		notice: false,
		error: false,
	},
	loaders: {
		ingredients: true,
		order: false,
	}
};

export const burgerReducer = (state = initialState, action) => {
	switch (action.type){
		// инициируем запрос к серверу: ставим лоадер, приводим массив в изначальное состояние (там могли оказаться битые данные)
		case LOAD_INGREDIENTS_REQUEST: {
			return {
				...state,
				ingredients: {
					...state.ingredients,
					all: initialState.ingredients.all,
					error: false,
				},
				loaders: {
					...state.loaders,
					ingredients: true,
				}
			}
		}
		// подставляем полученные с сервера данные
		case LOAD_INGREDIENTS_SUCCESS: {
			return {
				...state,
				ingredients: {
					...state.ingredients,
					all: action.data,
					error: false,
				},
				loaders: {
					...state.loaders,
					ingredients: false,
				}
			}
		}
		// обрабатываем ошибку
		case LOAD_INGREDIENTS_ERROR: {
			return {
				...state,
				ingredients: {
					...state.ingredients,
					all: initialState.ingredients.all,
					error: true,
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
		// начинаем отправлять запрос на получение номера заказа - сбрасываем значения
		case GET_ORDER_NUMBER_REQUEST: {
			return {
				...state,
				order: {
					number: initialState.order.number,
					notice: initialState.order.notice,
					error: initialState.order.error,
				},
				loaders: {
					...state.loaders,
					order: true,
				}
			}
		}
		// получаем номер заказа
		case GET_ORDER_NUMBER_SUCCESS: {
			return {
				...state,
				order: {
					...state.order,
					number: action.orderNumber,
					error: initialState.order.error,
				},
				loaders: {
					...state.loaders,
					order: false,
				}
			}
		}
		// ошибка при получении номера заказа
		case GET_ORDER_NUMBER_ERROR: {
			return {
				...state,
				order: {
					number: initialState.order.number,
					notice: initialState.order.notice,
					error: true,
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