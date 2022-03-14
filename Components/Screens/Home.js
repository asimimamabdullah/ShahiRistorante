import React, { useEffect, useState, useMemo } from "react";

import { ActivityIndicator, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
// import * as SecureStore from "expo-secure-store";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { useStateValue } from "../../hooks/StateProvider";
import { axiosURL } from "../../constants";
import Products from "./HomeComponents/Products/Products";

const Home = ({ navigation }) => {
	const state = useStateValue();
	const [token, setToken] = state.token;
	const [isLoggedIn, setIsLoggedIn] = state.userAPI.isLoggedIn;
	const [user, setUser] = state.userAPI.user;
	const [checkUserCallback, setCheckUserCallback] =
		state.userAPI.checkUserCallback;
	const [postalCode, setPostalCode] = state.userAPI.postalCode;
	const [postalData, setPostalData] = state.userAPI.postalData;
	const [products] = state.productsAPI.products;
	const [categories] = state.categoriesAPI.categories;

	const getRefresToken = async () => {
		try {
			const res = await axios.get(`${axiosURL}/user/rtfat`);
			setToken(res.data.accessToken);
		} catch (error) {
			setIsLoggedIn(false);
			setUser(null);
			await AsyncStorage.removeItem("isLoggedIn");
			navigation.navigate("Home");
		}
	};
	useMemo(async () => {
		const res = await AsyncStorage.getItem("isLoggedIn");
		if (res === "true") {
			getRefresToken();
		}
	}, [checkUserCallback]);

	useMemo(async () => {
		if (postalCode) {
			try {
				await axios
					.get(`${axiosURL}/dashboard/onepostalcode/${postalCode}`)
					.then((response) => {
						setPostalData(response.data.code);
					});
			} catch (error) {
				setPostalData(null);
				setPostalCode(null);
			}
		}
	}, [postalCode]);

	if (products.length < 1 || categories.length < 1)
		return (
			<View
				style={{
					flex: 1,
					justifyContent: "center",
					alignItems: "center",
				}}>
				<ActivityIndicator size={50} color="#fa3487" />
			</View>
		);

	return (
		<SafeAreaView style={{ flex: 1 }}>
			{/* Products Component With all other home components  */}
			<Products navigation={navigation} />
		</SafeAreaView>
	);
};

export default React.memo(Home);

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	image: {
		flex: 1,
		justifyContent: "center",
	},
	text: {
		color: "white",
		fontSize: 42,
		lineHeight: 84,
		fontWeight: "bold",
		textAlign: "center",
		backgroundColor: "#000000c0",
	},
});
