const APP_STATE_KEY = 'app_state';

export const saveState = state => {
	try {
		const serializedState = JSON.stringify(state);
		localStorage.setItem(APP_STATE_KEY, serializedState);
	} catch (err) {
		// don't do anything for now with saving state err
	}
};

export const loadState = () => {
	try {
		const serializedState = localStorage.getItem(APP_STATE_KEY);
		if (serializedState === null) {
			return undefined;
		}
		return JSON.parse(serializedState);
	} catch (err) {
		return undefined;
	}
};
