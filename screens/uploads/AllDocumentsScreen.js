// import { StatusBar } from 'expo-status-bar';
import React ,{useEffect} from 'react';
import { FlatList, StyleSheet,View,Alert} from 'react-native';
import {useSelector,useDispatch} from 'react-redux'
import DocumentItem from '../../components/DocumentItem'
import {HeaderButtons,Item} from 'react-navigation-header-buttons'
import HeaderButton from '../../components/UI/HeaderButton'
import * as documentActions from '../../store/actions/documents'

const AllDocumentsScreen = (props) =>{
  const token = useSelector(state=>state.auth.token)
  const documentsChanged = useSelector(state=>state.documents.touched)

  const documents = useSelector(state=>state.documents.userDocuments)
  const dispatch=useDispatch()
  useEffect(() => {
        console.log('useeffect from alldocuments screen')
        if (documentsChanged){
          dispatch(documentActions.loadDocuments(token))
        }
    },[dispatch,token,documentsChanged])

  const deleteDocumentHandler=(docId,token)=>{
    // console.log(documentId,tags)
    // dispatch(documentActions.updateDocument(documentId,tags))
    Alert.alert("Confirm deletion",'Document will be permanently deleted',
    [
      {text:'No',style: 'default'},
      {text:'Yes',style: 'destructive',onPress:(()=>{
        console.log('deleteing document',docId);
        dispatch(documentActions.deleteDocument(docId,token))
    })},
      {text:'Maybe',style: 'default'},
    ])
  }
  // useEffect(() => {
  //   console.log('Inside UseEFFECT')
  //   props.navigation.setParams({ new: updateDocumentHandler});
  // }, [updateDocumentHandler]);


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
                onDeleteDocument={()=>deleteDocumentHandler(ItemData.item.id,token)}
              ></DocumentItem>}>

                </FlatList>
        </View>)

}
AllDocumentsScreen.navigationOptions=(navData)=>{
  // const submitFn = navData.navigation.getParam('submit');

  return {
    headerTitle: ('Your Uploads'),
    headerRight:()=><HeaderButtons HeaderButtonComponent={HeaderButton}>
<Item title='Add new' iconName='md-add' onPress={()=>{
  console.log('adding new docs');
navData.navigation.navigate('AddDocument')}}/>
{/* <Item title='Delete' iconName='md-trash' onPress={deleteFn}/> */}

    </HeaderButtons>

}
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