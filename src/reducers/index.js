import { combineReducers } from 'redux';
import authReducer from './auth.js';
import familiesReducer from './family';
import childrensReducer from './children';

export default combineReducers({ 
    auth: authReducer,
    families: familiesReducer,
    childrens: childrensReducer

});
