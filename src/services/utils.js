export const stripQueryParams = url => {
	if (!url || url.length < 3) {
		return {};
	}

	url = url.replace('?', '');

	let params = {};

	let vars = url.split('&');
	vars.forEach(element => {
		let pair = element.split('=');
		params[pair[0]] = decodeURIComponent(pair[1]);
	});

	return params;
};

export const deleteFromArrayOfObjectsByID = (arr, id) => {
	if (!arr || arr.length === 0 || !id) {
		return arr;
	}
	return arr.filter(obj => obj.id !== id);
};

export const getElementFromArrayOfObjectsByID = (arr, id) => {
	if (!arr || arr.length === 0 || !id) {
		return;
	}
	return arr.find(e => Number(e.id) === Number(id));
};

export const replaceElementFromArrayOfObjects = (arr, element) => {
	if (!arr || arr.length === 0 || !element) {
		return arr;
	}

	const index = arr.findIndex(o => o.id === element.id);

	if (index !== -1) {
		arr.splice(index, 1, element);
	}

	return arr;
};

// Replace the item by index.

// generates id with new number by increasing
// the heighest existing id number by 1
export const generateID = arr => {
	const highestID = Math.max.apply(Math, arr.map(o => o.id)) | 0;
	return highestID + 1;
};

export const isEmptyString = str => {
	return str === undefined || str === '';
};

export const sortArrrayByObjectName = (a, b) => {
	// Use toUpperCase() to ignore character casing
	const aName = a.name.toUpperCase();
	const bName = b.name.toUpperCase();

	if (aName < bName) {
		return -1;
	}
	if (aName > bName) {
		return 1;
	}
	return 0;
};
