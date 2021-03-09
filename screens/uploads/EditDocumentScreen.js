// import { StatusBar } from 'expo-status-bar';
import React,{useCallback, useState,useEffect} from 'react';
import {useSelector,useDispatch} from 'react-redux'
import {ScrollView, StyleSheet,View,Text,Image,Button,TouchableOpacity, TouchableOpacityComponent} from 'react-native';
import Colors from '../../constants/Colors'
import { TextInput } from 'react-native-gesture-handler';
import * as documentActions from '../../store/actions/documents'
import {HeaderButtons,Item} from 'react-navigation-header-buttons'
import HeaderButton from '../../components/UI/HeaderButton'
import Card from '../../components/UI/Card';
const EditDocumentScreen = (props) => {

  console.log("Rendering component EditScreen");
  const token = useSelector(state=>state.auth.token)
  console.log('edit screen token' ,token)
  
  const documentId = props.navigation.getParam('documentId')
  const document= useSelector(state=> state.documents.userDocuments.find(doc => doc.id ===documentId))
  // console.log(document)
  if (!document){
    props.navigation.navigate('AllUploads')
  }
  const dispatch= useDispatch()
  const [tags,setTags] = useState(document.tags)
  const [newTag,setNewTag] = useState("")
  const tagList=tags.map((item,index)=><TouchableOpacity onPress={()=>onDeleteTagHandler(index)} key={index}>
    <View style = {styles.tag}  >
      <Text style={styles.tagText}>{item}</Text>
      </View>
      </TouchableOpacity>)
  

  

  const updateDocumentHandler=useCallback(
    () => {
      console.log('Updaing document with tags',tags)
      dispatch(documentActions.updateDocument(documentId,tags,token))
      props.navigation.goBack()
    },
    [dispatch,tags,token]
  )
  const addTagHandler=()=>{
    console.log('Updating document')
    setTags([...tags,newTag]);
    setNewTag('')

  }
  const inputChangedHandler = input => {
      console.log('ntive',input)
      setNewTag(input)
      // e.target.value=''
    }
  const onDeleteTagHandler = ind => {
    console.log('Deleting tag',tags[ind])
      const newTags= tags.filter((item,index)=>index !==ind)
      // setNewTag(input)
      setTags(newTags)
      // e.target.value=''
    }

  useEffect(() => {
    console.log('Inside UseEFFECT')
    props.navigation.setParams({ submit: updateDocumentHandler});
  }, [updateDocumentHandler]);


  

  

  return (
          <ScrollView style={styles.main}>
            <Card style={styles.card}>
              <View style={styles.imgContainer}>
                <Image style = {styles.image} source={{uri:document.url}}/>

              </View>
            <View style={styles.tagContainer}>
              <Text style= {styles.title}>Add/remove tags</Text>
<View style= {styles.tagList}> 
{tagList}
</View>
<View style={styles.form}> 
<View style={styles.inputGroup}>
<TextInput style={styles.input} keyboardType='default' onChangeText={inputChangedHandler} value={newTag}></TextInput>
<Button title="Add tag" onPress={addTagHandler}></Button>
</View>
</View>
</View>
</Card>
    </ScrollView>)
}
EditDocumentScreen.navigationOptions=(navData)=>{
  const submitFn = navData.navigation.getParam('submit');


  return {
    headerTitle: navData.navigation.getParam('documentTitle'),
    headerRight:()=><HeaderButtons HeaderButtonComponent={HeaderButton}>
<Item title='Save' iconName='md-save' onPress={submitFn}/>
{/* <Item title='Delete' iconName='md-trash' onPress={deleteFn}/> */}

    </HeaderButtons>

}
}
const styles = StyleSheet.create({
  imgContainer:{
    width:'100%',
    height:'60%',
    borderTopLeftRadius:10,
    borderTopRightRadius:10,
    overflow:'hidden'
},
main:{
  flex:1,
  // margin:10,
  // justifyContent:'center'
},

    card:{
flex:1,
margin:10,
justifyContent:'center',
    // alignItems:'center',
    // height:'100%'
  },
  tagContainer:{
    borderRadius:8,
    borderWidth:2,
    borderColor:'grey',
    margin:5
  },
  inputGroup:{
    flexDirection: 'row',
    // justifyContent:'space-between',
    alignItems:'center',
},
  tagList:{
    flex:1,
    flexDirection:'row',
    justifyContent:'center',
    alignItems:'center'
},
image:{
  width:'100%',
  height:300
},
title:{
  fontSize:20,
  color:Colors.primary,
  textAlign:'center',
  marginVertical:20,

},
tag:{
  borderRadius:4,
  borderColor:'grey',
  borderWidth:2,
  elevation:3, 
  backgroundColor:'white',
  margin:5

},
tagText:{
  fontSize:14,
  padding:5
},
form:{
  margin:20
},
label:{
  marginVertical:8
},
input:{
  padding:5,
  borderBottomColor:"grey",
  borderBottomWidth:1,
  width:'70%'
}

});
export default EditDocumentScreen