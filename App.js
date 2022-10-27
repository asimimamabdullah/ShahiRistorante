import React, { useEffect, useState, useCallback } from "react";
import { StyleSheet, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Tabs from "./Navigation/Tabs";
import Product from "./Components/Screens/Product/Product";
import Account from "./Components/Screens/Account/Account";
import useFonts from "./useFonts";
import { StateProvider } from "./hooks/StateProvider";
import Login from "./Components/Screens/Login/Login";
import Register from "./Components/Screens/Register/Register";
import RegisterPassword from "./Components/Screens/Register/RegisterComponents/RegisterPassword";
import RegisterAddress from "./Components/Screens/Register/RegisterComponents/RegisterAddress";
import Basket from "./Components/Screens/Basket/Basket";
import Orders from "./Components/Screens/Orders/Orders";
import Favorite from "./Navigation/Favorite";
// import { icons } from "./constants";
import About from "./Components/Screens/About/About";
import ProfileSettings from "./Components/Screens/Profile/ProfileSettings";
import FoodDelivery from "./Components/Screens/FoodPages/FoodDelivery/FoodDelivery";
import Pickup from "./Components/Screens/FoodPages/Pickup/Pickup";
import Checkout from "./Components/Screens/Checkout/Checkout";
import PaymentSelectionScreen from "./Components/Screens/Checkout/Payment/PaymentSelectionScreen";
import Congratulations from "./Components/Screens/Congratulations/Congratulations";
import EnterAddress from "./Components/Screens/Checkout/Address/EnterAddress";
import PaypalPaymentScreen from "./Components/Screens/Checkout/Payment/PaypalPaymentScreen";
import OrderSummary from "./Components/Screens/Orders/OrderSummary/OrderSummary";

const Stack = createNativeStackNavigator();

export default function App() {
	const [isFinished, setIsFinished] = useState(false);

	const getFonts = useCallback(() => {
		useFonts().then(() => setIsFinished(true));
	}, []);

	useEffect(() => {
		getFonts();
	}, []);

	if (!isFinished) return <></>;

	if (isFinished)
		return (
			// <SafeAreaProvider>
			<NavigationContainer>
				<StateProvider>
					<Stack.Navigator
						initialRouteName="Tabs"
						screenOptions={{
							headerShown: false,
						}}>
						<Stack.Screen
							name="Tabs"
							component={Tabs}
							options={{
								headerShown: false,
								animation: "slide_from_right",
							}}
						/>
						<Stack.Screen
							name="Product"
							component={Product}
							options={{
								headerShown: false,
								animation: "slide_from_bottom",
							}}
						/>
						<Stack.Screen
							name="Account"
							component={Account}
							options={{
								headerShown: false,
								animation: "slide_from_bottom",
							}}
						/>
						<Stack.Screen
							name="Login"
							component={Login}
							options={{
								headerShown: false,
								animation: "slide_from_right",
							}}
						/>
						<Stack.Screen
							name="Register"
							component={Register}
							options={{
								headerShown: false,
								animation: "slide_from_right",
							}}
						/>

						<Stack.Screen
							name="RegisterPassword"
							component={RegisterPassword}
							options={{
								headerShown: false,
								animation: "slide_from_right",
							}}
						/>
						<Stack.Screen
							name="RegisterAddress"
							component={RegisterAddress}
							options={{
								headerShown: false,
								animation: "slide_from_right",
							}}
						/>

						<Stack.Screen
							name="Basket"
							component={Basket}
							options={{
								headerShown: true,
								animation: "slide_from_bottom",
							}}
						/>

						<Stack.Screen
							name="Orders1"
							component={Orders}
							options={{
								headerTitle: () => <Text style={{ fontSize: 20 }}>Orders</Text>,
								headerShown: true,
								animation: "slide_from_right",
							}}
						/>

						<Stack.Screen
							name="Favorite1"
							component={Favorite}
							options={{
								headerTitle: () => <Text style={{ fontSize: 20 }}>Favorites</Text>,
								headerShown: true,
								animation: "slide_from_right",
							}}
						/>

						<Stack.Screen
							name="About"
							component={About}
							options={{
								headerShown: true,
								animation: "slide_from_right",
							}}
						/>

						<Stack.Screen
							name="Profile"
							component={ProfileSettings}
							options={{
								headerShown: true,
								animation: "slide_from_right",
							}}
						/>

						<Stack.Screen
							name="FoodDelivery"
							component={FoodDelivery}
							options={{
								headerTitle: () => <Text style={{ fontSize: 20 }}>Home Delivery</Text>,
								headerShown: true,
								animation: "slide_from_right",
							}}
						/>

						<Stack.Screen
							name="Pickup"
							component={Pickup}
							options={{
								headerTitle: () => <Text style={{ fontSize: 20 }}>Pick-up</Text>,
								headerShown: true,
								animation: "slide_from_right",
							}}
						/>

						<Stack.Screen
							name="Checkout"
							component={Checkout}
							options={{
								headerTitle: () => <Text style={{ fontSize: 20 }}>Checkout</Text>,
								headerShown: true,
								animation: "slide_from_right",
							}}
						/>

						<Stack.Screen
							name="PaymentSelection"
							component={PaymentSelectionScreen}
							options={{
								headerTitle: () => <Text style={{ fontSize: 20 }}>Select Payment</Text>,
								headerShown: true,
								animation: "slide_from_right",
							}}
						/>

						<Stack.Screen
							name="Congratulations"
							component={Congratulations}
							options={{
								headerTitle: () => <Text style={{ fontSize: 20 }}>go back</Text>,
								headerShown: false,
								animation: "slide_from_right",
							}}
						/>

						<Stack.Screen
							name="EnterAddress"
							component={EnterAddress}
							options={{
								headerTitle: () => <Text style={{ fontSize: 20 }}>Enter Address</Text>,
								headerShown: true,
								animation: "slide_from_right",
							}}
						/>

						<Stack.Screen
							name="PaypalPaymentScreen"
							component={PaypalPaymentScreen}
							options={{
								headerTitle: () => <Text style={{ fontSize: 20 }}>Paypal Payment</Text>,
								headerShown: true,
								animation: "slide_from_right",
							}}
						/>

						<Stack.Screen
							name="OrderSummary"
							component={OrderSummary}
							options={{
								headerTitle: () => <Text style={{ fontSize: 20 }}>Order Summary</Text>,
								headerShown: true,
								animation: "slide_from_bottom",
							}}
						/>
					</Stack.Navigator>
				</StateProvider>
			</NavigationContainer>
			// 	<StatusBar style="auto" />
			// </SafeAreaProvider>
		);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		alignItems: "center",
		justifyContent: "center",
	},
});
