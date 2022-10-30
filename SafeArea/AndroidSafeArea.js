import { SafeAreaView } from "react-native-safe-area-context";

const AndroidSafeAreaView = ({ children, styles }) => {
	return <SafeAreaView style={{ ...styles }}>{children}</SafeAreaView>;
};

export default AndroidSafeAreaView;
