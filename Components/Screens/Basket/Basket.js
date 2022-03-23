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
} from "react-native";
import React, { useState, useEffect, useCallback, memo } from "react";
import { images } from "./../../../constants";
import { useStateValue } from "../../../hooks/StateProvider";
import { getBasketTotal } from "../../../reducer";
// import BasketAPI from "../../api/BasketAPI";
import BasketItem from "./BasketItem/BasketItem";

const Basket = ({ navigation }) => {
	const state = useStateValue();
	const [basket, setBasket] = state.basket;
	const [quantity, setQuantity] = useState(0);
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
		<View style={{ flex: 1 }}>
			{/* Estimated Delivery first div  */}

			<ScrollView>
				<View
					style={{
						...styles.estimatedDeliveryFirstDiv,
					}}>
					<Image
						source={images?.food_delivery}
						style={{ width: 80, height: 80 }}
					/>

					<View style={{ ...styles.firstDivInsideContainer }}>
						<Text style={{ ...styles.fonts, fontSize: 16 }}>
							Estimated Delivery
						</Text>

						<Text style={{ ...styles.fonts, fontSize: 17 }}>
							40 - 50 minutes
						</Text>
					</View>
				</View>

				<Text style={{ ...styles.basketMainTitle }}>Basket Items</Text>

				{/* Basket Items  */}
				<View style={{ paddingHorizontal: 10 }}>
					{basket?.map((item, index) => (
						// Basket Item
						<BasketItem item={item} key={index} />
						// 						<View style={{ ...styles.basketItemContainer }} key={index}>
						// 							{/* Item's Upper div */}
						// 							<View style={{ ...styles.basketItemUpperDiv }}>
						// 								{/* Image and name  */}
						// 								<View
						// 									style={{
						// 										...styles.basketItemUpperDivImageName,
						// 										flex: 0.8,
						// 									}}>
						// 									{/* Item Image  */}
						// 									{item?.images ? (
						// 										<Image
						// 											source={{ uri: item?.images.url }}
						// 											resizeMode="cover"
						// 											style={{
						// 												...styles.basketItemUpperDivImageStyle,
						// 											}}
						// 										/>
						// 									) : null}
						//
						// 									{/* Item Name  */}
						// 									<Text style={{ marginLeft: 20, ...styles.fonts }}>
						// 										{item?.title}
						// 									</Text>
						// 								</View>
						//
						// 								{/* Item Price  */}
						// 								<View>
						// 									<Text style={{ ...styles.fontsBold, fontSize: 15 }}>
						// 										€ {item?.price}
						// 									</Text>
						// 								</View>
						// 							</View>
						//
						// 							{/* bottom button and quantity control  */}
						// 							<View style={{ ...styles.basketItemQuantityControl }}>
						// 								<TouchableOpacity
						// 									style={{ ...styles.basketItemQuantityControlButton }}
						// 									onPress={() => handleSubtract(item?.product_id)}>
						// 									<Text
						// 										style={{
						// 											...styles.basketItemQuantityControlButtonText,
						// 										}}>
						// 										-
						// 									</Text>
						// 								</TouchableOpacity>
						//
						// 								<Text
						// 									style={{
						// 										...styles.quantityControlAnimatedText,
						// 									}}>
						// 									{item?.quantity}
						// 								</Text>
						//
						// 								<TouchableOpacity
						// 									onPress={() => handleAdd(item?.product_id)}
						// 									style={{
						// 										...styles.basketItemQuantityControlButton,
						// 									}}>
						// 									<Text
						// 										style={{
						// 											...styles.basketItemQuantityControlButtonText,
						// 										}}>
						// 										+
						// 									</Text>
						// 								</TouchableOpacity>
						// 							</View>
						// 						</View>
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
							Subtotal
						</Text>
						<Text style={{ ...styles.fontsBold, fontSize: 16 }}>
							€ {getBasketTotal(basket).toFixed(2)}
						</Text>
					</View>

					{/* Delivery Fee Div  */}

					<View
						style={{
							flexDirection: "row",
							justifyContent: "space-between",
							marginTop: 10,
						}}>
						<Text style={{ ...styles.fonts }}>Delivery fee</Text>
						<Text style={{ ...styles.fonts }}>
							€{" "}
							{postalData?.deliveryPrice ? postalData?.deliveryPrice : 0}
						</Text>
					</View>
				</View>

				<View style={{ height: 110 }} />
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
						{(
							getBasketTotal(basket) +
							(postalData?.deliveryPrice
								? parseInt(postalData?.deliveryPrice)
								: 0)
						).toFixed(2)}
					</Text>
				</View>
				<TouchableOpacity
					style={{ ...styles.bottomCheckoutButton }}
					onPress={() => {
						const r = parseInt(postalData?.minOrder);
						isLoggedIn
							? r > getBasketTotal(basket)
								? Alert.alert(
										`Order should be minimum of ${postalData?.minOrder}`,
								  )
								: navigation.navigate("Checkout")
							: navigation.navigate("Account");
					}}>
					<Text style={{ ...styles.bottomCheckoutButtonText }}>
						Review payment and address
					</Text>
				</TouchableOpacity>
			</View>
		</View>
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
