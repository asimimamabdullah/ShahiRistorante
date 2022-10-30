import { StyleSheet, Text, View, TouchableOpacity, Image, Platform } from "react-native";
import React, { memo } from "react";
import { icons } from "../../../../constants";
import { useStateValue } from "../../../../hooks/StateProvider";
import AndroidSafeAreaView from "../../../../SafeArea/AndroidSafeArea";
import IOSSafeAreaView from "../../../../SafeArea/iOSSafeArea";

const AskAccount = ({ navigation }) => {
	const state = useStateValue();
	const [language] = state.language;
	const Content = () => {
		return (
			<View style={styles.mainContainer}>
				{/* Header login section  */}
				<View style={styles.headerContainer}>
					<Text style={styles.headerContainerText}>
						{language === "en" ? "Already a customer?" : "già cliente?"}
					</Text>

					<TouchableOpacity
						activeOpacity={0.7}
						hitSlop={{ bottom: 10, top: 10, left: 10, right: 10 }}
						style={styles.headerContainerLoginButton}
						onPress={() => navigation.navigate("Login")}>
						<Text style={styles.headerContainerLoginButtonText}>{language === "en" ? "Login" : "Accesso"}</Text>
					</TouchableOpacity>
				</View>

				{/* Logo and animation section  */}

				<View style={styles.animationLogoContainer}>
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

				{/* AskAccount Screen Text Main */}

				<View style={styles.mainScreenTextContainer}>
					<Text style={styles.mainScreenTextContainerText1}>
						{language === "en" ? "Let's get started" : "Iniziamo"}!
					</Text>

					<Text style={styles.mainScreenTextContainerText2}>
						{language === "en" ? "Everything works better together" : "Tutto funziona meglio insieme"}
					</Text>
				</View>

				{/* Register button  */}

				<View style={styles.registerButtonContainer}>
					<TouchableOpacity
						style={styles.registerButtonContainerButton}
						onPress={() => navigation.navigate("Register")}>
						<Text style={styles.registerButtonText}>{language === "en" ? "Register" : "Registrati"}</Text>
						{/* </LinearGradient> */}
					</TouchableOpacity>
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

export default memo(AskAccount);

const styles = StyleSheet.create({
	mainContainer: {
		backgroundColor: "#fff",
		flex: 1,
	},

	headerContainer: {
		zIndex: 1,
		marginTop: 15,
		paddingHorizontal: 15,
		flexDirection: "row",
		justifyContent: "space-between",
	},

	headerContainerText: {
		fontFamily: "Poppins-Regular",
		paddingVertical: 10,
	},

	headerContainerLoginButton: {
		backgroundColor: "transparent",
		paddingHorizontal: 20,
		borderRadius: 60,
		backgroundColor: "#ff4593",
		justifyContent: "center",
	},

	headerContainerLoginButtonText: {
		fontFamily: "Poppins-Regular",
		color: "#fff",
	},

	// logo and animation section
	animationLogoContainer: {
		width: "100%",
		backgroundColor: "#f7f7f7",
		position: "absolute",
		top: 0,
		height: "60%",
		borderBottomLeftRadius: 230,
		justifyContent: "center",
		alignItems: "center",
	},

	// askaccount text main
	mainScreenTextContainer: {
		position: "absolute",
		top: "60%",
		marginTop: 30,
	},

	mainScreenTextContainerText1: {
		fontSize: 41,
		lineHeight: 50,
		paddingHorizontal: 20,
		fontFamily: "Poppins-Regular",
	},
	mainScreenTextContainerText2: {
		paddingHorizontal: 20,
		marginTop: 30,
		color: "#bbb",
		fontFamily: "Poppins-Regular",
	},

	registerButtonContainer: {
		position: "absolute",
		bottom: 7,
		width: "100%",
	},

	registerButtonContainerButton: {
		backgroundColor: "#ff4593",
		marginHorizontal: 20,
		paddingVertical: 13,
		borderRadius: 40,
	},

	registerButtonText: { color: "white", textAlign: "center", fontSize: 18 },
	// container: {
	// 	flex: 1,
	// 	flexDirection: "column",
	// 	justifyContent: "center",
	// },
	// fonts: {
	// 	fontFamily: "Poppins-Regular",
	// },
	// button: {
	// 	padding: 20,
	// 	margin: 30,
	// 	backgroundColor: "dodgerblue",
	// 	borderRadius: 15,
	// },
	// buttonText: {
	// 	color: "white",
	// 	fontSize: 18,
	// 	lineHeight: 20,
	// },
});
