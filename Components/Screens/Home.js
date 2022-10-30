import React, { useMemo } from "react";

import { ActivityIndicator, View, Alert } from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SafeAreaView } from "react-native-safe-area-context";
// import NetInfo from "@react-native-community/netinfo";

import { useStateValue } from "../../hooks/StateProvider";
import { axiosURL } from "../../constants";
import Products from "./HomeComponents/Products/Products";

const Home = ({ navigation }) => {
	const state = useStateValue();
	const [token, setToken] = state.token;
	const [user, setUser] = state.userAPI.user;
	const [postalCode, setPostalCode] = state.userAPI.postalCode;
	const [isLoggedIn, setIsLoggedIn] = state.userAPI.isLoggedIn;
	const [postalData, setPostalData] = state.userAPI.postalData;
	const [products] = state.productsAPI.products;
	const [categories] = state.categoriesAPI.categories;

	const getRefresToken = async () => {
		const refreshToken = await AsyncStorage.getItem("refreshToken");
		if (refreshToken) {
			try {
				const auth = {
					headers: { Authorization: `Bearer ${refreshToken}` },
				};
				const res = await axios.get(`${axiosURL}/user/rtfat`, auth);
				setToken(res.data.accessToken);
			} catch (error) {
				Alert.alert(error.response.data.error);
				await AsyncStorage.removeItem("refreshToken");
				// setIsLoggedIn(false);
				// setUser(null);
				// await AsyncStorage.removeItem("isLoggedIn");
				// navigation.navigate("Home");
			}
		} else {
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
	}, []);

	useMemo(async () => {
		if (postalCode) {
			try {
				await axios.get(`${axiosURL}/dashboard/onepostalcode/${postalCode}`).then((response) => {
					setPostalData(response.data.code);
				});
			} catch (error) {
				setPostalData(null);
				setPostalCode(null);
			}
		}
	}, [postalCode]);

	// useMemo(() => {
	// 	NetInfo.fetch().then((state) => {
	// 		if (!state.isConnected) {
	// 			Alert.alert("Please connect to the internet");
	// 		}
	// 	});
	// }, []);

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
			<>
				{/* Products Component With all other home components  */}
				<Products navigation={navigation} />

				{/* <ScrollView>
					<Header navigation={navigation} />
					<View>
						<SliderPlace />
						<Categories />
						<Products navigation={navigation} />
					</View>
				</ScrollView> */}
			</>
		</SafeAreaView>
	);
};

export default React.memo(Home);
