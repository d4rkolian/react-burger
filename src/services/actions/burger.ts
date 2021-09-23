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
	GET_ORDER_BY_NUMBER_REQUEST,
	GET_ORDER_BY_NUMBER_SUCCESS,
	GET_ORDER_BY_NUMBER_ERROR,
	TURN_ON_NOTICE,
	DELETE_FROM_CONSTRUCTOR,
	MOVE_CONSTRUCTOR,
} from './index';
import type { TIngredient, TOrder } from '../../types/data';

export interface IMoveToConstructorAction {
  readonly type: typeof MOVE_TO_CONSTRUCTOR;
  readonly productType: string;
  readonly arraykey: number;
}

export interface IGetIngredientRequestAction {
	readonly type: typeof LOAD_INGREDIENTS_REQUEST;
}

export interface IGetIngredientSuccessAction {
	readonly type: typeof LOAD_INGREDIENTS_SUCCESS;
	readonly data: TIngredient[];
}

export interface IGetIngredientErrorAction {
	readonly type: typeof LOAD_INGREDIENTS_ERROR;
}

export interface ISetAsDetailedAction {
	readonly type: typeof SET_AS_DETAILED;
	readonly arraykey: number;
}

export interface ICleadDetaildAction {
	readonly type: typeof CLEAN_DETAILED;
}

export interface IGetOrderNumberRequestAction {
	readonly type: typeof GET_ORDER_NUMBER_REQUEST;
}

export interface IGetOrderNumberSuccessAction {
	readonly type: typeof GET_ORDER_NUMBER_SUCCESS;
	readonly orderNumber: number;
}

export interface IGetOrderNumberErrorAction {
	readonly type: typeof GET_ORDER_NUMBER_ERROR;
}

export interface IGetOrderByNumberRequestAction {
	readonly type: typeof GET_ORDER_BY_NUMBER_REQUEST;
}	

export interface IGetOrderByNumberSuccessAction {
	readonly type: typeof GET_ORDER_BY_NUMBER_SUCCESS;
	readonly order: TOrder;
}

export interface IGetOrderByNumberErrorAction {
	readonly type: typeof GET_ORDER_BY_NUMBER_ERROR;
}

export interface ITurnNotice {
	readonly type: typeof TURN_ON_NOTICE;
}

export interface IDeleteFromConstructor {
	readonly type: typeof DELETE_FROM_CONSTRUCTOR;
	readonly id: number;
}

export interface IMoveConstuctor {
	readonly type: typeof MOVE_CONSTRUCTOR;
	readonly toIndex: number;
	readonly fromIndex: number;
}

export type TBurgerActions =
	| IMoveToConstructorAction
	| IGetIngredientSuccessAction
	| IGetIngredientErrorAction 
	| IGetIngredientRequestAction
	| ISetAsDetailedAction
	| ICleadDetaildAction
	| IGetOrderNumberRequestAction
	| IGetOrderNumberSuccessAction
	| IGetOrderNumberErrorAction
	| IGetOrderByNumberRequestAction
	| IGetOrderByNumberSuccessAction
	| IGetOrderByNumberErrorAction
	| ITurnNotice
	| IDeleteFromConstructor
	| IMoveConstuctor;


