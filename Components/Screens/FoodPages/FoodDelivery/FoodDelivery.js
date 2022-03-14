import {
	StyleSheet,
	Text,
	View,
	Image,
	FlatList,
	TouchableOpacity,
} from "react-native";
import React, { useEffect, memo, useMemo, useState } from "react";

import { useStateValue } from "../../../../hooks/StateProvider";
// import Products from "../../HomeComponents/Products/Products";
import ProductsItem from "../../HomeComponents/Products/ProductsItem";

const FoodDelivery = ({ navigation }) => {
	const state = useStateValue();
	const [categories] = state.categoriesAPI.categories;
	const [selectedCategory, setSelectedCategory] = state.selectedCategory;
	const [products] = state.productsAPI.products;
	const [favoriteProducts, setFavoriteProducts] = state.favoriteProducts;
	const [productsToRender, setProductsToRender] = useState([]);

	useEffect(() => {
		setSelectedCategory(null);
	}, []);

	const filterProducts = () => {
		const filteredArray = products.filter(
			(item) => item.category === selectedCategory,
		);
		setProductsToRender(filteredArray);
	};

	useMemo(() => {
		if (selectedCategory && selectedCategory !== "All") filterProducts();
		else if (!selectedCategory || selectedCategory === "All")
			setProductsToRender(products);
	}, [selectedCategory]);

	return (
		<View style={{ marginTop: 30 }}>
			<Text
				style={{
					fontSize: 23,
					lineHeight: 30,
					fontFamily: "Poppins-Regular",
					marginHorizontal: 20,
					marginBottom: 30,
				}}>
				Select your food and place order
			</Text>

			<Text
				style={{
					marginHorizontal: 20,
					fontSize: 14,
					fontFamily: "Poppins-Regular",
					lineHeight: 20,
					marginBottom: 20,
					color: "#aaa",
				}}>
				We will deliver it to you
			</Text>

			<View>
				<FlatList
					data={categories}
					horizontal
					showsHorizontalScrollIndicator={false}
					contentContainerStyle={{ marginHorizontal: 20 }}
					key={(i) => i._id}
					keyExtractor={(i) => i._id}
					ListFooterComponent={<View style={{ width: 80 }} />}
					renderItem={({ item }) => (
						<TouchableOpacity
							onPress={() => setSelectedCategory(item?.name)}
							style={{
								flexDirection: "row",
								marginHorizontal: 5,
								alignItems: "center",
								paddingVertical: 10,
								paddingHorizontal: 15,
								borderRadius: 12,
								backgroundColor:
									selectedCategory === item.name
										? "#ff4593"
										: "#ffffff",
								elevation: 1,
							}}>
							<Image
								source={{ uri: item?.images?.url }}
								style={{ width: 30, height: 30, borderRadius: 15 }}
							/>

							<Text
								style={{
									marginLeft: 15,
									lineHeight: 25,
									color:
										selectedCategory === item.name
											? "#ffffff"
											: "black",
									fontSize: 16,
								}}>
								{item?.name}
							</Text>
						</TouchableOpacity>
					)}
				/>
			</View>

			{/* <Products navigation={navigation} /> */}
			<FlatList
				data={productsToRender}
				keyExtractor={(item) => item?.product_id}
				key={(i) => i?.product_id}
				contentContainerStyle={{ marginVertical: 30 }}
				ListFooterComponent={<View style={{ height: 250 }} />}
				renderItem={(gotItem) => (
					<ProductsItem
						gotItem={gotItem}
						navigation={navigation}
						favoriteProducts={favoriteProducts}
						setFavoriteProducts={setFavoriteProducts}
					/>
				)}
			/>
		</View>
	);
};

export default memo(FoodDelivery);

const styles = StyleSheet.create({});
