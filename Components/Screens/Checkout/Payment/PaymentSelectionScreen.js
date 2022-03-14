import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import React, { memo } from "react";
import { RadioButton } from "react-native-paper";
import { icons } from "../../../../constants";
import { useStateValue } from "../../../../hooks/StateProvider";

const PaymentSelectionScreen = ({ navigation }) => {
	const { userAPI } = useStateValue();
	const [cashOnDelivery, setCashOnDelivery] = userAPI.cashOnDelivery;
	const [paymentOption, setPaymentOption] = userAPI.paymentOption;

	return (
		<View>
			<Text
				style={{
					marginHorizontal: 10,
					fontFamily: "Poppins-Regular",
					fontSize: 18,
					marginVertical: 10,
				}}>
				Payment Methods
			</Text>
			<TouchableOpacity
				onPress={() => {
					setCashOnDelivery(false);
					setPaymentOption("paypalpayment");
					navigation.navigate("PaypalPaymentScreen");
				}}
				style={{
					backgroundColor: "#e8e8e8",
					flexDirection: "row",
					alignItems: "center",
					justifyContent: "space-between",
					paddingHorizontal: 10,
					paddingVertical: 10,
					marginVertical: 5,
				}}>
				<Text style={{ ...styles.fonts, fontSize: 17 }}>Paypal</Text>
				<Image
					source={icons?.openRight}
					style={{ width: 20, height: 20 }}
				/>
			</TouchableOpacity>

			<TouchableOpacity
				onPress={() => {
					setCashOnDelivery(true);
					setPaymentOption("cashondelivery");
				}}
				style={{
					backgroundColor: "#e8e8e8",
					flexDirection: "row",
					alignItems: "center",
					justifyContent: "space-between",
					paddingHorizontal: 10,
					paddingVertical: 10,
					marginVertical: 5,
				}}>
				<Text style={{ fontFamily: "Poppins-Regular", fontSize: 15 }}>
					Cash on delivery
				</Text>
				<RadioButton
					value="second"
					status={cashOnDelivery ? "checked" : "unchecked"}
					onPress={() => {
						setCashOnDelivery(true);
						setPaymentOption("cashondelivery");
					}}
				/>
				{/* <BouncyCheckbox
					size={30}
					fillColor="dodgerblue"
					unfillColor="#FFFFFF"
					iconStyle={{ borderColor: "dodgerblue" }}
					isChecked={cashOnDelivery}
					textStyle={{ fontFamily: "Poppins-Regular" }}
					onPress={() => setCashOnDelivery(!cashOnDelivery)}
					disableBuiltInState
				/> */}
			</TouchableOpacity>
		</View>
	);
};

export default memo(PaymentSelectionScreen);

const styles = StyleSheet.create({
	fonts: {
		fontFamily: "Poppins-Regular",
	},
});
