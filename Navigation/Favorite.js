import { StyleSheet, Text, View, ScrollView, FlatList } from "react-native";
import React, { useState, useEffect, useCallback } from "react";
import ProductsItem from "./../Components/Screens/HomeComponents/Products/ProductsItem";

import { useStateValue } from "../hooks/StateProvider";

const Favorite = ({ navigation }) => {
	const state = useStateValue();
	const [language] = state.language;
	const [products] = state.productsAPI.products;
	const [favoriteProducts, setFavoriteProducts] = state.favoriteProducts;
	const [productsRender, setProductsRender] = useState([]);

	const func = useCallback(() => {
		const arr = products.filter(
			(item) => favoriteProducts.indexOf(item.product_id) !== -1,
		);
		setProductsRender(arr);
	});
	useEffect(() => {
		func();
	}, [favoriteProducts, products]);

	return (
		<View style={{ paddingHorizontal: 20, paddingVertical: 30 }}>
			{favoriteProducts.length < 1 ? (
				<Text style={{ fontSize: 17, fontFamily: "Poppins-Regular" }}>
					{language === "en"
						? "You have no favorite products at this time"
						: "Non hai prodotti preferiti in questo momento"}
					!
				</Text>
			) : (
				<FlatList
					data={productsRender}
					maxToRenderPerBatch={5}
					initialNumToRender={3}
					horizontal={false}
					scrollEnabled={true}
					ListHeaderComponent={
						<View>
							<Text
								style={{
									fontSize: 25,
									fontWeight: "600",
									marginBottom: 10,
									color: "black",
									fontFamily: "Poppins-Regular",
								}}>
								{language === "en"
									? "Favourite Products"
									: "prodotti preferiti"}
							</Text>
						</View>
					}
					keyExtractor={(item) => item?.product_id}
					showsVerticalScrollIndicator={false}
					renderItem={(gotItem) =>
						ProductsItem({
							favoriteProducts,
							setFavoriteProducts,
							navigation,
							gotItem,
						})
					}
					contentContainerStyle={{ backgroundColor: "transparent" }}
					ListFooterComponent={<View style={{ height: 100 }} />}
				/>
			)}
		</View>
	);
};

export default Favorite;

const styles = StyleSheet.create({});
