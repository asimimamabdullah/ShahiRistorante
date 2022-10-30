// RootNavigation.js

import { createNavigationContainerRef } from "@react-navigation/native";
import { Alert } from "react-native";

export const navigationRef = createNavigationContainerRef();

export function navigate(name, params) {
	if (navigationRef.isReady()) {
		navigationRef.navigate(name, params);
	} else {
		Alert.alert("Please try again");
	}
}

// add other navigation functions that you need and export them
