// import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect, useCallback } from "react";
import {
	FlatList,
	StyleSheet,
	View,
	Alert,
	ActivityIndicator,
	Text,
	Button,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import DocumentItem from "../../components/DocumentItem";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import HeaderButton from "../../components/UI/HeaderButton";
import * as documentActions from "../../store/actions/documents";
import Colors from "../../constants/Colors";

const AllDocumentsWithTagScreen = (props) => {
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState();
	const token = useSelector((state) => state.auth.token);
	console.log(props.navigation);
	const tagName = props.navigation.getParam("tagName");
	// const tagName = "bench";
	console.log("tags name passed to ALLDwt screen", tagName);

	const documents = useSelector(
		(state) => state.documents.userDocumentsWithTag
	);
	const dispatch = useDispatch();
	const loadDocumentsWithTag = useCallback(async () => {
		setError(null);
		setIsLoading(true);
		try {
			console.log("useeffect from alldocuments screen", tagName);

			await dispatch(documentActions.uploadDocumentsWithTag(tagName, token));
		} catch (err) {
			console.log("error from alldocs component,useEffect", err.message);
			setError(err.message);
		}
		setIsLoading(false);
	}, [token, dispatch]);
	useEffect(() => {
		console.log("inside useeff1");
		const tagName = props.navigation.getParam("tagName");

		console.log("inside useeffect", tagName);
		loadDocumentsWithTag();
	}, [dispatch, loadDocumentsWithTag, tagName, token]);

	if (isLoading) {
		return (
			<View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
				<ActivityIndicator size="large" color={Colors.accent} />
				<Text color={Colors.accent}>Loading documents...</Text>
			</View>
		);
	}
	if (error) {
		return (
			<View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
				<Text color={Colors.accent}>Something went wrong</Text>
				<Button onPress={() => loadDocumentsWithTag()} title="Try again!" />
			</View>
		);
	}
	if (!isLoading && documents.length == 0) {
		return (
			<View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
				<Text color={Colors.accent}>No uploaded documents.</Text>
			</View>
		);
	}
	const deleteDocumentHandler = (docId, token) => {
		// console.log(documentId,tags)
		// dispatch(documentActions.updateDocument(documentId,tags))
		Alert.alert("Confirm deletion", "Document will be permanently deleted", [
			{ text: "No", style: "default" },
			{
				text: "Yes",
				style: "destructive",
				onPress: async () => {
					console.log("deleteing document", docId);
					try {
						await dispatch(documentActions.deleteDocument(docId, token));
						props.navigation.goBack();
					} catch (err) {
						Alert.alert("An error occured while deleting the document");
					}
				},
			},
			{ text: "Maybe", style: "default" },
		]);
	};
	return (
		<View style={styles.screen}>
			<FlatList
				data={documents}
				keyExtractor={(item) => item.id}
				renderItem={(itemData) => (
					<DocumentItem
						url={itemData.item.url}
						title={itemData.item.title}
						tags={itemData.item.tags}
						onChangeTags={() =>
							props.navigation.navigate("EditDocument", {
								documentId: itemData.item.id,
								documentTitle: itemData.item.title,
							})
						}
						onDeleteDocument={() =>
							deleteDocumentHandler(itemData.item.id, token)
						}
					></DocumentItem>
				)}
			></FlatList>
		</View>
	);
};
AllDocumentsWithTagScreen.navigationOptions = (navData) => {
	const tag = navData.navigation.getParam("tagName");
	// const tag = "Aloha";

	return {
		headerTitle: `Your Uploads marked with ${tag}`,
		// headerRight: () => (
		// 	<HeaderButtons HeaderButtonComponent={HeaderButton}>
		// 		<Item
		// 			title="Add new"
		// 			iconName="md-add"
		// 			onPress={() => {
		// 				console.log("adding new docs");
		// 				navData.navigation.navigate("AddDocument");
		// 			}}
		// 		/>
		// 		{/* <Item title='Delete' iconName='md-trash' onPress={deleteFn}/> */}
		// 	</HeaderButtons>
		// ),
	};
};
const styles = StyleSheet.create({
	screen: {
		flex: 1,
		// width:'100%',
		justifyContent: "center",
		// alignItems:'center'
	},
});
export default AllDocumentsWithTagScreen;
