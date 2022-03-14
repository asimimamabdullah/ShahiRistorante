import * as Font from "expo-font";

export default useFonts = async () =>
	await Font.loadAsync({
		"Poppins-Regular": require("./assets/fonts/Poppins-Regular.ttf"),
		"Poppins-Bold": require("./assets/fonts/Poppins-Medium.ttf"),
	});
