import {
	StyleSheet,
	Text,
	View,
	FlatList,
	TouchableOpacity,
	Image,
} from "react-native";
import React, { useEffect, useMemo, useState } from "react";
import { useStateValue } from "../../../../hooks/StateProvider";
import ProductsItem from "../../HomeComponents/Products/ProductsItem";

const Pickup = ({ navigation }) => {
	const state = useStateValue();
	const [language] = state.language;
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
				{language === "en"
					? "Select your food and place order"
					: "Seleziona il tuo cibo ed effettua un ordine"}
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
				{language === "en"
					? "And get it within 30 to 40 minutes"
					: "E ottenerlo entro 30-40 minuti"}
			</Text>

			<View>
				<FlatList
					data={categories}
					horizontal
					showsHorizontalScrollIndicator={false}
					contentContainerStyle={{ marginHorizontal: 20 }}
					key={(i) => i._id}
					keyExtractor={(i) => i._id}
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
				keyExtractor={(i) => i?.product_id}
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

export default Pickup;

const styles = StyleSheet.create({});
