import {
	StyleSheet,
	Text,
	View,
	TouchableOpacity,
	Image,
	Alert,
	ActivityIndicator,
	ScrollView,
} from "react-native";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { RadioButton } from "react-native-paper";
import { axiosURL, icons } from "../../../constants";
import { useStateValue } from "../../../hooks/StateProvider";
import { getBasketTotal } from "../../../reducer";

const Checkout = ({ navigation }) => {
	const state = useStateValue();
	const [updateOrders, setUpdateOrders] = state.updateOrders;
	const [token] = state.token;
	const [basket, setBasket] = state.basket;
	const [deliveryOption, setDeliveryOption] = state.userAPI.deliveryOption;
	const [user] = state.userAPI.user;
	const [postalData] = state.userAPI.postalData;

	const [disabled, setDisabled] = useState(false);

	const deliveryPriceExtract = () => {
		if (deliveryOption === "homedelivery") {
			if (postalData?.deliveryPrice) {
				return isNaN(postalData.deliveryPrice)
					? parseInt(postalData.deliveryPrice)
					: parseInt(postalData.deliveryPrice);
			} else {
				return 0;
			}
		} else if (deliveryOption === "takeaway") {
			return 0;
		}
	};

	const handleCreateOrderHomeDelivery = async () => {
		setDisabled(true);

		if (getBasketTotal(basket) > parseInt(postalData.minOrder)) {
			if (user.address && user.building && user.phone) {
				const time = Date.now() + 1983;

				try {
					await axios
						.post(
							`${axiosURL}/user/createorder`,
							{
								orders: {
									orderNumber: time,
									userID: user?._id,
									postalCode: postalData?.postalCode,
									address: user?.address,
									building: user?.building,
									basket,
									name: user?.firstName,
									email: user?.email,
									lastName: user?.lastName,
									phone: user?.phone,
									time,
									total: getBasketTotal(basket),
									deliveryCharges: postalData?.deliveryPrice,
									deliveryOption,
									paymentOption: "cashondelivery",
									paymentStatus: "pending",
									orderStatus: "pending",
								},
							},
							{
								headers: {
									Authorization: `Bearer ${token}`,
								},
							},
						)
						.then((response) => {
							setBasket([]);
						})
						.then(() => {
							setUpdateOrders(!updateOrders);
							navigation.navigate("Congratulations", {
								orderNumber: time,
							});
						});
				} catch (error) {
					Alert.alert(error?.response?.data.error);
					setDisabled(false);
				}
			} else if (!user.address || !user.phone || !user.building) {
				Alert.alert("Please complete your address and contact details");
				setDisabled(false);
				return;
			}
		} else {
			Alert.alert("You have not added any items in the cart yet");
		}
	};

	const handleCreateOrderTakeaway = async () => {
		const time = Date.now() + 1983;
		setDisabled(true);

		try {
			await axios
				.post(
					`${axiosURL}/user/createorder`,
					{
						orders: {
							orderNumber: time,
							userID: user?._id,
							basket,
							name: user?.firstName,
							email: user?.email,
							lastName: user?.lastName,
							phone: user?.phone,
							time,
							total: getBasketTotal(basket),
							deliveryOption,
							paymentOption: "cashondelivery",
							paymentStatus: "pending",
							orderStatus: "pending",
						},
					},
					{
						headers: {
							Authorization: `Bearer ${token}`,
						},
					},
				)
				.then((response) => {
					setBasket([]);
					setUpdateOrders(!updateOrders);
				})
				.then(() => {
					navigation.navigate("Congratulations", {
						orderNumber: time,
					});
				});
		} catch (error) {
			Alert.alert(error.response.data.error);
			setDisabled(false);
		}
	};

	useEffect(() => {
		setDisabled(false);
	}, []);

	return (
		<View style={{ flex: 1 }}>
			<ScrollView style={{ paddingHorizontal: 10 }}>
				<Text style={{ marginVertical: 20, fontSize: 19 }}>Checkout</Text>
				{/* Select Delivery option  */}
				<View>
					<TouchableOpacity
						onPress={() => setDeliveryOption("homedelivery")}
						style={{
							flexDirection: "row",
							alignItems: "center",
							justifyContent: "space-between",
						}}>
						<Text
							style={{
								...styles.fonts,
								fontSize: 16,
								letterSpacing: 0.4,
							}}>
							Home Delivery
						</Text>
						<RadioButton
							value="second"
							status={
								deliveryOption === "homedelivery"
									? "checked"
									: "unchecked"
							}
							onPress={() => {
								// setCashOnDelivery(true);
								setDeliveryOption("homedelivery");
							}}
						/>
					</TouchableOpacity>
					<TouchableOpacity
						onPress={() => {
							setDeliveryOption("takeaway");
							// navigation.navigate("CheckoutTakeaway");
						}}
						style={{
							flexDirection: "row",
							alignItems: "center",
							justifyContent: "space-between",
						}}>
						<Text
							style={{
								...styles.fonts,
								fontSize: 16,
								letterSpacing: 0.4,
							}}>
							Takeaway
						</Text>
						<RadioButton
							value="second"
							status={
								deliveryOption === "takeaway" ? "checked" : "unchecked"
							}
							onPress={() => {
								setDeliveryOption("takeaway");
								// navigation.navigate("CheckoutTakeaway");
							}}
						/>
					</TouchableOpacity>
				</View>
				{/* Address Section  */}
				{deliveryOption === "homedelivery" && (
					<View
						style={{
							marginVertical: 20,
							paddingHorizontal: 10,
							paddingVertical: 10,
							backgroundColor: "#ffffff",
							elevation: 2,
						}}>
						<View
							style={{
								flexDirection: "row",
								justifyContent: "space-between",
								marginBottom: 10,
							}}>
							{/* Icon and title  */}
							<View
								style={{ flexDirection: "row", alignItems: "center" }}>
								<Image
									source={icons?.location_1}
									resizeMode="contain"
									style={{ width: 30, height: 30 }}
								/>
								<Text style={{ marginLeft: 20, ...styles.fonts }}>
									Delivery address
								</Text>
							</View>

							<TouchableOpacity
								onPress={() => navigation.navigate("EnterAddress")}>
								<Image
									source={icons?.edit}
									resizeMode="contain"
									style={{
										height: 30,
										width: 30,
										tintColor: "#ff4593",
									}}
								/>
							</TouchableOpacity>
						</View>

						{/* <MapView style={{ width: "100%", height: 120 }} /> */}

						{/* Address Text  */}
						<TouchableOpacity
							style={{
								marginTop: 10,
								borderBottomWidth: 1,
								borderBottomColor: "#ddd",
							}}>
							<Text style={{ ...styles.fonts }}>
								{`${user?.building} ${user?.address}`}
							</Text>
						</TouchableOpacity>
						{/* Extra instructions to rider */}
						<TouchableOpacity
							onPress={() => navigation.navigate("EnterAddress")}
							style={{ marginTop: 10 }}>
							<Text
								style={{
									...styles.fontsBold,
									color: user?.noteToRider ? "#888" : "pink",
									fontSize: 14,
								}}>
								{user?.noteToRider
									? user?.noteToRider
									: "Note to rider"}
							</Text>
						</TouchableOpacity>
					</View>
				)}
				{/* Payment Section  */}
				<View
					style={{
						marginVertical: 20,
						paddingHorizontal: 10,
						paddingVertical: 10,
						backgroundColor: "#ffffff",
						elevation: 2,
					}}>
					<View
						style={{
							flexDirection: "row",
							justifyContent: "space-between",
							marginBottom: 10,
						}}>
						{/* Icon and title  */}
						<View style={{ flexDirection: "row", alignItems: "center" }}>
							<Image
								source={icons?.credit_card}
								resizeMode="contain"
								style={{ width: 30, height: 30, tintColor: "#ff4593" }}
							/>
							<Text style={{ marginLeft: 20, ...styles.fonts }}>
								Payment method
							</Text>
						</View>

						<TouchableOpacity
							onPress={() => navigation.navigate("PaymentSelection")}>
							<Image
								source={icons?.edit}
								resizeMode="contain"
								style={{ height: 30, width: 30, tintColor: "#ff4593" }}
							/>
						</TouchableOpacity>
					</View>

					{/* <MapView style={{ width: "100%", height: 120 }} /> */}

					{/* Cash div  */}
					<View
						style={{
							marginTop: 10,
							borderBottomColor: "#ddd",
							flexDirection: "row",
							alignItems: "center",
							justifyContent: "space-between",
						}}>
						<View style={{ flexDirection: "row", alignItems: "center" }}>
							<Image
								source={icons?.cash}
								style={{ width: 30, height: 30 }}
							/>
							<Text style={{ ...styles.fonts, marginLeft: 20 }}>
								Cash
							</Text>
						</View>

						<Text style={{ ...styles.fontsBold }}>
							€{" "}
							{(getBasketTotal(basket) + deliveryPriceExtract()).toFixed(
								2,
							)}
						</Text>
					</View>
				</View>
				{/* Order Summary Section  */}

				{deliveryOption === "homedelivery" ? (
					// With delivery fee
					<View
						style={{
							marginVertical: 20,
							paddingHorizontal: 10,
							paddingVertical: 10,
							backgroundColor: "#ffffff",
							elevation: 1,
						}}>
						<View
							style={{
								flexDirection: "row",
								justifyContent: "space-between",
								marginBottom: 10,
							}}>
							{/* Icon and title  */}
							<View
								style={{ flexDirection: "row", alignItems: "center" }}>
								<Image
									source={icons?.summary}
									resizeMode="contain"
									style={{
										width: 30,
										height: 30,
										tintColor: "#ff4593",
									}}
								/>
								<Text style={{ marginLeft: 20, ...styles.fonts }}>
									Order Summary
								</Text>
							</View>

							<TouchableOpacity
								onPress={() => navigation.navigate("Basket")}>
								<Image
									source={icons?.edit}
									resizeMode="contain"
									style={{
										height: 30,
										width: 30,
										tintColor: "#ff4593",
									}}
								/>
							</TouchableOpacity>
						</View>

						{/* <MapView style={{ width: "100%", height: 120 }} /> */}

						{/* Items and prices for order summary */}
						<View
							style={{
								marginTop: 10,
								borderBottomColor: "#ddd",
								borderBottomWidth: 2,
							}}>
							{basket?.map((item, index) => (
								<View
									key={index}
									style={{
										paddingBottom: 10,
										flexDirection: "row",
										alignItems: "center",
										justifyContent: "space-between",
									}}>
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
								€ {getBasketTotal(basket).toFixed(2)}
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
								€ {deliveryPriceExtract()}
							</Text>
						</View>
					</View>
				) : (
					// Without delivery fee
					<View
						style={{
							marginVertical: 20,
							paddingHorizontal: 10,
							paddingVertical: 10,
							backgroundColor: "#ffffff",
							elevation: 1,
						}}>
						<View
							style={{
								flexDirection: "row",
								justifyContent: "space-between",
								marginBottom: 10,
							}}>
							{/* Icon and title  */}
							<View
								style={{ flexDirection: "row", alignItems: "center" }}>
								<Image
									source={icons?.summary}
									resizeMode="contain"
									style={{
										width: 30,
										height: 30,
										tintColor: "#ff4593",
									}}
								/>
								<Text style={{ marginLeft: 20, ...styles.fonts }}>
									Order Summary
								</Text>
							</View>

							<TouchableOpacity
								onPress={() => navigation.navigate("Basket")}>
								<Image
									source={icons?.edit}
									resizeMode="contain"
									style={{
										height: 30,
										width: 30,
										tintColor: "#ff4593",
									}}
								/>
							</TouchableOpacity>
						</View>

						{/* <MapView style={{ width: "100%", height: 120 }} /> */}

						{/* Items and prices for order summary */}
						<View
							style={{
								marginTop: 10,
								borderBottomColor: "#ddd",
								borderBottomWidth: 2,
							}}>
							{basket?.map((item, index) => (
								<View
									key={index}
									style={{
										paddingBottom: 10,
										flexDirection: "row",
										alignItems: "center",
										justifyContent: "space-between",
									}}>
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
								€ {getBasketTotal(basket).toFixed(2)}
							</Text>
						</View>
					</View>
				)}
				<View style={{ height: 100 }} />
			</ScrollView>

			{/* Bottom Checkout Button  */}
			<View style={{ ...styles.bottomCheckoutDiv }}>
				{/* total container  */}
				<View
					style={{
						flexDirection: "row",
						justifyContent: "space-between",
						paddingHorizontal: 20,
					}}>
					<Text style={{ ...styles.fonts, fontSize: 15 }}>Total</Text>
					<Text style={{ ...styles.fontsBold, fontSize: 15 }}>
						€{" "}
						{(getBasketTotal(basket) + deliveryPriceExtract()).toFixed(2)}
					</Text>
				</View>
				<TouchableOpacity
					disabled={disabled}
					style={{ ...styles.bottomCheckoutButton }}
					onPress={
						deliveryOption === "takeaway"
							? handleCreateOrderTakeaway
							: deliveryOption === "homedelivery" &&
							  handleCreateOrderHomeDelivery
					}>
					<Text style={{ ...styles.bottomCheckoutButtonText }}>
						Place Order
					</Text>

					<ActivityIndicator
						size={"large"}
						color="dodgerblue"
						animating={disabled}
						style={{
							position: "absolute",
							right: 15,
							top: 5,
						}}
					/>
				</TouchableOpacity>
			</View>
		</View>
	);
};

export default Checkout;

const styles = StyleSheet.create({
	bottomCheckoutDiv: {
		position: "absolute",
		bottom: 0,
		left: 0,
		right: 0,
		backgroundColor: "white",
		elevation: 2,
		paddingVertical: 5,
	},

	bottomCheckoutButton: {
		flexDirection: "row",
		backgroundColor: "#ff4593",
		borderRadius: 10,
		marginHorizontal: 10,
		elevation: 1,
		justifyContent: "center",
		paddingVertical: 15,
		paddingHorizontal: 10,
	},

	bottomCheckoutButtonText: {
		color: "white",
		lineHeight: 20,
		fontFamily: "Poppins-Bold",
	},
	fontsBold: {
		fontFamily: "Poppins-Bold",
	},
	fonts: {
		fontFamily: "Poppins-Regular",
	},
});
