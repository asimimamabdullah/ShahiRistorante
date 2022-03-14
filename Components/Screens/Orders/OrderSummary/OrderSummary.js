import {
	StyleSheet,
	Text,
	View,
	Image,
	TouchableOpacity,
	ActivityIndicator,
	Alert,
	ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";

import axios from "axios";
import { axiosURL } from "../../../../constants";
import { icons } from "../../../../constants";

const OrderSummary = ({ navigation, route }) => {
	const { orderNumber } = route.params;
	const [orderData, setOrderData] = useState({});
	const [loading, setLoading] = useState(false);

	const findOrder = async () => {
		try {
			await axios
				.get(`${axiosURL}/findorder/${orderNumber}`)
				.then((response) => {
					setOrderData(response.data.order);
					setLoading(false);
				});
		} catch (error) {
			Alert.alert(error.response.data.error);
			setLoading(false);
		}
	};

	useEffect(() => {
		setLoading(true);
		findOrder();
	}, []);

	if (loading) return <ActivityIndicator size={40} color="#ff4593" />;

	return (
		<ScrollView style={{ flex: 1 }}>
			<View style={{ ...styles.orderSummaryContainer }}>
				<View
					style={{
						flexDirection: "row",
						marginHorizontal: 10,
						justifyContent: "space-between",
					}}>
					<Text style={{ ...styles.fonts }}>Order Status:</Text>
					<Text
						style={{
							...styles.fonts,
							backgroundColor:
								orderData.orderStatus === "pending"
									? "yellow"
									: "green",
							paddingHorizontal: 5,
							textAlign: "center",
							textAlignVertical: "center",
						}}>
						{orderData?.orderStatus}
					</Text>
				</View>
			</View>

			<View style={{ ...styles.orderSummaryContainer }}>
				<View
					style={{
						flexDirection: "row",
						marginHorizontal: 10,
						justifyContent: "space-between",
					}}>
					<Text style={{ ...styles.fonts }}>Delivery option:</Text>
					<Text
						style={{
							...styles.fonts,
							backgroundColor: "#eee",
							paddingHorizontal: 5,
							textAlign: "center",
							textAlignVertical: "center",
						}}>
						{orderData?.deliveryOption}
					</Text>
				</View>

				<View
					style={{
						flexDirection: "row",
						marginHorizontal: 10,
						marginTop: 10,
						justifyContent: "space-between",
					}}>
					<Text style={{ ...styles.fonts }}>Payment Option:</Text>
					<Text
						style={{
							...styles.fonts,
							backgroundColor: "#eee",
							paddingHorizontal: 5,
							textAlign: "center",
							textAlignVertical: "center",
						}}>
						{orderData?.paymentOption}
					</Text>
				</View>
			</View>

			{orderData?.deliveryOption === "homedelivery" && (
				<View style={{ ...styles.orderSummaryContainer }}>
					<View
						style={{
							flexDirection: "row",
							justifyContent: "space-between",
							marginBottom: 10,
						}}>
						{/* Icon and title  */}
						<View style={{ flexDirection: "row", alignItems: "center" }}>
							<Image
								source={icons?.location_1}
								resizeMode="contain"
								style={{ width: 30, height: 30 }}
							/>
							<Text style={{ marginLeft: 20, ...styles.fonts }}>
								Delivery address
							</Text>
						</View>
					</View>

					{/* Address Text  */}
					<TouchableOpacity
						style={{
							marginTop: 10,
							borderBottomWidth: 1,
							borderBottomColor: "#ddd",
						}}>
						<Text style={{ ...styles.fonts }}>
							{`${orderData?.building} ${orderData?.address}`}
						</Text>
					</TouchableOpacity>
					{/* Extra instructions to rider */}
					{/* <TouchableOpacity style={{ marginTop: 10 }}>
						<Text
							style={{
								...styles.fontsBold,
								color: user?.noteToRider ? "#888" : "pink",
								fontSize: 14,
							}}>
							{user?.noteToRider ? user?.noteToRider : "Note to rider"}
						</Text>
					</TouchableOpacity> */}
				</View>
			)}

			{orderData.deliveryOption === "homedelivery" ? (
				// With delivery fee
				<View style={{ ...styles.orderSummaryContainer }}>
					<View style={{ ...styles.orderSummaryUpperDiv }}>
						{/* Icon and title  */}
						<View style={{ ...styles.orderSummaryIconTitle }}>
							<Image
								source={icons?.summary}
								resizeMode="contain"
								style={{ ...styles.orderSummaryIcon }}
							/>
							<Text style={{ marginLeft: 20, ...styles.fonts }}>
								Order Summary
							</Text>
						</View>
					</View>

					{/* Items and prices for order summary */}
					<View style={{ ...styles.orderSummaryItemsContainer }}>
						{orderData.basket?.map((item, index) => (
							<View key={index} style={{ ...styles.orderSummaryItem }}>
								<View
									style={{
										flex: 0.9,
										flexDirection: "row",
										alignItems: "center",
									}}>
									<Text
										style={{
											...styles.fonts,
											marginLeft: 20,
										}}>
										{item?.quantity}x {item?.title}
									</Text>
								</View>

								<Text style={{ ...styles.fontsBold }}>
									€ {(item?.price * item?.quantity).toFixed(2)}
								</Text>
							</View>
						))}
					</View>

					{/* Subtotal and delivery fee div  */}

					<View
						style={{
							marginTop: 10,
							flexDirection: "row",
							justifyContent: "space-between",
						}}>
						<Text style={{ ...styles.fonts, paddingLeft: 20 }}>
							Subtotal
						</Text>
						<Text style={{ ...styles.fonts, paddingLeft: 20 }}>
							€ {orderData.total}
						</Text>
					</View>
					<View
						style={{
							marginVertical: 10,
							flexDirection: "row",
							justifyContent: "space-between",
						}}>
						<Text style={{ ...styles.fonts, paddingLeft: 20 }}>
							Delivery fee
						</Text>
						<Text style={{ ...styles.fonts, paddingLeft: 20 }}>
							€ {orderData.deliveryCharges}
						</Text>
					</View>
				</View>
			) : (
				//  Without delivery fee
				<View style={{ ...styles.orderSummaryContainer }}>
					<View style={{ ...styles.orderSummaryUpperDiv }}>
						{/* Icon and title  */}
						<View style={{ ...styles.orderSummaryIconTitle }}>
							<Image
								source={icons?.summary}
								resizeMode="contain"
								style={{ ...styles.orderSummaryIcon }}
							/>
							<Text style={{ marginLeft: 20, ...styles.fonts }}>
								Order Summary
							</Text>
						</View>
					</View>

					{/* Items and prices for order summary */}
					<View style={{ ...styles.orderSummaryItemsContainer }}>
						{orderData.basket?.map((item, index) => (
							<View key={index} style={{ ...styles.orderSummaryItem }}>
								<View
									style={{
										flex: 0.9,
										flexDirection: "row",
										alignItems: "center",
									}}>
									<Text
										style={{
											...styles.fonts,
											marginLeft: 20,
										}}>
										{item?.quantity}x {item?.title}
									</Text>
								</View>

								<Text style={{ ...styles.fontsBold }}>
									€ {(item?.price * item?.quantity).toFixed(2)}
								</Text>
							</View>
						))}
					</View>

					{/* Subtotal and delivery fee div  */}

					<View
						style={{
							marginTop: 10,
							flexDirection: "row",
							justifyContent: "space-between",
						}}>
						<Text style={{ ...styles.fonts, paddingLeft: 20 }}>
							Subtotal
						</Text>
						<Text style={{ ...styles.fonts, paddingLeft: 20 }}>
							€ {orderData?.total}
						</Text>
					</View>
				</View>
			)}
			<View
				style={{
					flexDirection: "row",
					paddingHorizontal: 30,
					justifyContent: "space-between",
				}}>
				<Text style={{ ...styles.fontsBold, fontSize: 20, lineHeight: 30 }}>
					Total
				</Text>
				<Text style={{ ...styles.fonts, fontSize: 20, lineHeight: 30 }}>
					€{" "}
					{orderData?.deliveryOption === "homedelivery"
						? orderData?.total + orderData?.deliveryCharges
						: orderData?.total}
				</Text>
			</View>
		</ScrollView>
	);
};

export default OrderSummary;

const styles = StyleSheet.create({
	orderSummaryContainer: {
		marginVertical: 20,
		paddingHorizontal: 10,
		paddingVertical: 10,
		backgroundColor: "#ffffff",
		elevation: 1,
	},

	orderSummaryUpperDiv: {
		flexDirection: "row",
		justifyContent: "space-between",
		marginBottom: 10,
	},

	orderSummaryIconTitle: {
		flexDirection: "row",
		alignItems: "center",
	},

	orderSummaryIcon: {
		width: 30,
		height: 30,
		tintColor: "#ff4593",
	},
	orderSummaryItemsContainer: {
		marginTop: 10,
		borderBottomColor: "#ddd",
		borderBottomWidth: 2,
	},
	orderSummaryItem: {
		paddingBottom: 10,
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
	},

	fontsBold: {
		fontFamily: "Poppins-Bold",
	},
	fonts: {
		fontFamily: "Poppins-Regular",
	},
});
