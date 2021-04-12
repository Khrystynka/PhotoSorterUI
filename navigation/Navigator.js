import { React } from "react";
import { useDispatch } from "react-redux";
import SafeAreaView from "react-native-safe-area-view";
import { DrawerNavigatorItems  } from "react-navigation-drawer";
// import { DrawerItems } from 'react-navigation-drawer';
import CustomComponent from '../screens/CustomScreen'

import { Platform } from "react-native";
import { createStackNavigator } from "react-navigation-stack";
import {
	createSwitchNavigator,
	createAppContainer,
	// createDrawerNavigator,
} from "react-navigation";
import { createDrawerNavigator } from "react-navigation-drawer";
import { View, Text,TextInput, Button } from "react-native";
// import { DrawerItems, SafeAreaView } from "react-navigation";

import AuthScreen from "../screens/auth/AuthScreen";
import StartupScreen from "../screens/auth/StartupScreen";
import AllDocumentsScreen from "../screens/uploads/AllDocumentsScreen";
import AddDocumentScreen from "../screens/uploads/AddDocumentScreen";
import EditDocumentScreen from "../screens/uploads/EditDocumentScreen";
import AllTagsScreen from "../screens/uploads/AllTagsScreen";
import AllDocumentsWithTagScreen from "../screens/uploads/AllDocumentsWithTagScreen";
import Colors from "../constants/Colors";
const defaultNavOptions = {
	headerStyle: {
		backgroundColor: Platform.OS === "android" ? Colors.primary : "",
	},
	// headerTitleStyle: {
	// 	fontFamily: "open-sans-bold",
	// },
	// headerBackTitleStyle: {
	// 	fontFamily: "open-sans",
	// },
	headerTintColor: Platform.OS === "android" ? "white" : Colors.primary,
};

// var CustomComp = (props) => {
// 	return(<View></View>)
// }

// const contComponent = (props) => {
// 	console.log("PROOOOPS", props);
// 	// const dispatch = useDispatch();
// 	return (
// 		<View style={{ flex: 1, paddingTop: 20 }}>
// 			<SafeAreaView forceInset={{ top: "always", horizontal: "never" }}>
// 				<DrawerNavigatorItems {...props} />
// 				<Button
// 					title="Logout"
// 					color={Colors.primary}
// 					onPress={() => {
// 						console.log("log me OUT!");
// 						// dispatch(authActions.logout());
// 						// props.navigation.navigate("Auth");
// 					}}
// 				/>
// 			</SafeAreaView>
// 		</View>
// 	);
// };
// const contComponent = (props) => {

// return (
// <DrawerContentScrollView {...props}>
//       <DrawerItemList {...props} />
//       <DrawerItem
//         label="Help"
//         onPress={() => console.log('here')}
//       />
//     </DrawerContentScrollView>)
const AuthNavigator = createStackNavigator(
	{
		Auth: AuthScreen,
	},
	{
		defaultNavigationOptions: defaultNavOptions,
	}
);

const UploadsNavigator = createStackNavigator(
	{
		AllUploads: AllDocumentsScreen,
		AddDocument: AddDocumentScreen,
		EditDocument: EditDocumentScreen,
	},
	{
		defaultNavigationOptions: defaultNavOptions,
	}
);
const TagsNavigator = createStackNavigator(
	{
		AllTags: AllTagsScreen,
		AllDocumentsWithTag: AllDocumentsWithTagScreen,
	},
	{
		defaultNavigationOptions: defaultNavOptions,
	}
);
const DrawerNavigator = createDrawerNavigator(

	{
		Uploads: UploadsNavigator,
		Tags: TagsNavigator,
		// Documents: UploadsNavigator,
	},
	{
		contentOptions: {
			activeTintColor: Colors.primary,
		},

		// defaultNavigationOptions: defaultNavOptions,

		contentComponent: CustomComponent
		// () => {
			// console.log('PROPS',props)
    //   const dispatch = useDispatch();
    //   return (<View>

	//    {/* <DrawerNavigatorItems {...props} /> */}
	//   </View>);
    // }
	}
)
{/* <View style={{ flex: 1, paddingTop: 20 }}>
          <SafeAreaView forceInset={{ top: 'always', horizontal: 'never' }}>
            <DrawerItems {...props} />
            <Button
              title="Logout"
              color={Colors.primary}
              onPress={() => {
                dispatch(authActions.logout());
                // props.navigation.navigate('Auth');
              }}
            />
          </SafeAreaView>
        </View> */}
const MainNavigator = createSwitchNavigator(
	{
		Startup: StartupScreen,
		Auth: AuthNavigator,
		// Uploads: UploadsNavigator,
		Drawer: DrawerNavigator,
	},
	{
		defaultNavigationOptions: {
			headerStyle: {
				backgroundColor: Platform.OS === "android" ? Colors.primary : "",
			},
			headerTintColor: Platform.OS === "android" ? "white" : Colors.primary,
		},
	}
);

export default createAppContainer(MainNavigator);
// export default createAppContainer(DrawerNavigator);
