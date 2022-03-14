import React from "react";
import { Text, View, Image, Dimensions, TouchableOpacity } from "react-native";

const { width, height } = Dimensions.get("window");
import { icons } from "../../../../constants";

const ProductsItem = ({
	gotItem,
	navigation,
	favoriteProducts,
	setFavoriteProducts,
}) => {
	const { item } = gotItem;

	const onLike = async (id) => {
		const array = favoriteProducts;
		if (favoriteProducts.includes(id)) {
			const filteredArray = array?.filter((item) => item !== id);
			setFavoriteProducts(filteredArray);
		} else {
			setFavoriteProducts((values) => [...values, id]);
		}
	};
	return (
		<TouchableOpacity
			onPress={() => navigation.navigate("Product", { item })}
			style={{
				marginBottom: 20,
				elevation: 3,
				backgroundColor: "transparent",
				marginHorizontal: 20,
			}}>
			<View style={{ position: "relative", marginBottom: 10 }}>
				<Image
					source={{ uri: item?.images?.url }}
					resizeMode="cover"
					style={{ width: "100%", height: 200, borderRadius: 30 }}
				/>

				<TouchableOpacity
					onPress={() => onLike(item.product_id)}
					style={{ position: "absolute", top: 15, right: 15 }}>
					<Image
						source={
							favoriteProducts.includes(item.product_id)
								? icons?.like
								: icons?.heart
						}
						resizeMode="contain"
						style={{
							width: 30,
							height: 30,
							tintColor: "#ff4593",
						}}
					/>
				</TouchableOpacity>

				<View
					style={{
						position: "absolute",
						left: 0,
						bottom: 0,
						width: width * 0.3,
						height: 50,
						backgroundColor: "white",
						borderTopRightRadius: 30,
						borderBottomLeftRadius: 30,
						justifyContent: "center",
						alignItems: "center",
					}}>
					<Text style={{ fontSize: 18 }}>30 - 45 min</Text>
				</View>
			</View>
			<Text style={{ fontSize: 22, lineHeight: 30 }}>{item?.title}</Text>

			<View style={{ flexDirection: "row", marginTop: 10 }}>
				<Image
					source={icons?.star}
					style={{
						width: 20,
						height: 20,
						marginRight: 10,
						tintColor: "#FC6D3F",
					}}
					resizeMode="contain"
				/>

				<Text style={{ fontSize: 16, lineHeight: 22 }}>{4.8}</Text>

				<View style={{ marginLeft: 10, flexDirection: "row" }}>
					<Text style={{ fontSize: 15, lineHeight: 22 }}>
						- {item?.category} -
					</Text>

					<Text
						style={{
							fontSize: 22,
							lineHeight: 24,
							marginLeft: 30,
						}}>
						€ {item?.price}
					</Text>
				</View>
			</View>
		</TouchableOpacity>
	);
};

export default ProductsItem;
export const MemorizedProductsItem = React.memo(ProductsItem);
