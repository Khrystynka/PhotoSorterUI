// import { StatusBar } from 'expo-status-bar';
import React  from 'react';
import { FlatList, StyleSheet,View,Text} from 'react-native';
import {useSelector} from 'react-redux'
import DocumentItem from '../../components/DocumentItem'
const AllDocumentsScreen = (props) =>{
  const documents = useSelector(state => state.documents.userDocuments)
  return (
          <View style={styles.screen}>
              <FlatList  
              data={documents} 
              keyExtractor={item=>item.id} 
              renderItem={ItemData=><DocumentItem 
                url={ItemData.item.url}
                title={ItemData.item.title}
                tags = {ItemData.item.tags}
                onChangeTags = {()=> props.navigation.navigate('EditDocument',{documentId:ItemData.item.id,documentTitle:ItemData.item.title})}

              ></DocumentItem>}>

                </FlatList>
        </View>)

}
AllDocumentsScreen.navigationOptions={
  headerTitle:"Your uploads"
}

const styles = StyleSheet.create({
  screen:{
    flex:1,
    // width:'100%',
    justifyContent:'center',
    // alignItems:'center'
}
});
export default AllDocumentsScreen