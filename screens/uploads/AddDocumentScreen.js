// import { StatusBar } from 'expo-status-bar';
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
	TextInput,
	StyleSheet,
	View,
	Text,
	TouchableOpacity,
	Image,
	Button,
	FlatList,
	ScrollView,
	Alert,
} from "react-native";
import * as DocumentPicker from "expo-document-picker";
import Colors from "../../constants/Colors";
import Card from "../../components/UI/Card";
import * as documentActions from "../../store/actions/documents";

const AddDocumentScreen = (props) => {
	const [newDocument, setNewDocument] = useState(null);
	const [tagList, setTagList] = useState([]);
	const [newTag, setNewTag] = useState("");
	const userId = useSelector((state) => state.auth.id);
	const token = useSelector((state) => state.auth.token);
	const userTags = useSelector((state) => state.documents.userTags);
	const dispatch = useDispatch();
	const createDocumentHandler = async (doc, tags, userId, token) => {
		console.log(
			"creating document with tags",
			tags,
			"title",
			doc.name,
			"owner",
			userId
		);
		try {
			await dispatch(documentActions.createDocument(doc, tags, userId, token));
			props.navigation.goBack();
		} catch (err) {
			Alert.alert("The document cannot be added", err.message);
		}
	};
	const addTagHandler = () => {
		setTagList([...tagList, newTag]);
		setNewTag("");
	};
	const inputChangedHandler = (input) => {
		setNewTag(input);
	};
	const onDeleteTagHandler = (ind) => {
		console.log("Deleting tag", tagList[ind]);
		const newTagList = tagList.filter((item, index) => index !== ind);
		setTagList(newTagList);
	};
	const onAddPrevTagHandler = (ind) => {
		console.log("adding tag", tagList[ind]);
		const newTagList = tagList.concat(userTags[ind]);
		setTagList(newTagList);
	};
	const tagArray = tagList.map((item, index) => (
		<TouchableOpacity onPress={() => onDeleteTagHandler(index)} key={index}>
			<View style={styles.tag}>
				<Text style={styles.tagText}>{item}</Text>
			</View>
		</TouchableOpacity>
	));
	const renderItem = ({ item }) => {
		return (
			<TouchableOpacity
				onPress={() => onAddPrevTagHandler(item.id)}
				key={item.id}
			>
				<View style={styles.tag}>
					<Text style={styles.tagText}>{item.title}</Text>
				</View>
			</TouchableOpacity>
		);
	};
	const userTagsArray = userTags.map((item, index) => ({
		id: index,
		title: item,
	}));
	const selectFile = async () => {
		// Opening Document Picker to select one file
		try {
			const res = await DocumentPicker.getDocumentAsync();
			console.log("type", res, res.type);

			if (res.type == "success") {
				console.log("EVERYTHING I FINE", res.uri);
				setNewDocument(res);
			} else {
				// setNewDocument({uri:'',name:''})
				setNewDocument(null);
			}
		} catch (err) {
			// setNewDocument({uri:'',name:''})
			setNewDocument(null);

			throw err;
		}
	};

	let documentDetails = <Text>No file picked</Text>;
	let previousTags = null;
let uploadBTN=null
	if (newDocument) {
		documentDetails = (
			<View>
				<View style={styles.imgContainer}>
					<Image style={styles.image} source={{ uri: newDocument.uri }} />
				</View>
				<View style={styles.tagContainer}>
					<Text style={styles.title}>Add/remove tags</Text>
					<ScrollView>
						<View style={styles.tagList}>{tagArray}</View>
					</ScrollView>
					<View style={styles.form}>
						<View style={styles.inputGroup}>
							<TextInput
								style={styles.input}
								keyboardType="default"
								onChangeText={inputChangedHandler}
								value={newTag}
							></TextInput>
							<Button title="Add tag" onPress={addTagHandler}></Button>
						</View>
					</View>
				</View>
			</View>
		);
uploadBTN=(<TouchableOpacity
						style={styles.buttonStyle}
						activeOpacity={0.5}
						onPress={() => {
							createDocumentHandler(newDocument, tagList, userId, token);
						}}
					>
						<Text style={styles.buttonTextStyle}>Upload File</Text>
					</TouchableOpacity>)
		previousTags = (
			<View style={styles.tagContainer}>
				<Text style={styles.title}>Previously used tags</Text>
				<View style={styles.tagList}>
					<FlatList
						data={userTagsArray}
						renderItem={renderItem}
						keyExtractor={(item) => item.id}
						// numColumns={3}
					></FlatList>
				</View>
			</View>
		);
	}

	return (
		<View style={styles.main}>
			<Card style={styles.card}>
				<View style={styles.btnContainer}>
					<TouchableOpacity
						style={styles.buttonStyle}
						activeOpacity={0.5}
						onPress={selectFile}
					>
						<Text style={styles.buttonTextStyle}>Select File</Text>
					</TouchableOpacity>
					{uploadBTN}
				</View>
				{documentDetails}
				{previousTags}
			</Card>
		</View>
	);
};
AddDocumentScreen.navigationOptions = {
	headerTitle: "Please Upload",
};

const styles = StyleSheet.create({
	imgContainer: {
		width: "100%",
		height: "50%",
		borderTopLeftRadius: 10,
		borderTopRightRadius: 10,
		overflow: "hidden",
	},
	main: {
		flex: 1,
		// margin:10,
		// justifyContent:'center'
	},

	card: {
		flex: 1,
		margin: 5,
		// justifyContent:'center',
		// alignItems:'center',
		// height:'100%'
	},
	tagContainer: {
		borderRadius: 8,
		borderWidth: 2,
		borderColor: "grey",
		margin: 5,
		flex: 1,
	},
	inputGroup: {
		flexDirection: "row",
		// justifyContent:'space-between',
		alignItems: "center",
	},
	tagList: {
		flex: 1,
		flexDirection: "row",
		flexWrap: "wrap",
		justifyContent: "center",
		alignItems: "center",
	},
	image: {
		width: "100%",
		height: "100%",
	},
	title: {
		fontSize: 20,
		color: Colors.primary,
		textAlign: "center",
		marginVertical: 20,
	},
	tag: {
		borderRadius: 4,
		borderColor: "grey",
		borderWidth: 2,
		elevation: 3,
		backgroundColor: "white",
		margin: 5,
	},
	tagText: {
		fontSize: 14,
		padding: 5,
	},
	form: {
		margin: 5,
	},
	label: {
		marginVertical: 8,
	},
	input: {
		padding: 5,
		borderBottomColor: "grey",
		borderBottomWidth: 1,
		width: "70%",
	},

	btnContainer: {
		flexDirection: "row",
		marginTop: 5,
	},

	// imgcontainer:{
	//   width:'100%',
	//   height:200,
	//   borderTopLeftRadius:10,
	//   borderTopRightRadius:10,
	//   // overflow:'hidden',
	//   borderColor:'red',
	//   borderWidth:1
	// },

	buttonStyle: {
		borderWidth: 1,
		borderColor: "lightgrey",
		padding: 5,
		margin: 10,
	},
	buttonTextStyle: {
		color: Colors.accent,
	},
});
export default AddDocumentScreen;
