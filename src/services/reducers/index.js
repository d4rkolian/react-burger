import { combineReducers } from 'redux';
import { burgerReducer } from './burger';
import { userReducer } from './user';
import { userDetailsReducer } from './user-details';

export const rootReducer = combineReducers({
    burger: burgerReducer,
    user: userReducer,
    userDetails: userDetailsReducer,
}) 