import { ADD_CATEGORY, EDIT_CATEGORY, DELETE_CATEGORY } from '../actions/types';
import {
	deleteFromArrayOfObjectsByID,
	generateID,
	replaceElementFromArrayOfObjects,
	sortArrrayByObjectName
} from '../services/utils';

let id = 0;
function createData(name) {
	id += 1;
	return { id, name };
}

const initalData = [
	createData('family'),
	createData('tasty'),
	createData('food'),
	createData('other'),
	createData('partys')
].sort(sortArrrayByObjectName);

export default (state = initalData, action) => {
	switch (action.type) {
		case ADD_CATEGORY:
			const id = generateID(state);
			return [...state, { id, name: action.categoryName }].sort(sortArrrayByObjectName);

		case EDIT_CATEGORY:
			return replaceElementFromArrayOfObjects(state, action.category).sort(sortArrrayByObjectName);

		case DELETE_CATEGORY:
			return deleteFromArrayOfObjectsByID(state, action.categoryID);

		default:
			return state;
	}
};
