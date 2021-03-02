// import { StatusBar } from 'expo-status-bar';
import React,{useState} from 'react';
import {useSelector,useDispatch} from 'react-redux'
import {ScrollView, StyleSheet,View,Text,Image,Button,TouchableOpacity, TouchableOpacityComponent} from 'react-native';
import Colors from '../../constants/Colors'
import { TextInput } from 'react-native-gesture-handler';
const EditDocumentScreen = (props) => {
  const documentId = props.navigation.getParam('documentId')
  const document= useSelector(state=> state.documents.userDocuments.find(doc => doc.id ===documentId))
  console.log(document)
  const [tags,setTags] = useState(document.tags)
  const [newTag,setNewTag] = useState("")
  const tagList=tags.map((item,index)=><TouchableOpacity onPress={()=>onDeleteTagHandler(index)}>
    <View style = {styles.tag} key={index} >
      <Text style={styles.tagText}>{item}</Text>
      </View>
      </TouchableOpacity>)
  const updateDocumentHandler=()=>{
    console.log('Updating document')
  }
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
    console.log('im pressed',tags[ind])
      const newTags= tags.filter((item,index)=>index !==ind)
      // setNewTag(input)
      setTags(newTags)
      // e.target.value=''
    }
  

  

  return (
          <ScrollView >
            <Image style = {styles.image} source={{uri:document.url}}/>
              <Text style= {styles.title}>Add/remove tags</Text>
<View style= {styles.tagList}> 
{tagList}
</View>
<View style={styles.form}> 
<Text style={styles.label}>Add tag</Text>
<TextInput style={styles.input} keyboardType='default' onChangeText={inputChangedHandler} value={newTag}></TextInput>
<Button title="Add tag" onPress={addTagHandler}></Button>

</View>
<Button title="Save" onPress={updateDocumentHandler}></Button>

    </ScrollView>)
}
EditDocumentScreen.navigationOptions=(navData)=>{
  return {
    headerTitle: navData.navigation.getParam('documentTitle') 
}
}
const styles = StyleSheet.create({
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
  borderBottomWidth:1
}

});
export default EditDocumentScreen