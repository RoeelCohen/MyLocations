export const vibrate = () => {
	return navigator.vibrate && navigator.vibrate(1000);
};
