import { StatusBar } from 'expo-status-bar';
import React from 'react';
import Navigator from './navigation/Navigator' 
// import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

import { StyleSheet, Text, SafeAreaView,View,TextInput,Button } from 'react-native';
import {createStore, combineReducers,applyMiddleware} from 'redux'
import {Provider} from 'react-redux'
import authReducer from './store/reducers/auth'
import documentsReducer from './store/reducers/documents'
import ReduxThunk from 'redux-thunk'
const rootReducer = combineReducers({
  auth:authReducer,
  documents:documentsReducer
})

const store= createStore(rootReducer,applyMiddleware(ReduxThunk))


export default function App() {
  return (
    <Provider store = {store}><Navigator/></Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'lightpink',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
