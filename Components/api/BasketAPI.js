import React, { useState, useEffect } from "react";

const BasketAPI = () => {
	const [basket, setBasket] = useState([]);
	return { basket: [basket, setBasket] };
};

export default BasketAPI;
