import React from "react";
import { useDispatch } from "react-redux";
import SafeAreaView from "react-native-safe-area-view";

import { View, Button } from "react-native";
import { DrawerNavigatorItems } from "react-navigation-drawer";
import * as authActions from "../store/actions/auth";
const CustomComponent = (props) => {
	const dispatch = useDispatch();
	return (
		<View>
			<SafeAreaView forceInset={{ top: 80, horizontal: "never" }}>
				<DrawerNavigatorItems {...props} />
				<Button
					title="Logout"
					//   color={Colors.primary}
					onPress={() => {
						dispatch(authActions.logout());
						props.navigation.navigate("Auth");
					}}
				/>
			</SafeAreaView>
		</View>
	);
};

// CustomComponent.navigationOptions = {
// 	headerTitle: "Please authenticate",
// };

export default CustomComponent;
