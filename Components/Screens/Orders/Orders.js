import {
	StyleSheet,
	Text,
	View,
	FlatList,
	ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import axios from "axios";

import { axiosURL, icons, images } from "../../../constants";
import { useStateValue } from "../../../hooks/StateProvider";
import OrderItem from "./OrdersItem/OrderItem";

const Orders = ({ navigation }) => {
	const state = useStateValue();
	const { userAPI } = useStateValue();
	const [updateOrders] = state.updateOrders;
	const [orders, setOrders] = userAPI.orders;
	const [isLoggedIn] = userAPI.isLoggedIn;
	const { userID } = userAPI;
	const [loading, setLoading] = useState(false);

	const getOrders = async () => {
		try {
			await axios
				.get(`${axiosURL}/user/getorders/${userID}`)
				.then((response) => {
					setOrders(response.data?.orders.reverse());
					setLoading(false);
				});
		} catch (error) {
			setLoading(false);
			Alert.alert(error.response.data.error);
		}
	};

	useEffect(() => {
		setLoading(true);
		if (userID) {
			getOrders();
		} else if (!userID) {
			setLoading(false);
		}
	}, [userID, updateOrders]);

	if (loading)
		return (
			<View
				style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
				<ActivityIndicator size={45} color="#ff4593" />
			</View>
		);

	return (
		<View style={{ marginVertical: 20 }}>
			<Text style={{ ...styles.fonts, fontSize: 20, marginHorizontal: 20 }}>
				Past Orders
			</Text>

			{orders.length > 0 ? (
				<FlatList
					data={orders}
					key={(item) => item._id}
					keyExtractor={(item) => item._id}
					renderItem={(gotItem) => OrderItem({ gotItem, navigation })}
					ListFooterComponent={<View style={{ height: 100 }} />}
				/>
			) : (
				<Text style={{ marginHorizontal: 20, fontSize: 17 }}>
					You don't have any orders yet
				</Text>
			)}

			{/* Orders Item  */}
		</View>
	);
};

export default Orders;

const styles = StyleSheet.create({
	fontsBold: {
		fontFamily: "Poppins-Bold",
	},
	fonts: {
		fontFamily: "Poppins-Regular",
	},
});
