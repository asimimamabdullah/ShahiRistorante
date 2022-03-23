import {
	StyleSheet,
	Text,
	View,
	Image,
	Animated,
	Easing,
	TouchableOpacity,
} from "react-native";
import React, { useCallback, useEffect, useState } from "react";

import { useStateValue } from "../../../../hooks/StateProvider";

const BasketItem = ({ item }) => {
	const state = useStateValue();
	const [basket, setBasket] = state.basket;
	const [quantity, setQuantity] = useState(0);
	const anim = new Animated.Value(0);

	const handleAdd = (id) => {
		const index = basket?.findIndex((i) => i.product_id === id);

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

	const handleSubtract = (id) => {
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
			duration: 200,
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

	const scale = anim.interpolate({
		inputRange: [0, 0.5, 1],
		outputRange: [1, 1.5, 1],
	});

	return (
		// Basket Item
		<View style={{ ...styles.basketItemContainer }}>
			{/* Item's Upper div */}
			<View style={{ ...styles.basketItemUpperDiv }}>
				{/* Image and name  */}
				<View style={{ ...styles.basketItemUpperDivImageName, flex: 0.8 }}>
					{/* Item Image  */}
					{item?.images ? (
						<Image
							source={{ uri: item?.images.url }}
							resizeMode="cover"
							style={{ ...styles.basketItemUpperDivImageStyle }}
						/>
					) : null}

					{/* Item Name  */}
					<Text style={{ marginLeft: 20, ...styles.fonts }}>
						{item?.title}
					</Text>
				</View>

				{/* Item Price  */}
				<View>
					<Text style={{ ...styles.fontsBold, fontSize: 15 }}>
						€ {item?.price}
					</Text>
				</View>
			</View>

			{/* bottom button and quantity control  */}
			<View style={{ ...styles.basketItemQuantityControl }}>
				<TouchableOpacity
					style={{ ...styles.basketItemQuantityControlButton }}
					onPress={() => handleSubtract(item?.product_id)}>
					<Text
						style={{
							...styles.basketItemQuantityControlButtonText,
						}}>
						-
					</Text>
				</TouchableOpacity>

				<Animated.Text
					style={{
						...styles.quantityControlAnimatedText,
						transform: [{ scale: scale }],
					}}>
					{quantity}
				</Animated.Text>

				<TouchableOpacity
					onPress={() => handleAdd(item?.product_id)}
					style={{
						...styles.basketItemQuantityControlButton,
					}}>
					<Text
						style={{
							...styles.basketItemQuantityControlButtonText,
						}}>
						+
					</Text>
				</TouchableOpacity>
			</View>
		</View>
	);
};

export default BasketItem;

const styles = StyleSheet.create({
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
});
