export const CHANGED_DOCUMENTS = "CHANGED_DOCUMENTS";
// export const DELETE_DOCUMENT ='DELETE_DOCUMENT'
// export const CREATE_DOCUMENT = 'CREATE_DOCUMENT'
export const LOAD_DOCUMENTS = "LOAD_DOCUMENTS";
export const LOAD_DOCUMENTS_WITH_TAG = "LOAD_DOCUMENTS_WITH_TAG";

export const uploadDocumentsWithTag = (name, token) => {
	return async (dispatch) => {
		try {
			const docsResp = await fetch(
				"https://doc-organizer.herokuapp.com/for_tag_get_uploads",
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${token}`,
					},
					body: JSON.stringify({
						tag: name,
					}),
				}
			);
			const docsData = await docsResp.json();
			if (!docsResp.ok) {
				throw new Error("No uploads found for current tag");
			} else {
				dispatch({
					type: LOAD_DOCUMENTS_WITH_TAG,
					docList: docsData,
				});
			}
		} catch (err) {
			throw err;
		}
	};
};
export const deleteDocument = (documentId, token) => {
	return async (dispatch) => {
		try {
			const response = await fetch(
				"https://doc-organizer.herokuapp.com/delete",
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${token}`,
					},
					body: JSON.stringify({
						documentId: documentId,
					}),
				}
			);
			const resData = await response.json();
			if (!response.ok) {
				throw new Error("Please check your credentials");
			} else {
				dispatch({
					type: CHANGED_DOCUMENTS,
				});
				// dispatch(loadDocuments(token))}
			}
		} catch (err) {
			throw err;
		}
	};
};
export const createDocument = (doc, tags, userId, token) => {
	let data = new FormData();
	const filename = doc.uri.split("/").pop();
	data.append("file", {
		uri: doc.uri,

		type: "image/jpg",
		// name: doc.name, // example: upload.jpg
		name: filename,
	});

	let tags_str = tags.reduce((s, value) => s + "," + value, "").slice(1);
	data.append("tags", tags_str);

	return async (dispatch) => {
		try {
			const resp = await fetch("https://doc-organizer.herokuapp.com/upload", {
				method: "POST",
				headers: {
					Accept: "application/json",
					"Content-Type": "multipart/form-data",

					Authorization: `Bearer ${token}`,
				},
				body: data,
			});

			if (!resp.ok) {
				throw new Error("An error occured while uloading");
			} else {
				// dispatch(loadDocuments(userId,token))
				dispatch({
					type: CHANGED_DOCUMENTS,
				});
			}
		} catch (err) {
			throw err;
		}
	};
};
export const updateDocument = (documentId, tags, token) => {
	return async (dispatch) => {
		try {
			const response = await fetch(
				"https://doc-organizer.herokuapp.com/modify_tags",
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${token}`,
					},
					body: JSON.stringify({
						documentId: documentId,
						tags: tags,
					}),
				}
			);
			if (!response.ok) {
				throw new Error("Please check your credentials");
			} else {
				dispatch({
					type: CHANGED_DOCUMENTS,
				});
			}
		} catch (err) {
			throw err;
		}
	};
};
export const loadDocuments = (token) => {
	return async (dispatch) => {
		try {
			const docsResp = await fetch(
				"https://doc-organizer.herokuapp.com/get_uploads",
				{
					method: "GET",
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${token}`,
					},
				}
			);
			const docsData = await docsResp.json();
			const tagsResp = await fetch(
				"https://doc-organizer.herokuapp.com/get_tags",
				{
					method: "GET",
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${token}`,
					},
				}
			);
			const tagsData = await tagsResp.json();

			if (!docsResp.ok) {
				throw new Error("No uploads found for current user");
			} else if (!tagsResp.ok) {
				throw new Error("No tags found for current user");
			} else {
				dispatch({
					type: LOAD_DOCUMENTS,
					docList: docsData,
					tagList: tagsData,
				});
			}
		} catch (err) {
			throw err;
		}
	};
};
