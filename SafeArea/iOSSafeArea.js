import { SafeAreaView } from "react-native";

const IOSSafeAreaView = ({ children, styles }) => {
	return <SafeAreaView style={{ ...styles }}>{children}</SafeAreaView>;
};

export default IOSSafeAreaView;
