import {
	StyleSheet,
	Text,
	View,
	ScrollView,
	TouchableOpacity,
	Image,
	Alert,
} from "react-native";
import React from "react";
import axios from "axios";
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import NetInfo from "@react-native-community/netinfo";

import { icons, images, axiosURL } from "../../../../constants";
import { useStateValue } from "../../../../hooks/StateProvider";

const AccountDetails = ({ navigation }) => {
	const { userAPI } = useStateValue();
	const state = useStateValue();
	const [language, setLanguage] = state.language;
	const [isLoggedIn, setIsLoggedIn] = userAPI.isLoggedIn;
	const [user, setUser] = userAPI.user;
	// const [checkUserCallback, setCheckUserCallback] = userAPI.checkUserCallback;
	const [postalCode, setPostalCode] = userAPI.postalCode;

	const handleLogout = async () => {
		try {
			await axios
				.get(`${axiosURL}/user/logout`)
				.then(() => setIsLoggedIn(false))
				.then(() => setPostalCode(null))
				.then(async () => {
					await AsyncStorage.removeItem("isLoggedIn");
					await AsyncStorage.removeItem("refreshToken");
					setUser(null);
					navigation.navigate("Home");
				})
				.catch((err) => {
					NetInfo.fetch().then((state) => {
						if (!state.isConnected) {
							Alert.alert("Please check your internet connection");
						}
					});
				});
		} catch (error) {
			Alert.alert(error.response.data.error);
		}
	};

	return (
		<View style={{ backgroundColor: "#f7f7f7", flex: 1 }}>
			<SafeAreaView>
				<ScrollView>
					{/* Header Section Profile  */}
					<View style={{ ...styles.profileContainer }}>
						<Image
							source={images.avatar_5}
							style={{ ...styles.profileImage }}
						/>

						<Text
							style={{
								...styles.profileName,
							}}>{`${user?.firstName} ${user?.lastName}`}</Text>
						<Text style={{ ...styles.profileEmail }}>{user?.email}</Text>

						{/* edit profile button  */}

						<TouchableOpacity
							onPress={() => navigation.navigate("Profile")}
							style={{
								marginVertical: 10,
								paddingHorizontal: 30,
								paddingVertical: 10,
								backgroundColor: "#ff4593",
								borderRadius: 40,
							}}>
							<Text
								style={{
									color: "white",
									fontSize: 15,
									lineHeight: 20,
									...styles.fonts,
								}}>
								{language === "en"
									? "Edit Profile"
									: "Modifica Profilo"}
							</Text>
						</TouchableOpacity>
					</View>

					{/* Settings Section  */}
					<View style={styles.settingsMainSection}>
						<Text style={styles.settingsSectionTitle}>
							{language === "en" ? "Content" : "Contenuto"}
						</Text>
						{/* Settings Section's Container  */}
						<View style={{ ...styles.settingsSectionContainer }}>
							{/* Setting div  */}
							<TouchableOpacity
								style={{ ...styles.settingsSectionDiv }}
								onPress={() => navigation.navigate("Favorite1")}>
								<View style={{ ...styles.settingsDivC1 }}>
									<Image
										source={icons.favorite}
										style={styles.settingsDivImg}
									/>

									<Text style={styles.settingsDivText}>
										{language === "en" ? "Favourites" : "Preferite"}
									</Text>
								</View>
								<Image
									source={icons.openRight}
									style={styles.settingsDivC2Img}
								/>
							</TouchableOpacity>

							{/* Setting div 2 */}
							<TouchableOpacity
								style={{ ...styles.settingsSectionDiv }}
								onPress={() => navigation.navigate("Orders1")}>
								<View style={{ ...styles.settingsDivC1 }}>
									<Image
										source={icons.orders}
										style={styles.settingsDivImg}
									/>

									<Text style={styles.settingsDivText}>
										{language === "en" ? "Orders" : "Ordini"}
									</Text>
								</View>
								<Image
									source={icons.openRight}
									style={styles.settingsDivC2Img}
								/>
							</TouchableOpacity>

							{/* Setting div 3 */}
							{/* <TouchableOpacity
								style={{ ...styles.settingsSectionDiv }}
								onPress={() => navigation.navigate("About")}>
								<View style={{ ...styles.settingsDivC1 }}>
									<Image
										source={icons.about}
										style={styles.settingsDivImg}
									/>

									<Text style={styles.settingsDivText}>About</Text>
								</View>
								<Image
									source={icons.openRight}
									style={styles.settingsDivC2Img}
								/>
							</TouchableOpacity> */}

							{/* Setting div 4 */}
							<TouchableOpacity
								style={{ ...styles.settingsSectionDiv }}
								onPress={() => {
									if (language === "en") setLanguage("it");
									else if (language === "it") setLanguage("en");
								}}>
								<View style={{ ...styles.settingsDivC1 }}>
									<Image
										source={icons.language}
										style={styles.settingsDivImg}
									/>

									<Text style={styles.settingsDivText}>
										{language === "en" ? "Language" : "Linguaggio"}
									</Text>
									<Text
										style={{
											...styles.settingsDivText,
											color: "red",
										}}>
										{language === "en" ? `"English"` : `"Italian"`}
									</Text>
								</View>
								{/* <Image
									source={icons.openRight}
									style={styles.settingsDivC2Img}
								/> */}
							</TouchableOpacity>
						</View>
					</View>

					{/* Logout Section */}

					<View style={styles.settingsMainSection}>
						<Text style={styles.settingsSectionTitle}>
							{language === "en" ? "Logout" : "Disconnettersi"}
						</Text>
						<View style={styles.settingsSectionContainer}>
							{/* Logout div  */}
							<TouchableOpacity
								onPress={handleLogout}
								style={{
									...styles.settingsSectionDiv,
									paddingVertical: 15,
								}}>
								<View style={{ ...styles.settingsDivC1 }}>
									<Image
										source={icons.logout}
										style={styles.settingsDivImg}
									/>

									<Text style={styles.settingsDivText}>
										{language === "en" ? "Logout" : "Disconnettersi"}
									</Text>
								</View>
							</TouchableOpacity>
						</View>
					</View>

					<View style={{ height: 100 }} />
				</ScrollView>
			</SafeAreaView>
		</View>
	);
};

export default React.memo(AccountDetails);

const styles = StyleSheet.create({
	// ProfileSection
	profileContainer: {
		alignItems: "center",
		paddingVertical: 25,
		backgroundColor: "#fff",
		marginHorizontal: 10,
	},

	profileImage: {
		width: 80,
		height: 80,
		borderRadius: 40,
		backgroundColor: "white",
	},

	profileName: {
		fontSize: 25,
		lineHeight: 30,
		fontFamily: "Poppins-Regular",
		marginTop: 20,
	},

	profileEmail: {
		lineHeight: 25,
		fontFamily: "Poppins-Regular",
		color: "#aaa",
	},

	// Settings Section

	settingsMainSection: {
		marginHorizontal: 10,
		paddingVertical: 10,
		marginVertical: 30,
	},

	settingsSectionTitle: {
		fontSize: 25,
		fontFamily: "Poppins-Regular",
		marginBottom: 20,
	},

	settingsSectionContainer: {
		backgroundColor: "white",
	},

	settingsSectionDiv: {
		paddingVertical: 8,
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		paddingHorizontal: 10,
	},

	settingsDivC1: {
		flexDirection: "row",
		alignItems: "center",
	},
	settingsDivImg: {
		width: 29,
		height: 29,
	},
	settingsDivText: {
		marginLeft: 30,
		fontSize: 17,
		fontFamily: "Poppins-Regular",
	},

	settingsDivC2Img: {
		width: 21,
		height: 21,
	},
	fonts: {
		fontFamily: "Poppins-Regular",
	},
});
