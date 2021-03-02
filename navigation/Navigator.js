import React from 'react';
import {Platform} from 'react-native'
import {createStackNavigator} from 'react-navigation-stack'
import {createSwitchNavigator, createAppContainer} from 'react-navigation'
import { StyleSheet, Text, SafeAreaView,View,TextInput,Button } from 'react-native';
import AuthScreen from '../screens/auth/AuthScreen'
import StartupScreen from '../screens/auth/StartupScreen'
import AllDocumentsScreen from '../screens/uploads/AllDocumentsScreen'
import AddDocumentScreen from '../screens/uploads/AddDocumentScreen'
import EditDocumentScreen from '../screens/uploads/EditDocumentScreen'
import Colors from '../constants/Colors'
const AuthNavigator = createStackNavigator({
    Auth:AuthScreen
}
)
const UploadsNavigator = createStackNavigator({
    AllUploads:AllDocumentsScreen,
    AddDocument:AddDocumentScreen,
    EditDocument:EditDocumentScreen
}
)

const MainNavigator = createSwitchNavigator({
    Startup:StartupScreen,
    Auth:AuthNavigator,
    Uploads: UploadsNavigator
},{
    defaultNavigationOptions:{
        headerStyle:{
            backgroundColor:Platform.OS === 'android'? Colors.primary:''
        },
        headerTintColor:Platform.OS === 'android'? 'white':Colors.primary
    }
})
export default createAppContainer(MainNavigator)