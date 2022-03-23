import { StyleSheet, Text, Image, View, TouchableOpacity } from "react-native";
import React from "react";
import { icons } from "../../../constants";
import { useStateValue } from "../../../hooks/StateProvider";

const Header = ({ navigation }) => {
	const { userAPI } = useStateValue();
	const [user] = userAPI.user;
	const [isLoggedIn] = userAPI.isLoggedIn;
	return (
		<View
			style={{
				flexDirection: "row",
				height: 80,
				alignItems: "center",
				backgroundColor: "#ffffff",
				borderBottomWidth: 2,
				borderBottomColor: "#000000",
			}}>
			<View
				style={{
					flex: 1,
					flexDirection: "row",
					justifyContent: "space-between",
					paddingHorizontal: 10,
					paddingVertical: 10,
				}}>
				<View style={{ width: 25, height: 25 }}></View>

				<TouchableOpacity>
					<Text
						style={{
							lineHeight: 25,
							fontSize: 19,
							color: "#ff4593",
							fontWeight: "bold",
							...styles.fonts,
						}}>
						Home
					</Text>
					{isLoggedIn && (
						<Text
							style={{
								lineHeight: 15,
								fontSize: 13,
								color: "#8f8d8d",
								...styles.fonts,
							}}>
							{`${user?.building} ${user?.address}`.slice(0, 31)}
						</Text>
					)}
				</TouchableOpacity>

				<TouchableOpacity
					onPress={() => navigation.navigate("Basket")}
					style={{ alignSelf: "center" }}>
					<Image
						source={icons?.basket}
						style={{
							width: 33,
							height: 33,
							tintColor: "#ff4593",
						}}
					/>
				</TouchableOpacity>
			</View>
		</View>
	);
};

export default Header;

const styles = StyleSheet.create({
	fonts: {
		fontFamily: "Poppins-Regular",
	},
});
