import { StyleSheet, Text, View, Image, TouchableOpacity, ActivityIndicator } from "react-native";
import React from "react";

const CategoriesItem = ({ selectedCategory, setSelectedCategory, gotItem }) => {
	const item = gotItem.item;

	if (!item) return <ActivityIndicator size={30} color="#ff00f8" />;

	return (
		<TouchableOpacity
			style={{
				...styles.container,
				backgroundColor: selectedCategory === item.name ? "#ff4593" : "white",
				...styles.shadow,
			}}
			onPress={() => setSelectedCategory(item.name)}>
			<View
				style={{
					...styles.containerInside,
					backgroundColor: selectedCategory === item.name ? "white" : "#eee",
				}}>
				{item.images ? (
					<Image
						source={{ uri: item.images.url }}
						resizeMode="cover"
						style={{
							width: 50,
							borderRadius: 25,
							height: 50,
						}}
					/>
				) : null}
			</View>

			<Text
				style={{
					fontSize: 12,
					lineHeight: 15,
					textAlign: "center",
					color: selectedCategory === item.name ? "white" : "black",
				}}>
				{item.name}
			</Text>
		</TouchableOpacity>
	);
};

export default CategoriesItem;

const styles = StyleSheet.create({
	container: {
		marginRight: 10,
		paddingHorizontal: 5,
		paddingVertical: 10,
		paddingBottom: 20,
		width: 75,
		shadowColor: "purple",
		borderRadius: 30,
		alignItems: "center",
		justifyContent: "center",
	},

	containerInside: {
		borderBottomWidth: 0,
		width: 50,
		height: 50,
		borderRadius: 25,
		justifyContent: "center",
		alignItems: "center",
		marginBottom: 15,
	},

	shadow: {
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.2,
		shadowRadius: 3,
		elevation: 2,
	},
});
