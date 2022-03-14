import {
	StyleSheet,
	Text,
	View,
	Image,
	TextInput,
	TouchableOpacity,
	Alert,
	ActivityIndicator,
} from "react-native";
import React, { useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { icons, axiosURL } from "../../../constants";
import { useStateValue } from "../../../hooks/StateProvider";

const Login = ({ navigation }) => {
	const state = useStateValue();
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
				})
				.then(() => {
					setIsLoggedIn(true);
				})
				.then(() => {
					navigation.navigate("Home");
				});
		} catch (error) {
			Alert.alert(error.response.data.error);
			setIsLoggedIn(false);
			setDisabled(false);
		}
	};

	return (
		<View style={{ flex: 1, backgroundColor: "#ffffff" }}>
			<SafeAreaView style={{ flex: 1 }}>
				{/* Header container  */}
				<View
					style={{
						flexDirection: "row",
						marginTop: 30,
						paddingHorizontal: 10,
						alignItems: "center",
					}}>
					<TouchableOpacity onPress={() => navigation.goBack()}>
						<Image
							source={icons?.arrowBack}
							style={{ width: 35, height: 35 }}
						/>
					</TouchableOpacity>
					<Text style={{ fontSize: 30, ...styles.fonts, marginLeft: 50 }}>
						Login
					</Text>
				</View>

				{/* Input fields container  */}
				<View style={styles.inputFieldsContainer}>
					<TextInput
						placeholder="Email"
						defaultValue={email}
						onChangeText={setEmail}
						style={{ ...styles.textInput }}
					/>
					<TextInput
						defaultValue={password}
						onChangeText={setPassword}
						secureTextEntry={true}
						placeholder="Password"
						style={{ ...styles.textInput, marginTop: 20 }}
					/>

					{/* forgot password offer line  */}

					<View
						style={{
							paddingHorizontal: 30,
							paddingTop: 10,
						}}>
						<Text style={{ ...styles.fonts, textAlign: "right" }}>
							Forgot Password{" "}
							<Text
								style={{
									textDecorationLine: "underline",
									color: "blue",
								}}
								onPress={() => navigation.navigate("Home")}>
								here
							</Text>
						</Text>
					</View>
				</View>

				{/* Login button  */}

				<View
					style={{
						paddingVertical: 30,
						paddingHorizontal: 20,
						alignItems: "flex-end",
					}}>
					<TouchableOpacity
						onPress={handleSubmit}
						disabled={disabled}
						style={{
							backgroundColor: disabled ? "#e33b81" : "#ff4593",
							width: "100%",
							borderRadius: 50,
							paddingVertical: 10,
						}}>
						<Text
							style={{
								fontSize: 20,
								color: "white",
								textAlign: "center",
								...styles.fonts,
								lineHeight: 25,
							}}>
							Login
						</Text>

						<ActivityIndicator
							size={"large"}
							color="dodgerblue"
							animating={disabled}
							style={{
								position: "absolute",
								right: 15,
								// alignSelf: "center",
								top: 5,
							}}
						/>
					</TouchableOpacity>
				</View>

				{/* create account offer line  */}
				<View>
					<Text style={{ ...styles.fonts, textAlign: "center" }}>
						Or create an account{" "}
						<Text
							style={{
								textDecorationLine: "underline",
								color: "blue",
							}}
							onPress={() => navigation.navigate("Register")}>
							here
						</Text>
					</Text>
				</View>
			</SafeAreaView>
		</View>
	);
};

export default Login;

const styles = StyleSheet.create({
	inputFieldsContainer: {
		paddingVertical: 30,
		height: "50%",
		justifyContent: "flex-end",
	},
	textInput: {
		paddingVertical: 13,
		paddingHorizontal: 20,
		marginHorizontal: 15,
		fontSize: 17,
		borderRadius: 50,
		borderWidth: 2,
		borderColor: "#bbbbbb50",
	},

	fonts: {
		fontFamily: "Poppins-Regular",
	},
});
