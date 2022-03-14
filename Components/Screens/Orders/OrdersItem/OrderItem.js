import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import React from "react";

const OrderItem = ({ gotItem, navigation }) => {
	const { item } = gotItem;
	// console.log("item: ", item.orderNumber);

	if (!item) return;

	return (
		<TouchableOpacity
			style={{ ...styles.ordersItem }}
			onPress={() =>
				navigation.navigate("OrderSummary", {
					orderNumber: item.orderNumber,
				})
			}>
			<View style={{ ...styles.ordersItemUpperDiv }}>
				<Image
					source={{ uri: item.basket[0]?.images?.url }}
					style={{ ...styles.ordersItemImage }}
				/>

				<View style={{ ...styles.ordersItemUpperDivText }}>
					<Text style={{ ...styles.fonts, fontSize: 14 }}>
						{item.basket[0]?.title}
					</Text>
					<Text style={{ ...styles.fontsBold, fontSize: 15 }}>x8</Text>
				</View>
			</View>

			{/* Item Total */}
			<View
				style={{
					flexDirection: "row",
					marginTop: 10,
					justifyContent: "flex-end",
				}}>
				<Text style={{ ...styles.fonts, fontSize: 17, marginLeft: 20 }}>
					Total:
				</Text>
				<Text style={{ marginLeft: 30, ...styles.fontsBold, fontSize: 17 }}>
					€{" "}
					{item.deliveryOption === "takeaway"
						? item.total
						: item.total + item.deliveryCharges}
				</Text>
			</View>
			{/* Order's Item bottom div  */}
			<View style={{ ...styles.ordersItemBottomDiv }}>
				<Text style={{ color: "#aaaaaa" }}>
					{new Date(item.time).toDateString()}
				</Text>

				<TouchableOpacity
					style={{ ...styles.ordersItemBottomDivButton }}
					onPress={() =>
						navigation.navigate("OrderSummary", {
							orderNumber: item.orderNumber,
						})
					}>
					<Text style={{ color: "white" }}>Go to Order Page</Text>
				</TouchableOpacity>
			</View>
		</TouchableOpacity>
	);
};

export default OrderItem;

const styles = StyleSheet.create({
	ordersItem: {
		marginHorizontal: 10,
		marginVertical: 10,
		backgroundColor: "#ffffff",
		padding: 10,
		elevation: 3,
		borderRadius: 10,
	},

	ordersItemUpperDiv: {
		flexDirection: "row",
		// justifyContent: "space-between",
	},

	ordersItemImage: {
		height: 80,
		width: 80,
		borderRadius: 8,
	},

	ordersItemUpperDivText: {
		marginLeft: 30,
	},

	ordersItemBottomDiv: {
		marginTop: 20,
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
	},

	ordersItemBottomDivButton: {
		backgroundColor: "#ff4593",
		paddingHorizontal: 20,
		paddingVertical: 10,
		borderRadius: 10,
	},

	fontsBold: {
		fontFamily: "Poppins-Bold",
	},

	fonts: {
		fontFamily: "Poppins-Regular",
	},
});
