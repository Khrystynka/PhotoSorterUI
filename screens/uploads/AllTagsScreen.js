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
const AllTagsScreen = (props) => {
	const token = useSelector((state) => state.auth.token);
	const userTags = useSelector((state) => state.documents.userTags);
	const dispatch = useDispatch();
	// const tagList = tags.map((item, index) => (
	// 	<TouchableOpacity onPress={() => onDeleteTagHandler(index)} key={index}>
	// 		<View style={styles.tag}>
	// 			<Text style={styles.tagText}>{item}</Text>
	// 		</View>
	// 	</TouchableOpacity>
	// ));
	const onSelectTagHandler = async (name) => {
		console.log("Selected tag:", name);
		// props.navigation.setParams({ tagName: name });
		props.navigation.navigate("AllDocumentsWithTag", { tagName: name });
	};
	const renderItem = ({ item }) => {
		return (
			<TouchableOpacity
				onPress={() => onSelectTagHandler(item.title)}
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

	// const updateDocumentHandler = useCallback(async () => {
	// 	console.log("Updaing document with tags", tags);
	// 	try {
	// 		console.log("Docs for this tag");
	// 		// await dispatch(documentActions.updateDocument(documentId, tags, token));
	// 		// props.navigation.goBack();
	// 	} catch (err) {
	// 		Alert.alert(
	// 			"The problem occured while updating the document",
	// 			err.message
	// 		);
	// 	}
	// }, [dispatch, tags, token]);

	// const onDeleteTagHandler = (ind) => {
	// 	console.log("Deleting tag", tags[ind]);
	// 	const newTags = tags.filter((item, index) => index !== ind);
	// 	setTags(newTags);
	// 	// e.target.value=''
	// };

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
			<Card style={styles.card}>{previousTags}</Card>
		</View>
	);
};
AllTagsScreen.navigationOptions = (navData) => {
	// const submitFn = navData.navigation.getParam("submit");

	return {
		headerTitle: "Your tags:",
		// headerRight: () => (
		// 	<HeaderButtons HeaderButtonComponent={HeaderButton}>
		// 		<Item title="Save" iconName="md-save" onPress={submitFn} />
		// 		{/* <Item title='Delete' iconName='md-trash' onPress={deleteFn}/> */}
		// 	</HeaderButtons>
		// ),
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
export default AllTagsScreen;
