import { ADD_CATEGORY, DELETE_CATEGORY, EDIT_CATEGORY } from './types';

export const addCategory = categoryName => ({
	type: ADD_CATEGORY,
	categoryName
});

export const editCategory = category => ({
	type: EDIT_CATEGORY,
	category
});

export const deleteCategory = categoryID => ({
	type: DELETE_CATEGORY,
	categoryID
});
