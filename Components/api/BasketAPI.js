import React, { useState, useEffect } from "react";

const BasketAPI = () => {
	const [basket, setBasket] = useState([]);
	useEffect(() => {
		console.log("basket: ", basket);
	}, [basket]);
	return { basket: [basket, setBasket] };
};

export default BasketAPI;
