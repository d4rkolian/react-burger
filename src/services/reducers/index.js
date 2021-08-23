import { combineReducers } from 'redux';
import { burgerReducer } from './burger';
import { userReducer } from './user';

export const rootReducer = combineReducers({
    burger: burgerReducer,
    user: userReducer,
}) 