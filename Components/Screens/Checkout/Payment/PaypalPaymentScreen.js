import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";

const PaypalPaymentScreen = () => {
	return (
		<SafeAreaView style={{ flex: 1 }}>
			<View>
				<Text
					style={{
						textAlign: "center",
						fontSize: 18,
						...styles.fonts,
						letterSpacing: 0.2,
						lineHeight: 25,
					}}>
					Coming Soon!
				</Text>
			</View>
		</SafeAreaView>
	);
};

export default PaypalPaymentScreen;

const styles = StyleSheet.create({
	fonts: {
		fontFamily: "Poppins-Regular",
	},
});
