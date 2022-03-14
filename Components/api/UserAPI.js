import React, { useState, useEffect } from "react";
import axios from "axios";
// import * as SecureStore from "expo-secure-store";
import { axiosURL } from "../../constants";

const UserAPI = (token) => {
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [cashOnDelivery, setCashOnDelivery] = useState(true);
	const [deliveryOption, setDeliveryOption] = useState("homedelivery");
	const [paymentOption, setPaymentOption] = useState("cashondelivery");
	const [email, setEmail] = useState("");
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [postalCode, setPostalCode] = useState("");
	const [address, setAddress] = useState("");
	const [building, setBuilding] = useState("");
	const [noteToRider, setNoteToRider] = useState("");
	const [phone, setPhone] = useState("");
	const [user, setUser] = useState({});
	const [checkUserCallback, setCheckUserCallback] = useState(false);
	const [orders, setOrders] = useState([]);

	const [postalData, setPostalData] = useState(null);

	useEffect(() => {
		if (token) {
			const getUser = async () => {
				try {
					const auth = {
						headers: { Authorization: `Bearer ${token}` },
					};
					const data = await axios.get(`${axiosURL}/private`, auth);

					setUser(data?.data?.user);
					setIsLoggedIn(true);

					if (data?.data?.user?.postalCode) {
						setPostalCode(data?.data?.user.postalCode);
					}
				} catch (error) {
					setCheckUserCallback(!checkUserCallback);
				}
			};
			getUser();
		}
	}, [token]);

	return {
		user: [user, setUser],
		isLoggedIn: [isLoggedIn, setIsLoggedIn],
		cashOnDelivery: [cashOnDelivery, setCashOnDelivery],
		deliveryOption: [deliveryOption, setDeliveryOption],
		paymentOption: [paymentOption, setPaymentOption],
		firstName: [firstName, setFirstName],
		lastName: [lastName, setLastName],
		email: [email, setEmail],
		password: [password, setPassword],
		confirmPassword: [confirmPassword, setConfirmPassword],
		postalCode: [postalCode, setPostalCode],
		address: [address, setAddress],
		building: [building, setBuilding],
		noteToRider: [noteToRider, setNoteToRider],
		phone: [phone, setPhone],
		checkUserCallback: [checkUserCallback, setCheckUserCallback],
		postalData: [postalData, setPostalData],
		orders: [orders, setOrders],
		userID: user?._id,
	};
};

export default UserAPI;
