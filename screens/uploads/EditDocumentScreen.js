// import { StatusBar } from 'expo-status-bar';
import React  from 'react';
import { StyleSheet,View,Text} from 'react-native';

export default function UploadsScreen() {
  
  return (
          <View style={styles.screen}>
              <Text>edit screen to come!</Text>
        </View>)
}
UploadsScreen.navigationOptions={
  headerTitle:"Please Upload"
}

const styles = StyleSheet.create({
  screen:{
    flex:1,
    justifyContent:'center',
    alignItems:'center'
}
});
