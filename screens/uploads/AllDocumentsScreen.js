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

const AllDocumentsScreen = (props) => {
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState();
	const token = useSelector((state) => state.auth.token);
	const documentsChanged = useSelector((state) => state.documents.touched);
	const documents = useSelector((state) => state.documents.userDocuments);
	const dispatch = useDispatch();
	const loadDocuments = useCallback(async () => {
		setError(null);
		setIsLoading(true);
		try {
			if (documentsChanged) {
				await dispatch(documentActions.loadDocuments(token));
			}
		} catch (err) {
			setError(err.message);
		}
		setIsLoading(false);
	}, [token, documentsChanged, dispatch]);
	useEffect(() => {
		loadDocuments();
	}, [dispatch, loadDocuments, token, documentsChanged]);

	const deleteDocumentHandler = (docId, token) => {
		Alert.alert("Confirm deletion", "Document will be permanently deleted", [
			{ text: "No", style: "default" },
			{
				text: "Yes",
				style: "destructive",
				onPress: async () => {
					try {
						await dispatch(documentActions.deleteDocument(docId, token));
					} catch (err) {
						Alert.alert("An error occured while deleting the document");
					}
				},
			},
		]);
	};
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
				<Button onPress={() => loadDocuments()} title="Try again!" />
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

	return (
		<View style={styles.screen}>
			<FlatList
				data={documents}
				keyExtractor={(item) => String(item.id)}
				renderItem={(itemData) => (
					<DocumentItem
						url={itemData.item.url}
						title={String(itemData.item.title)}
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
AllDocumentsScreen.navigationOptions = (navData) => {
	// const submitFn = navData.navigation.getParam('submit');

	return {
		headerTitle: "Your Uploads",
		headerLeft: () => (
			<HeaderButtons HeaderButtonComponent={HeaderButton}>
				<Item
					title="Menu"
					iconName={Platform.OS === "android" ? "md-menu" : "ios-menu"}
					onPress={() => {
						navData.navigation.toggleDrawer();
					}}
				>
					Menu
				</Item>
				{/* <Item title='Delete' iconName='md-trash' onPress={deleteFn}/> */}
			</HeaderButtons>
		),
		headerRight: () => (
			<View style={styles.headerRight}>
				<HeaderButtons HeaderButtonComponent={HeaderButton}>
					<Item
						title="Add new"
						iconName={Platform.OS === "android" ? "md-add" : "ios-add"}
						onPress={() => {
							navData.navigation.navigate("AddDocument");
						}}
					/>
					{/* <Item title='Delete' iconName='md-trash' onPress={deleteFn}/> */}
				</HeaderButtons>
			</View>
		),
	};
};
const styles = StyleSheet.create({
	screen: {
		flex: 1,
		// width:'100%',
		justifyContent: "center",
		// alignItems:'center'
	},
	headerRight: {
		flex: 1,
		flexDirection: "row",
		// flexWrap: "wrap",

		justifyContent: "center",
		alignItems: "center",
		// justifyContent: "center",
		// alignItems:'center'
	},
});
export default AllDocumentsScreen;
