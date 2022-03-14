import React, { useContext, createContext, useState } from "react";
import CategoriesAPI from "../Components/api/CategoriesAPI";
import ProductsAPI from "../Components/api/ProductsAPI";
import UserAPI from "../Components/api/UserAPI";

const StateContext = createContext({});

export const StateProvider = ({ children }) => {
	const [favoriteProducts, setFavoriteProducts] = useState([]);
	const [selectedCategory, setSelectedCategory] = useState(null);
	const [basket, setBasket] = useState([]);
	const [token, setToken] = useState("");
	const [updateOrders, setUpdateOrders] = useState(false);

	const state = {
		productsAPI: ProductsAPI(),
		categoriesAPI: CategoriesAPI(),
		favoriteProducts: [favoriteProducts, setFavoriteProducts],
		menu: [],
		basket: [basket, setBasket],
		userAPI: UserAPI(token),
		selectedCategory: [selectedCategory, setSelectedCategory],
		token: [token, setToken],
		updateOrders: [updateOrders, setUpdateOrders],
	};

	return (
		<StateContext.Provider value={state}>{children}</StateContext.Provider>
	);
};

export const useStateValue = () => useContext(StateContext);
