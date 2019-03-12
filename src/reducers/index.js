import { combineReducers } from 'redux';

import categoriesReducer from './categoriesReducer';
import locationsReducer from './locationsReducer';

export default combineReducers({
	locations: locationsReducer,
	categories: categoriesReducer
});
