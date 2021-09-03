import { combineReducers } from 'redux';
import { burgerReducer } from './burger';
import { userReducer } from './user';
import { userDetailsReducer } from './user-details';
import { profileReducer } from './profile';

export const rootReducer = combineReducers({
    burger: burgerReducer,
    user: userReducer,
    userDetails: userDetailsReducer,
    profile: profileReducer,
}) 