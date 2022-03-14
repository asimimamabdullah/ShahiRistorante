import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import React from "react";

import { SafeAreaView } from "react-native-safe-area-context";
import { icons } from "../../../constants";

const Congratulations = ({ navigation, route }) => {
	const { orderNumber } = route.params;
	return (
		<>
			<SafeAreaView style={{ flex: 1 }}>
				<View
					style={{
						backgroundColor: "#fff",
						height: 70,
						justifyContent: "center",
						paddingHorizontal: 20,
					}}>
					<TouchableOpacity onPress={() => navigation.navigate("Home")}>
						<Image
							source={icons.home}
							style={{ height: 35, width: 35, tintColor: "#ff4593" }}
						/>
					</TouchableOpacity>
				</View>
				<View
					style={{
						paddingHorizontal: 20,
						paddingVertical: 20,
						flex: 1,
						backgroundColor: "#fff",
						justifyContent: "center",
						alignItems: "center",
					}}>
					<Image
						source={icons?.congratulation}
						style={{
							width: 170,
							height: 170,
							marginBottom: 20,
						}}
					/>

					<Text
						style={{
							...styles.fontsBold,
							fontSize: 17,
							textAlign: "center",
							marginVertical: 10,
						}}>
						Congratulations!
					</Text>

					<Text
						style={{
							...styles.fonts,
							textAlign: "center",
							fontSize: 15,
						}}>
						You have successfully placed an order
					</Text>

					<TouchableOpacity
						onPress={() =>
							navigation.navigate("OrderSummary", {
								orderNumber,
							})
						}
						style={{
							backgroundColor: "#ff4593",
							justifyContent: "center",
							alignItems: "center",
							paddingVertical: 10,
							paddingHorizontal: 20,
							marginTop: 50,
							flexDirection: "row",
						}}>
						<Text
							style={{
								color: "#ffffff",
								...styles.fontsBold,
								fontSize: 15,
							}}>
							Delivery Status
						</Text>
						<View
							style={{
								backgroundColor: "white",
								padding: 6,
								marginLeft: 30,
								borderRadius: 5,
							}}>
							<Image
								source={icons.openRight}
								style={{ width: 20, height: 20 }}
							/>
						</View>
					</TouchableOpacity>
				</View>
			</SafeAreaView>
		</>
	);
};

export default Congratulations;

const styles = StyleSheet.create({
	fontsBold: {
		fontFamily: "Poppins-Bold",
	},
	fonts: {
		fontFamily: "Poppins-Regular",
	},
});
