import {
	StyleSheet,
	Text,
	View,
	Image,
	TouchableOpacity,
	TextInput,
	ScrollView,
	Alert,
} from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { icons } from "../../../constants";
import { useStateValue } from "../../../hooks/StateProvider";

const Register = ({ navigation }) => {
	const state = useStateValue();
	const [language] = state.language;
	const [firstName, setFirstName] = state.userAPI.firstName;
	const [lastName, setLastName] = state.userAPI.lastName;
	const [email, setEmail] = state.userAPI.email;

	const handleNext = () => {
		if (firstName && lastName && email) {
			navigation.navigate("RegisterPassword");
		} else if (!firstName || !lastName || !email) {
			Alert.alert("Please fill the form first");
		}
	};

	return (
		<View style={{ backgroundColor: "#fa5a9d" }}>
			<SafeAreaView
				style={{
					height: "100%",
					justifyContent: "space-between",
				}}>
				<ScrollView
					contentContainerStyle={{
						flex: 1,
						justifyContent: "space-between",
					}}>
					<View style={[styles.styleContainer, { height: "70%" }]}>
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
								{language === "en" ? "Sign up" : "Registrati"}
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
								? "Register Form"
								: "Modulo di registrazione"}
						</Text>

						<Text
							style={{
								color: "#ccc",
								textAlign: "center",
								fontSize: 16,
								...styles.fonts,
							}}>
							{language === "en"
								? "Fill up the form below"
								: "Compila il modulo sottostante"}
						</Text>

						<View
							style={{
								flex: 1,
							}}>
							<ScrollView
								// persistentScrollbar={true}
								// nestedScrollEnabled={true}
								// overScrollMode="always"
								// keyboardDismissMode="none"
								contentContainerStyle={{
									flex: 1,
									justifyContent: "center",
								}}>
								<TextInput
									placeholder={
										language === "en"
											? "First Name"
											: "Nome di battesimo"
									}
									defaultValue={firstName}
									onChangeText={(txt) => {
										const val = txt.trim();
										setFirstName(val);
									}}
									style={{ ...styles.textInput }}
								/>
								<TextInput
									placeholder={
										language === "en" ? "Last Name" : "Cognome"
									}
									defaultValue={lastName}
									onChangeText={(txt) => {
										const val = txt.trim();
										setLastName(val);
									}}
									style={{ ...styles.textInput }}
								/>
								<TextInput
									placeholder="Email"
									defaultValue={email}
									onChangeText={(txt) => {
										const val = txt.trim().toLowerCase();
										setEmail(val);
									}}
									style={{ ...styles.textInput }}
								/>
							</ScrollView>
						</View>
					</View>

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
								style={{ width: 40, height: 30, tintColor: "#ff4593" }}
							/>
						</TouchableOpacity>
					</View>
				</ScrollView>
			</SafeAreaView>
		</View>
	);
};

export default Register;

const styles = StyleSheet.create({
	styleContainer: {
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
