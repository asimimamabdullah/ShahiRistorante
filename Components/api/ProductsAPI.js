import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
// import { icons, images } from "../../constants";
import { axiosURL } from "../../constants";

const ProductsAPI = () => {
	const [products, setProducts] = useState([]);
	const getProducts = useCallback(async () => {
		await axios.get(`${axiosURL}/products`).then((response) => {
			setProducts(response?.data.products);
		});
	}, [products]);

	useEffect(() => {
		getProducts();
	}, []);

	return { products: [products, setProducts] };
};

export default ProductsAPI;
