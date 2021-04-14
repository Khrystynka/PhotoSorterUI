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
		backgroundColor: Platform.OS === "android" ? Colors.primary : "white",
	},
	
	headerTintColor: Platform.OS === "android" ? "white" : Colors.primary,
};


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
		"Uploads": UploadsNavigator,
		Tags: TagsNavigator,
		// "Upload document":AddDocumentScreen,
		// Documents: UploadsNavigator,
	},
	{
		contentOptions: {
			activeTintColor: Colors.primary,
		},

		// defaultNavigationOptions: defaultNavOptions,

		contentComponent: CustomComponent})

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
				backgroundColor: Platform.OS === "android" ? Colors.primary : "white",
			},
			headerTintColor: Platform.OS === "android" ? "white" : Colors.primary,
		},
	}
);

export default createAppContainer(MainNavigator);
