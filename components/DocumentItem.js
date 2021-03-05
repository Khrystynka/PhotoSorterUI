import React from 'react';
import {View,Text,Image,StyleSheet,Button,TouchableOpacity} from 'react-native'
import Colors from '../constants/Colors'
import Card from '../components/UI/Card'
const DocumentItem = props => {
    const tagList = props.tags.map((tag,ind) => <View style={styles.tag} key={ind}><Text  style={styles.tagText}>{tag}</Text></View>)
    return <TouchableOpacity onPress={props.onChangeTags}> 
        <Card style={styles.document}>
        <View style={styles.imgcontainer}> 
        <Image style= {styles.image} source={{uri:props.url}}/>
        </View>
        <View style={styles.details}>
        <Text style={styles.title}>{props.title}</Text>
        <View style={styles.tagsContainer}>{tagList}</View>
        </View>
        <View style={styles.btncontainer}>
            <Button title="Change Tags" color={Colors.primary} onPress={props.onChangeTags}/>
            <Button title="Delete" color='red' onPress={props.onDeleteDocument}/>

        </View>


    </Card>
</TouchableOpacity>    
    

}
const styles =StyleSheet.create({
    document:{
        margin:20,


height:300
    },
    imgcontainer:{
        width:'100%',
        height:'60%',
        borderTopLeftRadius:10,
        borderTopRightRadius:10,
        overflow:'hidden'
    },
    title:{
        // fontFamily:'open-sans-bold',
        marginVertical:8
    },
    image:{
        width:'100%',
        height:'100%'
    },
    title:{
      fontSize:18,
      marginVertical:  4
    },
    tagText:{
        fontSize:12,
        color:Colors.accent,
        padding:5
    },
    tag:{
        // shadowColor:'black',
        // shadowOpacity:0.3,
        // shadowOffset:{width:0,height:1},
        // shadowRadius:1,
        borderRadius:4,
        borderColor:'grey',
        borderWidth:2,
        elevation:3, 
        backgroundColor:'white',
        margin:5
    },
    tagsContainer:{
        flexDirection: 'row',
        justifyContent:'space-between',
        alignItems:'center',
        // height:'25%',
        // paddingHorizontal:20
    },
    btncontainer:{
       flexDirection: 'row',
       justifyContent:'space-between',
       alignItems:'center',
         height:'15%',
       paddingHorizontal:8
    },
    details:{
        alignItems:'center',
        height:'25%',
        padding:10
    }

})
export default DocumentItem