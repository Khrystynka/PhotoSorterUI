// import { StatusBar } from 'expo-status-bar';
import React  from 'react';
import { StyleSheet,View,Text} from 'react-native';

export default function AddDocumentScreen() {
  
  return (
          <View style={styles.screen}>
              <Text>All docs to come!</Text>
        </View>)
}
AddDocumentScreen.navigationOptions={
  headerTitle:"Please Upload"
}

const styles = StyleSheet.create({
  screen:{
    flex:1,
    justifyContent:'center',
    alignItems:'center'
}
});
