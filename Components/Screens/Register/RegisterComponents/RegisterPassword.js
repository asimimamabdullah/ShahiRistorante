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
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";

import { icons } from "../../../../constants";
import { useStateValue } from "../../../../hooks/StateProvider";

const RegisterPassword = ({ navigation }) => {
	const state = useStateValue();
	const [language] = state.language;

	const [password, setPassword] = state.userAPI.password;
	const [confirmPassword, setConfirmPassword] = state.userAPI.confirmPassword;

	const handleNext = () => {
		if (password && confirmPassword) {
			if (password === confirmPassword) {
				navigation.navigate("RegisterAddress");
			} else if (password !== confirmPassword) {
				Alert.alert("Passwords does not match");
			}
		} else if (!password || !confirmPassword) {
			Alert.alert("Please fill the fields");
		}
	};
	return (
		<View style={{ backgroundColor: "#fa5a9d" }}>
			<SafeAreaView
				style={{ height: "100%", justifyContent: "space-between" }}>
				{/* Styled container  */}
				<View style={[styles.styleContainer, { height: "70%" }]}>
					{/* header div  */}
					<View style={styles.headerDiv}>
						<TouchableOpacity onPress={() => navigation.goBack()}>
							<Image
								source={icons.arrowBack}
								style={{ width: 35, height: 35 }}
							/>
						</TouchableOpacity>
						<Text
							style={{
								...styles.headerText,
							}}>
							Sign up
						</Text>
					</View>
					<Text
						style={{
							textAlign: "center",
							fontSize: 28,
							marginTop: 40,
							...styles.fonts,
						}}>
						{language === "en"
							? "Set up password"
							: "Impostare la password"}
					</Text>

					<Text
						style={{
							color: "#ccc",
							textAlign: "center",
							fontSize: 16,
							...styles.fonts,
						}}>
						{language === "en"
							? "Create Your Password"
							: "Crea la tua password"}
					</Text>

					<View
						style={{
							flex: 1,
						}}>
						<ScrollView
							contentContainerStyle={{
								flex: 1,
								justifyContent: "center",
							}}>
							<TextInput
								placeholder="Enter Password"
								defaultValue={password}
								onChangeText={setPassword}
								secureTextEntry={true}
								style={{
									...styles.textInput,
								}}
							/>
							<TextInput
								placeholder="Confirm Password"
								defaultValue={confirmPassword}
								onChangeText={setConfirmPassword}
								secureTextEntry={true}
								style={{
									...styles.textInput,
								}}
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
							minWidth: "45%",
							flexDirection: "row",
							justifyContent: "space-between",
						}}
						onPress={handleNext}>
						<Text
							style={{
								lineHeight: 30,
								fontSize: 23,
								color: "black",
								...styles.fonts,
							}}>
							{language === "en" ? "Next" : "Seguente"}
						</Text>

						<Image
							source={icons.arrowForward}
							style={{ width: 35, height: 35, tintColor: "#ff4593" }}
						/>
					</TouchableOpacity>
				</View>
			</SafeAreaView>
		</View>
	);
};

export default RegisterPassword;

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
		marginVertical: 10,
		fontFamily: "Poppins-Regular",
	},
	fonts: {
		fontFamily: "Poppins-Regular",
	},
});
