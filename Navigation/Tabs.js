import {
	StyleSheet,
	Text,
	View,
	Image,
	Dimensions,
	TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
// import Svg, { Path } from "react-native-svg";

import Home from "../Components/Screens/Home";
import Favorite from "./Favorite";
import { icons } from "../constants";
import Account from "../Components/Screens/Account/Account";
import { useStateValue } from "../hooks/StateProvider";
import Orders from "../Components/Screens/Orders/Orders";

const Tab = createBottomTabNavigator();
const { width, height } = Dimensions.get("window");

// const TabBarCustomButton = ({ accessibilityState, children, onPress }) => {
// 	var isSelected = accessibilityState.selected;
//
// 	if (isSelected) {
// 		return (
// 			<View style={{ flex: 1, alignItems: "center", borderWidth: 0 }}>
// 				<View
// 					style={{
// 						flexDirection: "row",
// 						position: "absolute",
// 						top: 0,
// 						backgroundColor: "white",
// 					}}>
// 					<View style={{ flex: 1, backgroundColor: "black" }}></View>
// 					<Svg width={74} height={61} viewBox="0 0 74 61">
// 						<Path
// 							d="M75.2 0v61H0V0c4.1 0 7.4 3.1 7.9 7.1C10 21.7 22.5 33 37.7 33c15.2 0 27.7-11.3 29.7-25.9.5-4 3.9-7.1 7.9-7.1h-.1z"
// 							fill={"black"}
// 						/>
// 					</Svg>
// 					<View style={{ flex: 1, backgroundColor: "black" }}></View>
// 				</View>
// 				<TouchableOpacity
// 					style={{
// 						// top: -22.5,
// 						translateY: -22.5,
// 						justifyContent: "center",
// 						alignItems: "center",
// 						width: 50,
// 						height: 50,
// 						borderRadius: 25,
// 						backgroundColor: "black",
// 						borderWidth: 0,
// 					}}
// 					onPress={onPress}>
// 					{children}
// 				</TouchableOpacity>
// 			</View>
// 		);
// 	} else {
// 		return (
// 			<TouchableOpacity
// 				style={{ flex: 1, height: 68, backgroundColor: "black" }}
// 				activeOpacity={1}
// 				onPress={onPress}>
// 				{children}
// 			</TouchableOpacity>
// 		);
// 	}
// };

const Tabs = () => {
	const { userAPI } = useStateValue();
	const [isLoggedIn] = userAPI.isLoggedIn;
	return (
		<Tab.Navigator
			screenOptions={{
				headerShown: false,
				tabBarShowLabel: false,
				// tabBarButton: (props) => <TabBarCustomButton {...props} />,
				tabBarStyle: { ...styles.navigator },
			}}>
			<Tab.Screen
				name="Home"
				component={Home}
				options={{
					tabBarIcon: ({ focused }) => (
						<View
							style={{
								backgroundColor: focused ? "white" : "",
								padding: 10,
								borderRadius: 25,
								borderWidth: 0,
							}}>
							<Image
								source={icons?.cutlery}
								resizeMode="contain"
								style={{
									width: 30,
									height: 30,
									tintColor: focused ? "#fa257e" : "white",
								}}
							/>
						</View>
					),
				}}
			/>
			<Tab.Screen
				name="Orders"
				component={Orders}
				options={{
					headerShown: true,
					tabBarIcon: ({ focused }) => (
						<View
							style={{
								backgroundColor: focused ? "white" : "",
								padding: 10,
								borderRadius: 25,
							}}>
							<Image
								source={icons?.take_away}
								resizeMode="contain"
								style={{
									width: 25,
									height: 25,
									tintColor: focused ? "#fa257e" : "white",
								}}
							/>
						</View>
					),
				}}
			/>
			<Tab.Screen
				name="Favourite"
				component={Favorite}
				options={{
					headerShown: true,
					tabBarIcon: ({ focused }) => (
						<View
							style={{
								backgroundColor: focused ? "white" : "",
								padding: 10,
								borderRadius: 25,
							}}>
							<Image
								source={icons?.like}
								resizeMode="contain"
								style={{
									width: 25,
									height: 25,
									tintColor: focused ? "#fa257e" : "white",
								}}
							/>
						</View>
					),
				}}
			/>
			<Tab.Screen
				name="Account"
				component={Account}
				options={{
					headerShown: false,
					tabBarStyle: isLoggedIn
						? { ...styles.navigator }
						: { display: "none" },
					tabBarIcon: ({ focused }) => (
						<View
							style={{
								backgroundColor: focused ? "white" : "",
								padding: 10,
								borderRadius: 25,
							}}>
							<Image
								source={icons?.user}
								resizeMode="contain"
								style={{
									width: 25,
									height: 25,
									tintColor: focused ? "#fa257e" : "white",
								}}
							/>
						</View>
					),
				}}
			/>
		</Tab.Navigator>
	);
};

export default Tabs;

const styles = StyleSheet.create({
	navigator: {
		borderWidth: 0,
		height: 60,
		marginHorizontal: 15,
		position: "absolute",
		bottom: 5,
		borderRadius: 18,
		backgroundColor: "black",
		justifyContent: "center",
		alignItems: "center",
	},
});
