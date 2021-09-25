// data.ts
import { ThunkAction } from 'redux-thunk';
import { Action, ActionCreator, Dispatch } from 'redux';

import { TRootState } from '../index';
import { TwsActions } from '../services/actions/socket';
import { TBurgerActions } from  '../services/actions/burger';
import { TProfileActions } from  '../services/actions/profile';
import { TUserDetailsActions } from  '../services/actions/user-details';
import { TUserActions } from  '../services/actions/user';

export type Actions = TwsActions | TBurgerActions | TProfileActions | TUserDetailsActions | TUserActions;
export type AppThunk<TReturn = void> = ActionCreator<ThunkAction<TReturn, Action, TRootState, Actions>>; 
export type AppDispatch = Dispatch<Actions>; 

export type TIngredient = {
	_id:string;
	name:string;
	type:string;
	proteins:number;
	fat:number;
	carbohydrates:number;
	calories:number;
	price:number;
	image:string;
	image_mobile:string;
	image_large:string;
	__v:number;
};

export type TOrder = {
	[key: string]: any;
}

export type TUser = {
	name: string;
	email: string;
}