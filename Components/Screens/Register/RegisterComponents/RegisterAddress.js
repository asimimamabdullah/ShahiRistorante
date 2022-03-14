import {
	StyleSheet,
	Text,
	View,
	TouchableOpacity,
	Image,
	ScrollView,
	TextInput,
	Alert,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { icons, axiosURL } from "../../../../constants";
import { useStateValue } from "../../../../hooks/StateProvider";

const RegisterAddress = ({ navigation }) => {
	const state = useStateValue();
	const [token, setToken] = state.token;
	const { userAPI } = useStateValue();
	const [address, setAddress] = userAPI.address;
	const [building, setBuilding] = userAPI.building;
	const [phone, setPhone] = userAPI.phone;
	const [postalCode, setPostalCode] = useState("");
	const [postalResult, setPostalResult] = useState(null);
	const [firstName] = userAPI.firstName;
	const [lastName] = userAPI.lastName;
	const [email] = userAPI.email;
	const [password] = userAPI.password;

	const handleCheckPostalCode = async () => {
		if (postalCode) {
			try {
				await axios
					.get(`${axiosURL}/dashboard/onepostalcode/${postalCode}`)
					.then((response) => {
						setPostalResult(response.data.code);
					});
			} catch (error) {
				Alert.alert(
					error.response.data.error + ". Please Enter another postal code",
				);
				setPostalResult(null);
				setPostalCode(null);
			}
		}
	};

	const handleRegister = async () => {
		try {
			if (address && building && phone && postalCode) {
				await axios
					.post(`${axiosURL}/user/register`, {
						firstName,
						lastName,
						email,
						password,
						postalCode,
						phone,
						building,
						address,
					})
					.then((response) => {
						navigation.navigate("Home");
						setToken(response.data.accessToken);
						AsyncStorage.setItem("isLoggedIn", "true");
					});
			}
		} catch (error) {
			if (error.response.data.error === "Duplicate Field Value Entered") {
				Alert.alert("Please provide a valid email address");
			} else {
				setAddress(null);
				setBuilding(null);
				setPhone(null);
				Alert.alert(error.response.data.error);
			}
		}
	};

	return (
		<View style={{ backgroundColor: "#fa5a9d" }}>
			<SafeAreaView
				style={{ height: "100%", justifyContent: "space-between" }}>
				{/* Styled container  */}
				<View style={{ ...styles.styleContainer, height: "70%" }}>
					{/* header div  */}
					<View style={{ ...styles.headerDiv }}>
						<TouchableOpacity onPress={() => navigation.goBack()}>
							<Image
								source={icons.arrowBack}
								style={{ width: 35, height: 35 }}
							/>
						</TouchableOpacity>
						<Text style={{ ...styles.headerText }}>Sign up</Text>
					</View>
					<Text
						style={{
							textAlign: "center",
							fontSize: 28,
							marginTop: 40,
							...styles.fonts,
						}}>
						Address Info
					</Text>

					<Text
						style={{
							color: "#ccc",
							textAlign: "center",
							fontSize: 16,
							paddingHorizontal: 30,
							...styles.fonts,
						}}>
						Enter Your Complete Address Information
					</Text>

					<View
						style={{
							flex: 1,
						}}>
						<ScrollView
							contentContainerStyle={{ justifyContent: "center" }}>
							<Text
								style={{
									...styles.fonts,
									fontSize: 11,
									marginLeft: 10,
								}}>
								Check Postal Code: *
							</Text>
							<TextInput
								placeholder="Postal Code (required), e.g. 52250"
								defaultValue={postalCode}
								onEndEditing={handleCheckPostalCode}
								onChangeText={setPostalCode}
								style={{ ...styles.textInput }}
							/>
							<Text
								style={{
									...styles.fonts,
									fontSize: 11,
									marginLeft: 10,
								}}>
								Enter Address *
							</Text>
							<TextInput
								placeholder="Enter Address"
								defaultValue={address}
								onChangeText={setAddress}
								style={{ ...styles.textInput }}
								textContentType="streetAddressLine2"
							/>
							<Text
								style={{
									...styles.fonts,
									fontSize: 11,
									marginLeft: 10,
								}}>
								Enter Building Address *
							</Text>
							<TextInput
								placeholder="Adress Line 1"
								defaultValue={building}
								onChangeText={setBuilding}
								style={{ ...styles.textInput }}
								textContentType="streetAddressLine2"
							/>
							<Text
								style={{
									...styles.fonts,
									fontSize: 11,
									marginLeft: 10,
								}}>
								Enter Phone No.*
							</Text>
							<TextInput
								placeholder="Phone No."
								defaultValue={phone}
								onChangeText={setPhone}
								style={{ ...styles.textInput }}
								textContentType="telephoneNumber"
							/>
						</ScrollView>
					</View>
				</View>

				{/* Button  */}

				<View
					style={{
						marginBottom: 50,
						marginHorizontal: 10,
						alignItems: "flex-end",
					}}>
					<TouchableOpacity
						style={{
							paddingVertical: 10,
							paddingHorizontal: 20,
							backgroundColor: "white",
							width: "45%",
							flexDirection: "row",
							justifyContent: "space-between",
						}}
						onPress={handleRegister}>
						<Text
							style={{
								lineHeight: 30,
								fontSize: 25,
								color: "black",
								...styles.fonts,
							}}>
							Sign up
						</Text>

						<Image
							source={icons.arrowForward}
							style={{ width: 40, height: 30, tintColor: "#ff4593" }}
						/>
					</TouchableOpacity>
				</View>
			</SafeAreaView>
		</View>
	);
};

export default RegisterAddress;

const styles = StyleSheet.create({
	styleContainer: {
		height: "100%",
		minHeight: 450,
		backgroundColor: "#f7f7f7",
		marginVertical: 5,
		marginHorizontal: 10,
		borderRadius: 20,
		padding: 10,
	},

	headerDiv: {
		marginTop: 20,
		flexDirection: "row",
		alignItems: "center",
	},

	headerText: {
		fontSize: 25,
		fontFamily: "Poppins-Regular",
		marginLeft: 70,
		alignSelf: "center",
		textAlign: "center",
	},

	textInput: {
		fontSize: 15,
		borderWidth: 2,
		borderColor: "#dddddd50",
		lineHeight: 40,
		paddingHorizontal: 20,
		paddingVertical: 10,
		borderRadius: 20,
		marginVertical: 5,
		fontFamily: "Poppins-Regular",
	},
	fonts: {
		fontFamily: "Poppins-Regular",
	},
});
