// import {
// 	StyleSheet,
// 	Text,
// 	View,
// 	ScrollView,
// 	Image,
// 	TouchableOpacity,
// } from "react-native";
// import React from "react";
//
// import { useStateValue } from "../../../hooks/StateProvider";
// import { getBasketTotal } from "./../../../reducer";
// import { icons } from "../../../constants";
// import { RadioButton } from "react-native-paper";
//
// const CheckoutTakeaway = ({ navigation }) => {
// 	const state = useStateValue();
// 	const { userAPI } = useStateValue();
// 	const [basket] = state.basket;
// 	const [deliveryOption, setDeliveryOption] = userAPI.deliveryOption;
// 	const [cashOnDelivery, setCashOnDelivery] = userAPI.cashOnDelivery;
//
// 	return (
// 		<View style={{ flex: 1 }}>
// 			<ScrollView style={{ paddingHorizontal: 10 }}>
// 				<Text style={{ marginVertical: 20, fontSize: 19 }}>Checkout</Text>
//
// 				{/* Select Delivery option  */}
// 				<View>
// 					<TouchableOpacity
// 						onPress={() => {
// 							setDeliveryOption("homedelivery");
// 							navigation.navigate("Checkout");
// 						}}
// 						style={{
// 							flexDirection: "row",
// 							alignItems: "center",
// 							justifyContent: "space-between",
// 						}}>
// 						<Text
// 							style={{
// 								...styles.fonts,
// 								fontSize: 16,
// 								letterSpacing: 0.4,
// 							}}>
// 							Home Delivery
// 						</Text>
// 						<RadioButton
// 							value="second"
// 							status={
// 								deliveryOption === "homedelivery"
// 									? "checked"
// 									: "unchecked"
// 							}
// 							onPress={() => {
// 								setDeliveryOption("homedelivery");
// 								navigation.navigate("Checkout");
// 							}}
// 						/>
// 					</TouchableOpacity>
// 					<TouchableOpacity
// 						onPress={() => setDeliveryOption("takeaway")}
// 						style={{
// 							flexDirection: "row",
// 							alignItems: "center",
// 							justifyContent: "space-between",
// 						}}>
// 						<Text
// 							style={{
// 								...styles.fonts,
// 								fontSize: 16,
// 								letterSpacing: 0.4,
// 							}}>
// 							Takeaway
// 						</Text>
// 						<RadioButton
// 							value="second"
// 							status={
// 								deliveryOption === "takeaway" ? "checked" : "unchecked"
// 							}
// 							onPress={() => {
// 								setDeliveryOption("takeaway");
// 							}}
// 						/>
// 					</TouchableOpacity>
// 				</View>
//
// 				{/* Payment Section  */}
// 				<View
// 					style={{
// 						marginVertical: 20,
// 						paddingHorizontal: 10,
// 						paddingVertical: 10,
// 						backgroundColor: "#ffffff",
// 						elevation: 2,
// 					}}>
// 					<View
// 						style={{
// 							flexDirection: "row",
// 							justifyContent: "space-between",
// 							marginBottom: 10,
// 						}}>
// 						{/* Icon and title  */}
// 						<View style={{ flexDirection: "row", alignItems: "center" }}>
// 							<Image
// 								source={icons?.credit_card}
// 								resizeMode="contain"
// 								style={{ width: 30, height: 30, tintColor: "#ff4593" }}
// 							/>
// 							<Text style={{ marginLeft: 20, ...styles.fonts }}>
// 								Payment method
// 							</Text>
// 						</View>
//
// 						<TouchableOpacity
// 							onPress={() => navigation.navigate("PaymentSelection")}>
// 							<Image
// 								source={icons?.edit}
// 								resizeMode="contain"
// 								style={{ height: 30, width: 30, tintColor: "#ff4593" }}
// 							/>
// 						</TouchableOpacity>
// 					</View>
//
// 					{/* Cash div  */}
// 					<View
// 						style={{
// 							marginTop: 10,
// 							borderBottomColor: "#ddd",
// 							flexDirection: "row",
// 							alignItems: "center",
// 							justifyContent: "space-between",
// 						}}>
// 						<View style={{ flexDirection: "row", alignItems: "center" }}>
// 							<Image
// 								source={icons?.cash}
// 								style={{ width: 30, height: 30 }}
// 							/>
// 							<Text style={{ ...styles.fonts, marginLeft: 20 }}>
// 								On Cash
// 							</Text>
// 						</View>
//
// 						<Text style={{ ...styles.fontsBold }}>
// 							€ {(getBasketTotal(basket) + 20).toFixed(2)}
// 						</Text>
// 					</View>
// 				</View>
//
// 				{/* Order Summary Section  */}
//
// 				<View
// 					style={{
// 						marginVertical: 20,
// 						paddingHorizontal: 10,
// 						paddingVertical: 10,
// 						backgroundColor: "#ffffff",
// 						elevation: 1,
// 					}}>
// 					<View
// 						style={{
// 							flexDirection: "row",
// 							justifyContent: "space-between",
// 							marginBottom: 10,
// 						}}>
// 						{/* Icon and title  */}
// 						<View style={{ flexDirection: "row", alignItems: "center" }}>
// 							<Image
// 								source={icons?.summary}
// 								resizeMode="contain"
// 								style={{ width: 30, height: 30, tintColor: "#ff4593" }}
// 							/>
// 							<Text style={{ marginLeft: 20, ...styles.fonts }}>
// 								Order Summary
// 							</Text>
// 						</View>
//
// 						<TouchableOpacity
// 							onPress={() => navigation.navigate("Basket")}>
// 							<Image
// 								source={icons?.edit}
// 								resizeMode="contain"
// 								style={{ height: 30, width: 30, tintColor: "#ff4593" }}
// 							/>
// 						</TouchableOpacity>
// 					</View>
//
// 					{/* Items and prices for order summary */}
// 					<View
// 						style={{
// 							marginTop: 10,
// 							borderBottomColor: "#ddd",
// 							borderBottomWidth: 2,
// 						}}>
// 						{basket?.map((item, index) => (
// 							<View
// 								key={index}
// 								style={{
// 									paddingBottom: 10,
// 									flexDirection: "row",
// 									alignItems: "center",
// 									justifyContent: "space-between",
// 								}}>
// 								<View
// 									style={{
// 										flex: 0.9,
// 										flexDirection: "row",
// 										alignItems: "center",
// 									}}>
// 									<Text
// 										style={{
// 											...styles.fonts,
// 											marginLeft: 20,
// 										}}>
// 										{item?.quantity}x {item?.title}
// 									</Text>
// 								</View>
//
// 								<Text style={{ ...styles.fontsBold }}>
// 									€ {(item?.price * item?.quantity).toFixed(2)}
// 								</Text>
// 							</View>
// 						))}
// 					</View>
//
// 					{/* Subtotal and delivery fee div  */}
//
// 					<View
// 						style={{
// 							marginTop: 10,
// 							flexDirection: "row",
// 							justifyContent: "space-between",
// 						}}>
// 						<Text style={{ ...styles.fonts, paddingLeft: 20 }}>
// 							Subtotal
// 						</Text>
// 						<Text style={{ ...styles.fonts, paddingLeft: 20 }}>
// 							€ {getBasketTotal(basket).toFixed(2)}
// 						</Text>
// 					</View>
// 				</View>
// 				<View style={{ height: 100 }} />
// 			</ScrollView>
//
// 			{/* Bottom Checkout Button  */}
// 			<View style={{ ...styles.bottomCheckoutDiv }}>
// 				{/* total container  */}
// 				<View
// 					style={{
// 						flexDirection: "row",
// 						justifyContent: "space-between",
// 						paddingHorizontal: 20,
// 					}}>
// 					<Text style={{ ...styles.fonts, fontSize: 15 }}>Total</Text>
// 					<Text style={{ ...styles.fontsBold, fontSize: 15 }}>
// 						€ {getBasketTotal(basket).toFixed(2)}
// 					</Text>
// 				</View>
// 				<TouchableOpacity
// 					style={{ ...styles.bottomCheckoutButton }}
// 					onPress={() => navigation.navigate("Congratulations")}>
// 					<Text style={{ ...styles.bottomCheckoutButtonText }}>
// 						Place Order
// 					</Text>
// 					{/* <Text></Text>
// 					<Text style={{ ...styles.bottomCheckoutButtonText }}>
// 						Go to Checkout
// 					</Text>
// 					<Text style={{ ...styles.bottomCheckoutButtonText }}>
// 						€ 50.00
// 					</Text> */}
// 				</TouchableOpacity>
// 			</View>
// 		</View>
// 	);
// };
//
// export default CheckoutTakeaway;
//
// const styles = StyleSheet.create({
// 	bottomCheckoutDiv: {
// 		position: "absolute",
// 		bottom: 0,
// 		left: 0,
// 		right: 0,
// 		backgroundColor: "white",
// 		elevation: 2,
// 		paddingVertical: 5,
// 	},
//
// 	bottomCheckoutButton: {
// 		flexDirection: "row",
// 		backgroundColor: "#ff4593",
// 		borderRadius: 10,
// 		marginHorizontal: 10,
// 		elevation: 1,
// 		justifyContent: "center",
// 		paddingVertical: 15,
// 		paddingHorizontal: 10,
// 	},
//
// 	bottomCheckoutButtonText: {
// 		color: "white",
// 		lineHeight: 20,
// 		fontFamily: "Poppins-Bold",
// 	},
// 	fontsBold: {
// 		fontFamily: "Poppins-Bold",
// 	},
// 	fonts: {
// 		fontFamily: "Poppins-Regular",
// 	},
// });
