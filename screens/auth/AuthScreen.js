// import { StatusBar } from 'expo-status-bar';
import React, { useCallback, useReducer, useState, useEffect } from "react";
import {
	StyleSheet,
	ActivityIndicator,
	ScrollView,
	KeyboardAvoidingView,
	View,
	Text,
	TextInput,
	Button,
	Alert,
	ProgressViewIOSComponent,
	SafeAreaView,
} from "react-native";
import Input from "../../components/UI/Input";
import { useDispatch } from "react-redux";
import * as authActions from "../../store/actions/auth";

const AuthScreen = (props) => {
	const [error, setError] = useState(null);
	const [isAuth, setIsAuth] = useState(false);
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [signupMode, setSignupMode] = useState(false);
	const [isLoading, setIsLoading] = useState(false);

	const dispatch = useDispatch();
	useEffect(() => {
		if (error) {
			Alert.alert("An custom error has occured!", error, [{ text: "OK" }]);
		}
	}, [error]);
	useEffect(() => {
		if (isAuth) {
			props.navigation.navigate("Drawer");
		}
	}, [isAuth]);

	const authHandler = async () => {
		let action = null;
		if (signupMode) {
			action = authActions.signup(email, password);
		} else {
			action = authActions.login(email, password);
		}
		setIsLoading(true);
		try {
			await dispatch(action);
			setIsAuth(true);
		} catch (e) {
			setError(e.message);
		}

		setIsLoading(false);
	};

	return (
		<KeyboardAvoidingView
			behaviour="padding"
			keyboardVerticalOffset={50}
			style={styles.screen}
		>
			<View style={styles.form}>
				<Input
					id="email"
					label="E-Mail"
					keyboardType="email-address"
					autoCapitalize="none"
					autoCorrect={false}
					onInputChange={(value) => setEmail(value)}
				/>

				<Input
					id="password"
					label="Password"
					keyboardType="default"
					secureTextEntry
					autoCorrect={false}
					onInputChange={(value) => setPassword(value)}
				/>
			</View>
			{isLoading ? (
				<ActivityIndicator />
			) : (
				<View style={styles.btncontainer}>
					<Button
						style={styles.button}
						title={signupMode ? "Sign Up" : "Login"}
						onPress={authHandler}
					></Button>
					<View style={styles.separator} />

					<Button
						style={styles.button}
						title={signupMode ? "Switch to Login" : "Switch to Sign Up"}
						onPress={() => setSignupMode((prevState) => !prevState)}
					></Button>
				</View>
			)}

			{/* </LinearGradient> */}
		</KeyboardAvoidingView>
	);
};
AuthScreen.navigationOptions = {
	headerTitle: "Please authenticate",
};

const styles = StyleSheet.create({
	form: {
		width: "80%",
		maxWidth: 400,
		maxHeight: 400,
		padding: 10,
	},
	separator: {
		marginVertical: 8,
		borderBottomColor: "#737373",
		borderBottomWidth: StyleSheet.hairlineWidth,
	},
	screen: {
		flex: 1,
		height: "100%",
		width: "100%",
		alignItems: "center",
		justifyContent: "center",
	},
	button: {
		color: "white",
		width: "70%",
		margin: 15,
		padding: 15,
		borderRadius: 10,
	},
	btncontainer: {
		// alignItems: "center",
		// justifyContent: "center",

		margin: 10,
	},
});
export default AuthScreen;
