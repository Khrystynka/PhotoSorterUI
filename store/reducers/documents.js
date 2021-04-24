import { CHANGED_DOCUMENTS } from "../actions/documents";
import { LOAD_DOCUMENTS } from "../actions/documents";
import { LOAD_DOCUMENTS_WITH_TAG } from "../actions/documents";

import Document from "../../models/Document";

const initialState = {
	touched: true,
	userDocuments: [],
	userTags: [],
	userDocumentsWithTag: [],
	userSelectedTag: "",
};
export default (state = initialState, action) => {
	switch (action.type) {
		case CHANGED_DOCUMENTS:
			return {
				...state,
				touched: true,
			};

		case LOAD_DOCUMENTS:
			const uploadedDocuments = action.docList.map(
				(item) =>
					new Document(
						item.id.toString(),
						item.user_id.toString(),
						item.title,
						item.tags,
						item.url
					)
			);

			return {
				...state,
				userDocuments: uploadedDocuments,
				userTags: action.tagList,
				touched: false,
			};
		case LOAD_DOCUMENTS_WITH_TAG:
			const uploadedDocumentsWithTag = action.docList.map(
				(item) =>
					new Document(
						item.id.toString(),
						item.user_id.toString(),
						item.title,
						item.tags,
						item.url
					)
			);

			return {
				...state,
				userDocumentsWithTag: uploadedDocumentsWithTag,
				// userTags: action.tagList,
				// touched: false,
			};
		default:
			return state;
	}
};
