import React, { useState, useCallback, useEffect } from "react";
import axios from "axios";
import { axiosURL } from "../../constants";

const CategoriesAPI = () => {
	const [categories, setCategories] = useState([]);
	const getProducts = useCallback(async () => {
		await axios.get(`${axiosURL}/category`).then((response) => {
			setCategories([{ name: "All", _id: 0 }, ...response?.data.categories]);
		});
	}, []);

	useEffect(() => {
		getProducts();
	}, []);
	return { categories: [categories, setCategories] };
};

export default CategoriesAPI;
