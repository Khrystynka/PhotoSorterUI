import React, { useEffect } from "react";
import {
	View,
	ActivityIndicator,
	StyleSheet,
	Text,
	AsyncStorage,
} from "react-native";
import { useDispatch } from "react-redux";
import * as authActions from "../../store/actions/auth";
const StartupScreen = (props) => {
	const dispatch = useDispatch();
	useEffect(() => {
		const tryLogin = async () => {
			console.log("Trying to auto login");
			const userData = await AsyncStorage.getItem("userData");
			console.log("exptracted", userData);
			if (!userData) {
				console.log("tried to login but no user data in storage");
				props.navigation.navigate("Auth");
				return;
			}

			const transformData = JSON.parse(userData);
			const { token, userId, refreshToken, expiryDate } = transformData;
			const expirationDate = new Date(expiryDate);
			console.log(
				"dates",
				"exp",
				expirationDate,
				"or ",
				expiryDate,
				"now",
				new Date()
			);
			if (expirationDate <= new Date() || !token || !userId) {
				console.log("expired token");
				props.navigation.navigate("Auth");
				return;
			}
			dispatch(authActions.authenticate(userId, token, refreshToken));

			props.navigation.navigate("Uploads");
			// props.navigation.navigate('Auth')
		};
		tryLogin();
	}, [dispatch]);

	return (
		<View style={styles.screen}>
			<ActivityIndicator size="large" />
			<Text>Loading user...</Text>
		</View>
	);
};
const styles = StyleSheet.create({
	screen: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
});
export default StartupScreen;
