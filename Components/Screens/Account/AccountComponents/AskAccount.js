import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import React, { memo } from "react";
import { icons } from "../../../../constants";
import { useStateValue } from "../../../../hooks/StateProvider";

const AskAccount = ({ navigation }) => {
	const state = useStateValue();
	const [language] = state.language;
	return (
		<View style={{ backgroundColor: "#fff", height: "100%" }}>
			{/* Header login section  */}
			<View
				style={{
					zIndex: 1,
					marginTop: 45,
					paddingHorizontal: 15,
					flexDirection: "row",
					justifyContent: "space-between",
				}}>
				<Text style={{ ...styles.fonts, paddingVertical: 10 }}>
					{language === "en" ? "Already a customer?" : "già cliente?"}
				</Text>

				<TouchableOpacity
					style={{
						backgroundColor: "transparent",
						paddingHorizontal: 20,
						// paddingVertical: 7,
						borderRadius: 60,
						backgroundColor: "#ff4593",

						...styles.fonts,
					}}
					onPress={() => navigation.navigate("Login")}>
					<Text
						style={{
							color: "#fff",
							textAlignVertical: "center",
							textAlign: "center",
							flex: 1,
						}}>
						{language === "en" ? "Login" : "Accesso"}
					</Text>
				</TouchableOpacity>
			</View>

			{/* Logo and animation section  */}

			<View
				style={{
					width: "100%",
					backgroundColor: "#f7f7f7",
					position: "absolute",
					top: 0,
					height: "60%",
					borderBottomLeftRadius: 230,
					justifyContent: "center",
					alignItems: "center",
				}}>
				<View
					style={{
						padding: 30,
						borderWidth: 2,
						borderRadius: 100,
						borderColor: "#f772ab",
					}}>
					<Image
						source={icons.cutlery}
						style={{ height: 110, width: 110, tintColor: "#ff4593" }}
						resizeMode="contain"
					/>
					<Image
						source={icons.like}
						style={{
							height: 30,
							width: 30,
							position: "absolute",
							right: -35,
							top: "50%",
							tintColor: "#f772ab",
						}}
					/>
					<Image
						source={icons.like}
						style={{
							height: 40,
							width: 40,
							position: "absolute",
							right: -70,
							top: "80%",
							tintColor: "#f772ab",
						}}
					/>
					<Image
						source={icons.like}
						style={{
							height: 30,
							width: 30,
							position: "absolute",
							top: -15,
							tintColor: "#f772ab",
						}}
					/>
					<Image
						source={icons.like}
						style={{
							height: 25,
							width: 25,
							position: "absolute",
							left: -35,
							top: "50%",
							tintColor: "#f772ab",
						}}
					/>

					<Image
						source={icons.like}
						style={{
							height: 40,
							width: 40,
							position: "absolute",
							left: -45,
							top: "80%",
							tintColor: "#f772ab",
						}}
					/>

					<Image
						source={icons.like}
						style={{
							height: 30,
							width: 30,
							position: "absolute",
							bottom: -35,
							left: "40%",
							tintColor: "#f772ab",
						}}
					/>
				</View>
			</View>

			<View
				style={{
					position: "absolute",
					top: "60%",
					marginTop: 30,
				}}>
				<Text
					style={{
						fontSize: 41,
						lineHeight: 50,
						paddingHorizontal: 20,
						...styles.fonts,
					}}>
					{language === "en" ? "Let's get started" : "Iniziamo"}!
				</Text>

				<Text
					style={{
						paddingHorizontal: 20,
						marginTop: 30,
						color: "#bbb",
						...styles.fonts,
					}}>
					{language === "en"
						? "Everything works better together"
						: "Tutto funziona meglio insieme"}
				</Text>
			</View>

			{/* Register button  */}

			<View
				style={{
					position: "absolute",
					bottom: 0,
					paddingVertical: 10,
					width: "100%",
				}}>
				<TouchableOpacity
					style={{
						backgroundColor: "#ff4593",
						marginHorizontal: 20,
						paddingVertical: 13,
						borderRadius: 40,
					}}
					onPress={() => navigation.navigate("Register")}>
					<Text
						style={[
							styles.text,
							{ color: "white", textAlign: "center", fontSize: 18 },
						]}>
						{language === "en" ? "Register" : "Registrati"}
					</Text>
					{/* </LinearGradient> */}
				</TouchableOpacity>
			</View>
		</View>
	);
};

export default memo(AskAccount);

const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: "column",
		justifyContent: "center",
	},
	fonts: {
		fontFamily: "Poppins-Regular",
	},
	button: {
		padding: 20,
		margin: 30,
		backgroundColor: "dodgerblue",
		borderRadius: 15,
	},
	buttonText: {
		color: "white",
		fontSize: 18,
		lineHeight: 20,
	},
});
