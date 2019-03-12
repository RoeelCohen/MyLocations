import { ADD_LOCATION, DELETE_LOCATION, EDIT_LOCATION } from './types';

export const addLocation = location => ({
	type: ADD_LOCATION,
	location
});

export const editLocation = location => ({
	type: EDIT_LOCATION,
	location
});

export const deleteLocation = locationID => ({
	type: DELETE_LOCATION,
	locationID
});
