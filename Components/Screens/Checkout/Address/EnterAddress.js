import {
	StyleSheet,
	Text,
	View,
	TextInput,
	TouchableOpacity,
	ScrollView,
} from "react-native";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useStateValue } from "../../../../hooks/StateProvider";
import { axiosURL } from "../../../../constants";

const EnterAddress = ({ navigation }) => {
	const { userAPI } = useStateValue();
	const [postalCode, setPostalCode] = userAPI.postalCode;
	const [user, setUser] = userAPI.user;
	const [addressData, setAddressData] = useState({});
	const [postalData, setPostalData] = userAPI.postalData;
	const [postal, setPostal] = useState("");
	const [error, setError] = useState("");

	useEffect(() => {
		setPostal(postalCode);
		setAddressData({
			address: user?.address,
			building: user?.building,
			noteToRider: user?.noteToRider,
			phone: user?.phone,
		});
	}, []);

	const handleUpdateInfo = async () => {
		setUser((prevData) => ({ ...prevData, ...addressData }));
		try {
			if (postal === postalCode) {
				setError(null);
				return navigation.goBack();
			} else {
				setPostalCode(postal);
				setError(null);
				// return;
				await axios
					.get(`${axiosURL}/dashboard/onepostalcode/${postal}`)
					.then((response) => {
						setPostalCode(postal);
						setPostalData(response.data.code);
					})
					.then(() => navigation.goBack());
			}
		} catch (error) {
			setError(error.response.data.error);
		}
	};

	return (
		<View style={{ paddingVertical: 20, flex: 1 }}>
			{error ? (
				<>
					<Text
						style={{
							marginVertical: 10,
							...styles.fonts,
							marginHorizontal: 15,
							color: "red",
						}}>
						Error: {error}
					</Text>

					<Text
						style={{
							...styles.fonts,
							color: "red",
							marginHorizontal: 20,
						}}>
						Please change the postal code and try again
					</Text>
				</>
			) : null}
			<ScrollView style={{ flex: 1 }}>
				{/* Address Field  */}
				<View style={{ ...styles.inputDiv }}>
					<Text style={{ ...styles.fonts, color: "#777" }}>Address:</Text>
					<TextInput
						defaultValue={addressData?.address}
						onChangeText={(txt) =>
							setAddressData((prevData) => ({
								...prevData,
								address: txt,
							}))
						}
						placeholder={"Enter Address"}
						style={{ ...styles.textInput }}
						placeholderTextColor="#aaa"
					/>
				</View>

				{/* Building Field  */}
				<View style={{ ...styles.inputDiv }}>
					<Text style={{ ...styles.fonts, color: "#777" }}>
						Building or floor no.
					</Text>
					<TextInput
						defaultValue={addressData?.building}
						placeholder="Building or floor no. etc."
						style={{ ...styles.textInput }}
						onChangeText={(txt) =>
							setAddressData((prevData) => ({
								...prevData,
								building: txt,
							}))
						}
						placeholderTextColor="#aaa"
					/>
				</View>

				{/* Phone number Field  */}
				<View style={{ ...styles.inputDiv }}>
					<Text style={{ ...styles.fonts, color: "#777" }}>Phone:</Text>
					<TextInput
						defaultValue={addressData?.phone}
						onChangeText={(txt) =>
							setAddressData((prevData) => ({
								...prevData,
								phone: txt,
							}))
						}
						placeholder={"Enter Phone Number"}
						style={{ ...styles.textInput }}
						placeholderTextColor="#aaa"
					/>
				</View>

				{/* Postal code  Field  */}
				<View style={{ ...styles.inputDiv }}>
					<Text style={{ ...styles.fonts, color: "#777" }}>
						Postal Code:
					</Text>
					<TextInput
						defaultValue={postal}
						placeholder="Postal Code"
						onChangeText={(apple) => setPostal(apple)}
						style={{ ...styles.textInput }}
						placeholderTextColor="#aaa"
					/>
				</View>

				{/* note to rider Field  */}
				<View style={{ ...styles.inputDiv }}>
					<Text style={{ ...styles.fonts, color: "#777" }}>
						Note to rider:
					</Text>
					<TextInput
						defaultValue={addressData?.noteToRider}
						placeholder="Enter a note to rider"
						style={{ ...styles.textInput }}
						onChangeText={(txt) =>
							setAddressData((prevData) => ({
								...prevData,
								noteToRider: txt,
							}))
						}
						placeholderTextColor="#aaa"
					/>
				</View>
			</ScrollView>

			<View style={{ ...styles.bottomCheckoutDiv }}>
				<TouchableOpacity
					style={{ ...styles.bottomCheckoutButton }}
					onPress={handleUpdateInfo}>
					<Text style={{ ...styles.bottomCheckoutButtonText }}>
						Save Address Info
					</Text>
				</TouchableOpacity>
			</View>
		</View>
	);
};

export default EnterAddress;

const styles = StyleSheet.create({
	inputDiv: {
		paddingHorizontal: 10,
		marginVertical: 10,
	},

	textInput: {
		backgroundColor: "#ffffff",
		paddingVertical: 12,
		paddingHorizontal: 10,
		color: "#333",
		fontFamily: "Poppins-Regular",
		letterSpacing: 0.6,
		borderRadius: 10,
		borderWidth: 1,
		borderColor: "#ddd",
	},

	bottomCheckoutDiv: {
		position: "absolute",
		bottom: 0,
		left: 0,
		right: 0,
		backgroundColor: "white",
		elevation: 2,
		paddingVertical: 5,
	},

	bottomCheckoutButton: {
		flexDirection: "row",
		backgroundColor: "#ff4593",
		borderRadius: 10,
		marginHorizontal: 10,
		elevation: 1,
		justifyContent: "center",
		paddingVertical: 15,
		paddingHorizontal: 10,
	},

	bottomCheckoutButtonText: {
		color: "white",
		lineHeight: 20,
		fontFamily: "Poppins-Bold",
	},
	fonts: {
		fontFamily: "Poppins-Regular",
	},
});
