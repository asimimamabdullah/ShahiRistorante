import { StyleSheet, Text, View, FlatList } from "react-native";
import React, { useState, useEffect, memo } from "react";
import CategoriesItem from "./CategoriesItem";
import { useStateValue } from "../../../hooks/StateProvider";

const Categories = () => {
	const state = useStateValue();
	const [language] = state.language;

	const [categories] = state.categoriesAPI.categories;
	const [selectedCategory, setSelectedCategory] = state.selectedCategory;

	return (
		<View style={{ paddingHorizontal: 20 }}>
			<Text
				style={{
					fontSize: 30,
					fontWeight: "600",
					marginBottom: 10,
					color: "black",
					fontFamily: "Poppins-Regular",
				}}>
				{language === "en" ? "Categories" : "Categorie"}
			</Text>

			<FlatList
				data={categories}
				maxToRenderPerBatch={6}
				initialNumToRender={3}
				horizontal
				keyExtractor={(i) => i?._id}
				key={(i) => i?._id}
				renderItem={(gotItem) =>
					CategoriesItem({
						selectedCategory,
						setSelectedCategory,
						gotItem,
					})
				}
				showsHorizontalScrollIndicator={false}
				contentContainerStyle={{ paddingVertical: 15 }}
			/>
		</View>
	);
};

export default memo(Categories);

const styles = StyleSheet.create({});
