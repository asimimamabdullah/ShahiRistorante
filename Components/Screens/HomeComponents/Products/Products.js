import { Text, View, FlatList } from "react-native";
import React, { useState, useMemo, memo } from "react";

import ProductsItem from "./ProductsItem";
import { useStateValue } from "../../../../hooks/StateProvider";
import SliderPlace from "../DeliverOrTakeaway/SliderPlace";
import Categories from "../Categories";
import Header from "../../Header/Header";

const Products = ({ navigation }) => {
	const state = useStateValue();
	const [language, setLanguage] = state.language;
	const [favoriteProducts, setFavoriteProducts] = state.favoriteProducts;
	const [products] = state.productsAPI.products;
	const [selectedCategory] = state.selectedCategory;
	const [productsToRender, setProductsToRender] = useState(products);

	const filterProducts = () => {
		const filteredArray = products.filter((item) => item.category === selectedCategory);
		setProductsToRender(filteredArray);
	};

	useMemo(() => {
		if (selectedCategory && selectedCategory !== "All") filterProducts();
		else if (!selectedCategory || selectedCategory === "All") setProductsToRender(products);
	}, [selectedCategory]);

	return (
		<>
			{/* <ScrollView>
				<Header navigation={navigation} />
				<View>
					<SliderPlace />
					<Categories />

					<Text
						style={{
							fontSize: 30,
							fontWeight: "600",
							marginBottom: 20,
							color: "black",
							fontFamily: "Poppins-Regular",
							marginHorizontal: 20,
						}}>
						{language === "en" ? "Products" : "Prodotti"}
					</Text>
				</View>

				<FlatList
					data={productsToRender}
					maxToRenderPerBatch={3}
					initialNumToRender={2}
					horizontal={false}
					scrollEnabled={true}
					key={(i) => i?.product_id}
					// 					ListHeaderComponent={
					// 						<View>
					// 							<SliderPlace navigation={navigation} />
					// 							<Categories />
					//
					// 							<Text
					// 								style={{
					// 									fontSize: 30,
					// 									fontWeight: "600",
					// 									marginBottom: 20,
					// 									color: "black",
					// 									fontFamily: "Poppins-Regular",
					// 									marginHorizontal: 20,
					// 								}}>
					// 								{language === "en" ? "Products" : "Prodotti"}
					// 							</Text>
					// 						</View>
					// 					}
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
					ListFooterComponent={<View style={{ height: 250 }} />}
				/>
			</ScrollView> */}
			<View>
				<FlatList
					data={[]}
					ListHeaderComponent={<Header navigation={navigation} />}
					renderItem={<></>}
					scrollEnabled={false}
				/>

				<FlatList
					data={productsToRender}
					maxToRenderPerBatch={3}
					initialNumToRender={2}
					horizontal={false}
					scrollEnabled={true}
					key={(i) => i?.product_id}
					ListHeaderComponent={
						<View>
							<SliderPlace navigation={navigation} />
							<Categories />

							<Text
								style={{
									fontSize: 30,
									fontWeight: "600",
									marginBottom: 20,
									color: "black",
									fontFamily: "Poppins-Regular",
									marginHorizontal: 20,
								}}>
								{language === "en" ? "Products" : "Prodotti"}
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
					ListFooterComponent={<View style={{ height: 250 }} />}
				/>
			</View>
		</>
	);
};

export default memo(Products);
