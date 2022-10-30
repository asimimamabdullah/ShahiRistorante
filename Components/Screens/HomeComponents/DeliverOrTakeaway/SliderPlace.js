import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import React from "react";
import { images } from "../../../../constants";
import { useStateValue } from "../../../../hooks/StateProvider";
import * as RootNavigation from "../../../../Navigation/RootNavigation";

const SliderPlace = () => {
	const state = useStateValue();
	const [language] = state.language;
	const [user] = state.userAPI.user;

	return (
		<View>
			{/* Welcome div  */}
			<View style={{ ...styles.welcomeDivContainer }}>
				<View>
					<Text style={{ ...styles.fonts, fontSize: 20, lineHeight: 25 }}>
						{language === "en" ? "Welcome" : "Benvenuta"}{" "}
						{user?.firstName ? user?.firstName : language === "en" ? "here" : "qui"}
					</Text>
					<Text style={{ ...styles.fonts, fontSize: 14, lineHeight: 18 }}>
						{language === "en" ? "Looking for food" : "Cercando cibo"}?{" "}
					</Text>
				</View>

				<Image source={images?.food_2} style={{ width: 100, height: 100 }} />
			</View>
			{/* Food Delivery Div  */}
			<TouchableOpacity
				onPress={() => RootNavigation.navigate("FoodDelivery")}
				style={{
					...styles.foodDeliveryDivContainer,
					backgroundColor: "#ff4593",
				}}>
				{/* Text div  */}
				<View
					style={{
						justifyContent: "flex-end",
						paddingVertical: 20,
					}}>
					<Text
						style={{
							...styles.foodDeliveryDivText,
							fontSize: 19,
							lineHeight: 25,
						}}>
						{language === "en" ? "Food delivery" : "Consegna del cibo"}
					</Text>
					<Text
						style={{
							...styles.foodDeliveryDivText,
							fontSize: 12,
							lineHeight: 20,
						}}>
						{language === "en" ? "Order your favourite food" : "Ordina il tuo cibo preferito"}
					</Text>
				</View>
				<Image source={images?.food_1} style={{ width: 100, height: 100, alignSelf: "center" }} />
			</TouchableOpacity>

			{/* Pick up div  */}
			<TouchableOpacity
				onPress={() => RootNavigation.navigate("Pickup")}
				style={{
					...styles.foodDeliveryDivContainer,
					backgroundColor: "#f772ab",
					marginVertical: 10,
				}}>
				{/* Text Div  */}
				<View style={{ justifyContent: "center" }}>
					<Text
						style={{
							...styles.foodDeliveryDivText,
							lineHeight: 25,
							fontSize: 19,
						}}>
						{language === "en" ? "Pick-Up" : "Porta via"}
					</Text>
					<Text
						style={{
							...styles.foodDeliveryDivText,
							lineHeight: 18,
							fontSize: 12,
						}}>
						{language === "en" ? "Save delivery cost" : "Risparmiare sui costi di consegna"}
					</Text>
				</View>
				<Image source={images?.takeawayimage} style={{ width: 120, height: 120, alignSelf: "center" }} />
			</TouchableOpacity>
		</View>
	);
};

export default SliderPlace;

const styles = StyleSheet.create({
	welcomeDivContainer: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		paddingHorizontal: 15,
		paddingVertical: 10,
		marginVertical: 10,
	},

	foodDeliveryDivContainer: {
		flexDirection: "row",
		justifyContent: "space-between",
		paddingHorizontal: 15,
		paddingVertical: 10,
		marginHorizontal: 10,
		borderRadius: 12,
		minHeight: 140,
	},

	foodDeliveryDivText: {
		color: "#ffffff",
		fontFamily: "Poppins-Regular",
	},

	fonts: {
		fontFamily: "Poppins-Regular",
	},
});
