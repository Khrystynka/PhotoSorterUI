// import { StatusBar } from 'expo-status-bar';
import React, { useCallback, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
	StyleSheet,
	View,
	Text,
	Image,
	Button,
	TouchableOpacity,
	FlatList,
	Alert,
} from "react-native";
import Colors from "../../constants/Colors";
import { TextInput } from "react-native-gesture-handler";
import * as documentActions from "../../store/actions/documents";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import HeaderButton from "../../components/UI/HeaderButton";
import Card from "../../components/UI/Card";
const EditDocumentScreen = (props) => {
	console.log("Rendering component EditScreen");
	const token = useSelector((state) => state.auth.token);
	console.log("edit screen token", token);
	const userTags = useSelector((state) => state.documents.userTags);
	const documentId = props.navigation.getParam("documentId");
	console.log('DOCID',documentId)
 
	const document = useSelector((state) =>
		state.documents.userDocuments.find((doc) => doc.id === documentId)
	);
	console.log("Im going to edit this document:", document);
	if (typeof  document === 'undefined') {
		console.log("No document to edit")
		props.navigation.navigate("AllUploads");
	}

	const dispatch = useDispatch();
	const [tags, setTags] = useState(document.tags);
	const [newTag, setNewTag] = useState("");
	const tagList = tags.map((item, index) => (
		<TouchableOpacity onPress={() => onDeleteTagHandler(index)} key={index}>
			<View style={styles.tag}>
				<Text style={styles.tagText}>{item}</Text>
			</View>
		</TouchableOpacity>
	));

	const onAddPrevTagHandler = (ind) => {
		const newTags = tags.concat(userTags[ind]);
		setTags(newTags);
	};

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

	const updateDocumentHandler = useCallback(async () => {
		console.log("Updaing document with tags", tags);
		try {

			await dispatch(documentActions.updateDocument(documentId, tags, token));
			props.navigation.navigate("AllUploads");
		} catch (err) {
			Alert.alert("The problem occured while fetching  documents", err.message);
		}
	}, [dispatch, tags, token]);
	const addTagHandler = () => {
		console.log("Updating document");
		setTags([...tags, newTag]);
		setNewTag("");
	};
	const inputChangedHandler = (input) => {
		setNewTag(input);
	};
	const onDeleteTagHandler = (ind) => {
		console.log("Deleting tag", tags[ind]);
		const newTags = tags.filter((item, index) => index !== ind);
		setTags(newTags);
		// e.target.value=''
	};
	const deleteDocumentHandler = useCallback(async() => {
		console.log('indide deleting document handler')
		  await Alert.alert("Confirm deletion", "Document will be permanently deleted", [
			{ text: "No", style: "default" },
			{
				text: "Yes",
				style: "destructive",
				onPress:  async() => {
					console.log("deleteing document", documentId);
					try {

						await dispatch(documentActions.deleteDocument(documentId, token));



					} catch (err) {
						Alert.alert("An error occured while deleting the document",err);
					}
				},
			},
			]
	
		)
props.navigation.navigate("AllUploads");
	// },[dispatch])
	},[dispatch,documentId,token]);

	useEffect(() => {
		console.log("Inside UseEFFECT");

		props.navigation.setParams({ submit: updateDocumentHandler,delete:deleteDocumentHandler });
		
		
	}, [updateDocumentHandler,deleteDocumentHandler]);

	let previousTags = (
		<View style={styles.tagContainer}>
			<Text style={styles.title}>Previously used tags</Text>
			<View style={styles.tagList}>
				<FlatList
					data={userTagsArray}
					renderItem={renderItem}
					keyExtractor={(item) => item.id.toString()}
					// numColumns={3}
				></FlatList>
			</View>
		</View>
	);

	return (
		<View style={styles.main}>
			<Card style={styles.card}>
				<View style={styles.imgContainer}>
					<Image style={styles.image} source={{ uri: document.url }} />
				</View>
				<View style={styles.tagContainer}>
					<Text style={styles.title}>Add/remove tags</Text>
					<View style={styles.tagList}>{tagList}</View>
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
				{previousTags}
			</Card>
		</View>
	);
};
EditDocumentScreen.navigationOptions = (navData) => {
	const submitFn = navData.navigation.getParam("submit");
	const deleteFn = navData.navigation.getParam("delete");

	return {
		headerTitle: navData.navigation.getParam("documentTitle"),
		headerRight: () => (
			<HeaderButtons HeaderButtonComponent={HeaderButton}>
				<Item title="Save" iconName="md-save" onPress={submitFn} />
				<Item title='Delete' iconName='md-trash' onPress={ deleteFn}/>
			</HeaderButtons>
		),
	};
};
const styles = StyleSheet.create({
	imgContainer: {
		width: "100%",
		// height: "60%",
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
		margin: 10,
		justifyContent: "center",
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
		height: 300,
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
		margin: 20,
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
});
export default EditDocumentScreen;
