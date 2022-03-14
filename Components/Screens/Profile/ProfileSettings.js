import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import React from "react";
import { icons } from "./../../../constants";
import { useStateValue } from "../../../hooks/StateProvider";

const ProfileSettings = () => {
	const { userAPI } = useStateValue();
	const [user] = userAPI.user;
	return (
		<View>
			<Text
				style={{
					...styles.fontsBold,
					fontSize: 18,
					marginVertical: 30,
					marginLeft: 10,
				}}>
				Profile Settings
			</Text>

			{/* Name  */}
			<View style={{ ...styles.settingsDivContainer }}>
				<TouchableOpacity style={{ paddingHorizontal: 10 }}>
					<Image
						source={icons?.edit}
						style={{ ...styles.settingsDivImage }}
					/>
				</TouchableOpacity>

				<View style={{ marginTop: 10 }}>
					<Text style={{ ...styles.fonts, fontSize: 16 }}>Name:</Text>
					<Text style={{ alignSelf: "flex-end", ...styles.fonts }}>
						{`${user?.firstName} ${user?.lastName}`}
					</Text>
				</View>
			</View>

			{/* Email  */}
			<View style={{ ...styles.settingsDivContainer, marginTop: 10 }}>
				<TouchableOpacity style={{ paddingHorizontal: 10 }}>
					<Image
						source={icons?.edit}
						style={{ ...styles.settingsDivImage }}
					/>
				</TouchableOpacity>

				<View style={{ marginTop: 10 }}>
					<Text style={{ ...styles.fonts, fontSize: 16 }}>Email:</Text>
					<Text style={{ alignSelf: "flex-end", ...styles.fonts }}>
						{user?.email}
					</Text>
				</View>
			</View>

			{/* Address  */}
			<View style={{ ...styles.settingsDivContainer, marginTop: 10 }}>
				<TouchableOpacity style={{ paddingHorizontal: 10 }}>
					<Image
						source={icons?.edit}
						style={{ ...styles.settingsDivImage }}
					/>
				</TouchableOpacity>

				<View style={{ marginTop: 10 }}>
					<Text style={{ ...styles.fonts, fontSize: 16 }}>Address:</Text>
					<Text style={{ alignSelf: "flex-end", ...styles.fonts }}>
						{`${user?.building}, ${user?.address}`}
					</Text>
				</View>
			</View>

			{/* Postal Code  */}
			<View style={{ ...styles.settingsDivContainer, marginTop: 10 }}>
				<TouchableOpacity style={{ paddingHorizontal: 10 }}>
					<Image
						source={icons?.edit}
						style={{ ...styles.settingsDivImage }}
					/>
				</TouchableOpacity>

				<View style={{ marginTop: 10 }}>
					<Text style={{ ...styles.fonts, fontSize: 16 }}>
						Postal Code:
					</Text>
					<Text style={{ alignSelf: "flex-end", ...styles.fonts }}>
						{user?.postalCode}
					</Text>
				</View>
			</View>
		</View>
	);
};

export default ProfileSettings;

const styles = StyleSheet.create({
	settingsDivContainer: {
		marginHorizontal: 10,
		backgroundColor: "dodgerblue",
		paddingHorizontal: 20,
		paddingVertical: 10,
		backgroundColor: "#ffffff",
		elevation: 2,
	},

	settingsDivImage: {
		tintColor: "#ff4593",
		alignSelf: "flex-end",
		width: 25,
		height: 25,
	},

	fontsBold: { fontFamily: "Poppins-Bold" },
	fonts: { fontFamily: "Poppins-Regular" },
});
