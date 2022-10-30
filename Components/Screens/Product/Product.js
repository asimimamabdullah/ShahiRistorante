import {
	StyleSheet,
	Text,
	View,
	Image,
	TouchableOpacity,
	TouchableHighlight,
	Animated,
	Easing,
	SafeAreaView,
	Platform,
} from "react-native";
import React, { useState, useEffect, useCallback } from "react";
import { icons } from "../../../constants";
import { useStateValue } from "../../../hooks/StateProvider";
import IOSSafeAreaView from "../../../SafeArea/iOSSafeArea";
import AndroidSafeAreaView from "../../../SafeArea/AndroidSafeArea";

const Product = ({ route, navigation }) => {
	const { item } = route.params;
	const [quantity, setQuantity] = useState(0);
	const state = useStateValue();
	const [language] = state.language;
	const [basket, setBasket] = state.basket;

	const anim = new Animated.Value(0);

	const handleQuantity = useCallback(() => {
		const index = basket.findIndex((i) => i.product_id === item.product_id);

		if (index === -1) setQuantity(0);
		if (index !== -1) setQuantity(basket[index].quantity);
	}, [basket]);

	useEffect(() => {
		handleQuantity();
	}, []);

	const startAnimation = useCallback(() => {
		anim.setValue(0);
		Animated.timing(anim, {
			toValue: 1,
			duration: 50,
			useNativeDriver: true,
			easing: Easing.bounce,
			// tension: 200,
			// overshootClamping: false,
			// stiffness: 200,
			// speed: 30,
			// stiffness: 200,
			// damping: 4,
			// bounciness: 50,
			// mass: 1.1,
		}).start();
	}, [quantity]);

	useEffect(() => {
		startAnimation();
	}, [quantity]);

	const addNum = (id) => {
		const index = basket.findIndex((i) => i.product_id === id);
		if (index === -1) {
			setBasket([...basket, { ...item, quantity: 1 }]);
			setQuantity(1);
		}

		if (index !== -1) {
			setQuantity((val) => val + 1);
			let newArray = [...basket];
			newArray[index] = {
				...newArray[index],
				quantity: newArray[index].quantity + 1,
			};
			setBasket(newArray);
		}
	};

	const subtractNum = (id) => {
		const index = basket.findIndex((i) => i.product_id === id);

		if (index !== -1) {
			if (basket[index].quantity > 1) {
				setQuantity((val) => val - 1);
				let newArray = [...basket];
				newArray[index] = {
					...newArray[index],
					quantity: newArray[index].quantity - 1,
				};
				setBasket(newArray);
			}
			if (basket[index].quantity === 1) {
				setQuantity(0);
				let newArray = [...basket];
				newArray.splice(index, 1);
				setBasket(newArray);
			}
		}
	};

	const scale = anim.interpolate({
		inputRange: [0, 0.5, 1],
		outputRange: [1, 1.5, 1],
	});

	const Content = () => {
		return (
			<View style={{ flex: 1 }}>
				<Image source={{ uri: item?.images?.url }} style={styles.mainProductImage} resizeMode="cover" />

				{/* Arrow button to go back  */}

				<TouchableOpacity
					hitSlop={{ bottom: 10, right: 20, left: 10, top: 10 }}
					style={styles.headerBackButton}
					onPress={() => navigation.goBack()}>
					<Image source={icons?.arrowBack} style={styles.headerBackButtonImage} />
				</TouchableOpacity>

				{/* Cart button  */}
				<TouchableOpacity style={styles.headerCartButton} onPress={() => navigation.navigate("Basket")}>
					<Image source={icons?.basket} style={styles.headerCartButtonImage} />

					<Animated.Text
						style={{
							...styles.animatedTextCart,
							transform: [{ scale: scale }],
						}}>
						{quantity}
					</Animated.Text>
				</TouchableOpacity>

				<View
					style={{
						flexDirection: "row",
						justifyContent: "space-between",
						paddingHorizontal: 10,
						alignItems: "center",
					}}>
					<Text
						style={{
							marginTop: 10,
							fontSize: 20,
							lineHeight: 30,
							fontFamily: "Poppins-Regular",
							flex: 0.9,
						}}>
						{item?.title}
					</Text>

					<Text style={{ ...styles.fonts, letterSpacing: 0.5 }}>from € {item?.price}</Text>
				</View>

				<Text
					style={{
						fontSize: 15,
						color: "gray",
						lineHeight: 20,
						paddingHorizontal: 10,
						paddingRight: 20,
						marginTop: 20,
						fontFamily: "Poppins-Regular",
					}}>
					{item?.description}
				</Text>

				{/* bottom button and quantity control  */}

				<View
					style={{
						position: "absolute",
						left: 0,
						right: 0,
						bottom: 0,
						width: "100%",
						backgroundColor: "#eee",
						elevation: 2,
						flexDirection: "row",
						justifyContent: "space-between",
						padding: 10,
					}}>
					<TouchableOpacity
						style={{
							width: 40,
							height: 40,
							borderRadius: 20,
							backgroundColor: "#ff4593",
							alignItems: "center",
							justifyContent: "center",
						}}
						onPress={() => subtractNum(item?.product_id)}>
						<Text style={{ color: "white", fontSize: 25, paddingBottom: 2 }}>-</Text>
					</TouchableOpacity>

					<Animated.Text
						style={{
							paddingHorizontal: 5,
							height: 35,
							textAlign: "center",
							textAlignVertical: "center",
							fontSize: 25,
							color: "#424141",
							transform: [{ scale: scale }],
						}}>
						{quantity}
					</Animated.Text>

					<TouchableOpacity
						onPress={() => addNum(item.product_id)}
						style={{
							width: 40,
							height: 40,
							borderRadius: 20,
							backgroundColor: "#ff4593",
							justifyContent: "center",
							alignItems: "center",
						}}>
						<Text
							style={{
								color: "white",
								fontSize: 25,
								paddingBottom: 2,
							}}>
							+
						</Text>
					</TouchableOpacity>

					<TouchableHighlight
						activeOpacity={0.6}
						underlayColor="#ff66a6"
						style={{
							flex: 1,
							marginHorizontal: 20,
							borderRadius: 12,
							backgroundColor: "#ff4593",
							paddingVertical: 10,
						}}
						onPress={() => addNum(item?.product_id)}>
						<Text
							style={{
								color: "white",
								textAlign: "center",
								fontSize: 15,
								textAlignVertical: "center",
							}}>
							{language === "en" ? "Add to cart" : "Aggiungi al carrello"}
						</Text>
					</TouchableHighlight>
				</View>
			</View>
		);
	};
	return Platform.OS === "ios" ? (
		<IOSSafeAreaView styles={{ flex: 1 }}>{Content()}</IOSSafeAreaView>
	) : (
		<AndroidSafeAreaView styles={{ flex: 1 }}>{Content()}</AndroidSafeAreaView>
	);
};

export default React.memo(Product);

const styles = StyleSheet.create({
	fonts: {
		fontFamily: "Poppins-Regular",
	},

	mainProductImage: {
		width: "100%",
		height: 200,
		borderBottomLeftRadius: 10,
		borderBottomRightRadius: 10,
		marginBottom: 10,
	},

	headerBackButton: {
		position: "absolute",
		top: 5,
		left: 10,
		width: 40,
		height: 40,
		borderRadius: 25,
		backgroundColor: "#f6f6f6",
		alignItems: "center",
		justifyContent: "center",
	},
	headerBackButtonImage: {
		height: 30,
		width: 35,
	},

	headerCartButton: {
		position: "absolute",
		top: 0,
		right: 10,
		width: 50,
		height: 50,
		borderRadius: 25,
		backgroundColor: "#ffffff",
		alignItems: "center",
		justifyContent: "center",
	},

	headerCartButtonImage: {
		height: 30,
		width: 30,
		tintColor: "#ff4593",
	},

	animatedTextCart: {
		position: "absolute",
		top: 5,
		right: 5,
		backgroundColor: "#ff4593",
		color: "#ffffff",
		borderRadius: 13,
		width: 22,
		height: 22,
		textAlign: "center",
		textAlignVertical: "center",
	},
});
