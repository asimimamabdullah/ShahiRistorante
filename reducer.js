export const getBasketTotal = (basket) => {
	return basket?.reduce(
		(amount, item) => item.price * item.quantity + amount,
		0,
	);
};
