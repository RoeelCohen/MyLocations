import { DELETE_LOCATION, ADD_LOCATION, EDIT_LOCATION } from '../actions/types';
import {
	deleteFromArrayOfObjectsByID,
	generateID,
	replaceElementFromArrayOfObjects,
	sortArrrayByObjectName
} from '../services/utils';

let id = 0;
function createData(name, address, lat, lon, categoryID) {
	id += 1;
	return { id, name, address, lat, lon, categoryID };
}

const initalData = [
	createData('Hair Dresser', 'Th 3', 32.0740769, 34.7900141, 3),
	createData('Staircase to heaven', 'Rainbow 1', 32.0740769, 34.7900141, 1),
	createData('Steak House', 'Somwher 3', 32.0740769, 34.7900141, 2),
	createData('Tamara Acai', 'dizz 160', 32.0740769, 34.7900141, 1),
	createData('Vegan Food', 'Ove 7', 32.0740769, 34.7900141, 3)
].sort(sortArrrayByObjectName);

export default (state = initalData, action) => {
	switch (action.type) {
		case ADD_LOCATION:
			const id = generateID(state);
			return [...state, { id, ...action.location }].sort(sortArrrayByObjectName);

		case EDIT_LOCATION:
			return replaceElementFromArrayOfObjects(state, action.location).sort(sortArrrayByObjectName);

		case DELETE_LOCATION:
			return deleteFromArrayOfObjectsByID(state, action.locationID);

		default:
			return state;
	}
};
