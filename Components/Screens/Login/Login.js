import {
	StyleSheet,
	Text,
	View,
	Image,
	TextInput,
	TouchableOpacity,
	Alert,
	ActivityIndicator,
	Platform,
} from "react-native";
import React, { useState, useEffect } from "react";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import NetInfo from "@react-native-community/netinfo";

import { icons, axiosURL } from "../../../constants";
import { useStateValue } from "../../../hooks/StateProvider";
import IOSSafeAreaView from "../../../SafeArea/iOSSafeArea";
import AndroidSafeAreaView from "../../../SafeArea/AndroidSafeArea";

const Login = ({ navigation }) => {
	const state = useStateValue();
	const [language] = state.language;
	const [isLoggedIn, setIsLoggedIn] = state.userAPI.isLoggedIn;
	const [token, setToken] = state.token;

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [disabled, setDisabled] = useState(false);

	useEffect(() => {
		setDisabled(false);
	}, []);

	const handleSubmit = async () => {
		setDisabled(true);
		try {
			if (!email || !password) {
				Alert.alert("Please fill the form below");
				setDisabled(false);
				return;
			}
			await axios
				.post(`${axiosURL}/user/login`, {
					email: email,
					password: password,
				})
				.then((response) => {
					setToken(response?.data.accessToken);
					AsyncStorage.setItem("isLoggedIn", "true");
					AsyncStorage.setItem("refreshToken", response.data.accessToken);
				})
				.then(() => {
					setIsLoggedIn(true);
				})
				.then(() => {
					navigation.navigate("Home");
				})
				.catch((err) => {
					NetInfo.fetch().then((state) => {
						if (!state.isConnected) {
							Alert.alert("Please check your internet connection");
						}
					});
					setDisabled(false);
				});
		} catch (error) {
			Alert.alert(error.response.data.error);
			setIsLoggedIn(false);
			setDisabled(false);
		}
	};
	const Content = () => {
		return (
			<View style={styles.mainContainer}>
				{/* Header container  */}
				<View style={styles.header}>
					<TouchableOpacity
						onPress={() => navigation.goBack()}
						activeOpacity={0.7}
						hitSlop={{ bottom: 15, top: 15, right: 40, left: 20 }}>
						<Image source={icons?.arrowBack} style={styles.headerArrowBackImg} />
					</TouchableOpacity>
					<Text style={styles.headerLoginText}>{language === "en" ? "Login" : "Accesso"}</Text>
				</View>

				{/* Input fields container  */}
				<View style={styles.inputFieldsContainer}>
					<TextInput
						placeholder={language === "en" ? "Email" : "E-mail"}
						defaultValue={email}
						value={email}
						onChangeText={(txt) => {
							const val = txt.trim().toLowerCase();
							setEmail(val);
						}}
						style={{ ...styles.textInput }}
					/>
					<TextInput
						defaultValue={password}
						onChangeText={setPassword}
						secureTextEntry={true}
						placeholder="Password"
						style={{ ...styles.textInput, marginTop: 20 }}
					/>
				</View>

				{/* Login button  */}

				<View style={styles.loginButtonContainer}>
					<TouchableOpacity
						onPress={handleSubmit}
						disabled={disabled}
						activeOpacity={0.7}
						hitSlop={{ bottom: 5, top: 5 }}
						style={{
							backgroundColor: disabled ? "#e33b81" : "#ff4593",
							...styles.loginButton,
						}}>
						<Text style={styles.loginButtonText}>{language === "en" ? "Login" : "Accesso"}</Text>

						<ActivityIndicator
							size={"large"}
							color="dodgerblue"
							animating={disabled}
							style={{
								position: "absolute",
								right: 15,
								top: 5,
							}}
						/>
					</TouchableOpacity>
				</View>

				{/* create account offer line  */}
				<View>
					<Text style={{ ...styles.fonts, textAlign: "center" }}>
						{language === "en" ? "Not already a member" : "Non sei già un membro"}{" "}
						<Text style={styles.createOfferLineText} onPress={() => navigation.navigate("Register")}>
							{language === "en" ? "click here" : "clicca qui"}
						</Text>
					</Text>
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

export default Login;

const styles = StyleSheet.create({
	mainContainer: {
		flex: 1,
		backgroundColor: "#ffffff",
	},
	header: {
		flexDirection: "row",
		marginTop: 10,
		paddingHorizontal: 10,
		alignItems: "center",
	},

	headerArrowBackImg: { width: 30, height: 30 },
	headerLoginText: {
		fontSize: 20,
		fontFamily: "Poppins-Regular",
		marginLeft: 50,
	},

	inputFieldsContainer: {
		paddingVertical: 30,
		height: "50%",
		justifyContent: "flex-end",
	},

	textInput: {
		paddingVertical: 10,
		paddingHorizontal: 20,
		marginHorizontal: 15,
		fontSize: 17,
		borderRadius: 50,
		borderWidth: 2,
		borderColor: "#bbbbbb50",
	},

	loginButtonContainer: {
		paddingVertical: 30,
		paddingHorizontal: 20,
		alignItems: "flex-end",
	},

	loginButton: { width: "100%", borderRadius: 50, paddingVertical: 10 },

	loginButtonText: {
		fontSize: 20,
		color: "white",
		textAlign: "center",
		fontFamily: "Poppins-Regular",
		lineHeight: 25,
	},

	createOfferLineText: {
		textDecorationLine: "underline",
		color: "blue",
	},
	fonts: {
		fontFamily: "Poppins-Regular",
	},
});
