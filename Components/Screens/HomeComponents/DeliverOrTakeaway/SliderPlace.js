import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import React from "react";
import { images } from "../../../../constants";
import { useStateValue } from "../../../../hooks/StateProvider";

const SliderPlace = ({ navigation }) => {
	const { userAPI } = useStateValue();
	const [user] = userAPI.user;

	return (
		<View>
			{/* Welcome div  */}
			<View style={{ ...styles.welcomeDivContainer }}>
				<View>
					<Text style={{ ...styles.fonts, fontSize: 20, lineHeight: 25 }}>
						Welcome {user?.firstName ? user?.firstName : "here"}
					</Text>
					<Text style={{ ...styles.fonts, fontSize: 13, lineHeight: 18 }}>
						Looking for food?{" "}
					</Text>
				</View>

				<Image
					source={images?.food_2}
					style={{ width: 100, height: 100 }}
				/>
			</View>
			{/* Food Delivery Div  */}
			<TouchableOpacity
				onPress={() => navigation.navigate("FoodDelivery")}
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
						Food delivery
					</Text>
					<Text
						style={{
							...styles.foodDeliveryDivText,
							fontSize: 12,
							lineHeight: 20,
						}}>
						Order your favourite food
					</Text>
				</View>
				<Image
					source={images?.food_1}
					style={{ width: 100, height: 100, alignSelf: "center" }}
				/>
			</TouchableOpacity>

			{/* Pick up div  */}
			<TouchableOpacity
				onPress={() => navigation.navigate("Pickup")}
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
						Pick-Up
					</Text>
					<Text
						style={{
							...styles.foodDeliveryDivText,
							lineHeight: 18,
							fontSize: 12,
						}}>
						Save delivery cost
					</Text>
				</View>
				<Image
					source={images?.takeawayimage}
					style={{ width: 120, height: 120, alignSelf: "center" }}
				/>
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
