import {
	StyleSheet,
	Text,
	View,
	TouchableOpacity,
	Image,
	Animated,
	Easing,
	ScrollView,
	Alert,
	SafeAreaView,
} from "react-native";
import React, { useState, useEffect, useCallback, memo } from "react";
import { images } from "./../../../constants";
import { useStateValue } from "../../../hooks/StateProvider";
import { getBasketTotal } from "../../../reducer";
// import BasketAPI from "../../api/BasketAPI";
import BasketItem from "./BasketItem/BasketItem";

const Basket = ({ navigation }) => {
	const state = useStateValue();
	const [language] = state.language;
	const [basket] = state.basket;
	const [isLoggedIn] = state.userAPI.isLoggedIn;
	const [postalData] = state.userAPI.postalData;

	// 	const handleAdd = (id) => {
	// 		const index = basket?.findIndex((i) => i.product_id === id);
	//
	// 		if (index === -1) {
	// 			setBasket([...basket, { ...item, quantity: 1 }]);
	// 		}
	//
	// 		if (index !== -1) {
	// 			let newArray = [...basket];
	// 			newArray[index] = {
	// 				...newArray[index],
	// 				quantity: newArray[index].quantity + 1,
	// 			};
	// 			setBasket(newArray);
	// 		}
	// 	};

	// 	const handleSubtract = (id) => {
	// 		const index = basket.findIndex((i) => i.product_id === id);
	//
	// 		if (index !== -1) {
	// 			if (basket[index].quantity > 1) {
	// 				let newArray = [...basket];
	// 				newArray[index] = {
	// 					...newArray[index],
	// 					quantity: newArray[index].quantity - 1,
	// 				};
	// 				setBasket(newArray);
	// 			}
	// 			if (basket[index].quantity === 1) {
	// 				let newArray = [...basket];
	// 				newArray.splice(index, 1);
	// 				setBasket(newArray);
	// 			}
	// 		}
	// 	};
	return (
		<SafeAreaView style={{ flex: 1 }}>
			<View style={{ flex: 1 }}>
				{/* Estimated Delivery first div  */}

				<ScrollView>
					<View
						style={{
							...styles.estimatedDeliveryFirstDiv,
						}}>
						<Image source={images?.food_delivery} style={{ width: 80, height: 80 }} />

						<View style={{ ...styles.firstDivInsideContainer }}>
							<Text style={{ ...styles.fonts, fontSize: 16 }}>
								{language === "en" ? "Estimated Delivery" : "Consegna stimata"}
							</Text>

							<Text style={{ ...styles.fonts, fontSize: 17 }}>
								{language === "en" ? "40 - 50 minutes" : "40 - 50 minuti"}
							</Text>
						</View>
					</View>

					<Text style={{ ...styles.basketMainTitle }}>
						{language === "en" ? "Basket Items" : "elementi del cestino"}
					</Text>

					{/* Basket Items  */}
					<View style={{ paddingHorizontal: 10 }}>
						{basket?.map((item, index) => (
							// Basket Item
							<BasketItem item={item} key={index} />
						))}
					</View>

					{/* Subtotal and delivery fee  */}
					<View style={{ ...styles.basketItemsMainContainer }}>
						{/* SubTotal Div  */}
						<View
							style={{
								flexDirection: "row",
								justifyContent: "space-between",
								marginTop: 20,
							}}>
							<Text style={{ ...styles.fontsBold, fontSize: 16 }}>
								{language === "en" ? "Subtotal" : "totale parziale"}
							</Text>
							<Text style={{ ...styles.fontsBold, fontSize: 16 }}>€ {getBasketTotal(basket).toFixed(2)}</Text>
						</View>

						{/* Delivery Fee Div  */}

						<View
							style={{
								flexDirection: "row",
								justifyContent: "space-between",
								marginTop: 10,
							}}>
							<Text style={{ ...styles.fonts }}>{language === "en" ? "Delivery fee" : "Tassa di consegna"}</Text>
							<Text style={{ ...styles.fonts }}>
								€ {postalData?.deliveryPrice ? postalData?.deliveryPrice : 0}
							</Text>
						</View>
					</View>

					<View style={{ height: 110 }} />
				</ScrollView>

				{/* Bottom Checkout Button  */}
				<View style={{ ...styles.bottomCheckoutDiv, paddingHorizontal: 10 }}>
					{/* total container  */}
					<View
						style={{
							flexDirection: "row",
							justifyContent: "space-between",
							paddingHorizontal: 20,
						}}>
						<Text style={{ ...styles.fonts, fontSize: 15 }}>{language === "en" ? "Total" : "Totale"}</Text>
						<Text style={{ ...styles.fontsBold, fontSize: 15 }}>
							€{" "}
							{(
								getBasketTotal(basket) + (postalData?.deliveryPrice ? parseInt(postalData?.deliveryPrice) : 0)
							).toFixed(2)}
						</Text>
					</View>
					<TouchableOpacity
						style={{ ...styles.bottomCheckoutButton }}
						onPress={() => {
							const r = parseInt(postalData?.minOrder);
							isLoggedIn
								? r > getBasketTotal(basket)
									? Alert.alert(`Order should be minimum of ${postalData?.minOrder}`)
									: navigation.navigate("Checkout")
								: navigation.navigate("Account");
						}}>
						<Text style={{ ...styles.bottomCheckoutButtonText }}>
							{language === "en" ? "Review payment and address" : "Rivedi il pagamento e l'indirizzo"}
						</Text>
					</TouchableOpacity>
				</View>
			</View>
		</SafeAreaView>
	);
};

export default memo(Basket);

const styles = StyleSheet.create({
	estimatedDeliveryFirstDiv: {
		borderRadius: 15,
		elevation: 2,
		flexDirection: "row",
		marginVertical: 20,
		padding: 20,
		backgroundColor: "white",
		marginHorizontal: 10,
	},

	firstDivInsideContainer: {
		alignItems: "center",
		justifyContent: "center",
		marginLeft: 30,
	},
	basketMainTitle: {
		paddingHorizontal: 20,
		fontSize: 20,
		fontFamily: "Poppins-Regular",
		marginBottom: 10,
	},

	basketItemsMainContainer: {
		marginHorizontal: 10,
		borderBottomWidth: 2,
		borderBottomColor: "#dddddd",
	},

	basketItemContainer: {
		paddingVertical: 10,
		paddingHorizontal: 5,
		marginVertical: 5,
		borderWidth: 1,
		borderColor: "#ddd",
	},

	basketItemUpperDiv: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
	},

	basketItemUpperDivImageName: {
		flexDirection: "row",
		alignItems: "center",
	},

	basketItemUpperDivImageStyle: {
		width: 70,
		height: 70,
		borderRadius: 10,
	},

	basketItemQuantityControl: {
		marginTop: 13,
		flexDirection: "row",
		justifyContent: "flex-end",
	},

	basketItemQuantityControlButton: {
		width: 37,
		height: 37,
		borderRadius: 25,
		backgroundColor: "#ff4593",
		alignItems: "center",
		justifyContent: "center",
	},

	basketItemQuantityControlButtonText: {
		color: "white",
		fontSize: 30,
		lineHeight: 34,
	},

	quantityControlAnimatedText: {
		paddingHorizontal: 10,
		height: 35,
		textAlign: "center",
		alignItems: "center",
		fontSize: 25,
		color: "#424141",
	},

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
