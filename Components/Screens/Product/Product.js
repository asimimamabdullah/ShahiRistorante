import {
	StyleSheet,
	Text,
	View,
	Image,
	TouchableOpacity,
	TouchableHighlight,
	Animated,
	Easing,
} from "react-native";
import React, { useState, useEffect, useCallback } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { icons } from "../../../constants";
import { useStateValue } from "../../../hooks/StateProvider";

const Product = ({ route, navigation }) => {
	const { item } = route.params;
	const [quantity, setQuantity] = useState(0);
	const state = useStateValue();
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

	return (
		<SafeAreaView style={{ height: "100%" }}>
			<Image
				source={{ uri: item?.images?.url }}
				style={{
					width: "100%",
					height: 200,
					borderBottomLeftRadius: 10,
					borderBottomRightRadius: 10,
					marginBottom: 10,
				}}
				resizeMode="cover"
			/>

			{/* Arrow button to go back  */}

			<TouchableOpacity
				style={{
					position: "absolute",
					top: 50,
					left: 10,
					width: 40,
					height: 40,
					borderRadius: 25,
					backgroundColor: "#f6f6f6",
					alignItems: "center",
					justifyContent: "center",
				}}
				onPress={() => navigation.goBack()}>
				<Image
					source={icons?.arrowBack}
					style={{ height: 30, width: 35 }}
				/>
			</TouchableOpacity>

			<TouchableOpacity
				style={{
					position: "absolute",
					top: 40,
					right: 10,
					width: 50,
					height: 50,
					borderRadius: 25,
					backgroundColor: "#ffffff",
					alignItems: "center",
					justifyContent: "center",
				}}
				onPress={() => navigation.navigate("Basket")}>
				<Image
					source={icons?.basket}
					style={{ height: 30, width: 30, tintColor: "#ff4593" }}
				/>

				<Animated.Text
					style={{
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

				<Text style={{ ...styles.fonts, letterSpacing: 0.5 }}>
					from € {item?.price}
				</Text>
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
					<Text style={{ color: "white", fontSize: 40, lineHeight: 40 }}>
						-
					</Text>
				</TouchableOpacity>

				<Animated.Text
					style={{
						// width: 30,
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
					}}>
					<Text
						style={{
							color: "white",
							fontSize: 25,
							textAlign: "center",
							textAlignVertical: "center",
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
							// fontFamily: "Poppins-Regular",
							fontSize: 15,
							textAlignVertical: "center",
							// lineHeight: 23,
						}}>
						Add to cart
					</Text>
				</TouchableHighlight>
			</View>
		</SafeAreaView>
	);
};

export default React.memo(Product);

const styles = StyleSheet.create({
	fonts: {
		fontFamily: "Poppins-Regular",
	},
});
