import React, { useState } from "react";
import AskAccount from "./AccountComponents/AskAccount";
import AccountDetails from "./AccountComponents/AccountDetails";

import { useStateValue } from "../../../hooks/StateProvider";

const Account = ({ navigation }) => {
	const { userAPI } = useStateValue();
	const [isLoggedIn] = userAPI.isLoggedIn;
	return isLoggedIn ? (
		<AccountDetails navigation={navigation} />
	) : (
		<AskAccount navigation={navigation} />
	);
};

export default React.memo(Account);
