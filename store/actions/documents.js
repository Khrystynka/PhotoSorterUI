export const CHANGED_DOCUMENTS = "CHANGED_DOCUMENTS";
// export const DELETE_DOCUMENT ='DELETE_DOCUMENT'
// export const CREATE_DOCUMENT = 'CREATE_DOCUMENT'
export const LOAD_DOCUMENTS = "LOAD_DOCUMENTS";
export const LOAD_DOCUMENTS_WITH_TAG = "LOAD_DOCUMENTS_WITH_TAG";

export const uploadDocumentsWithTag = (name, token) => {
	console.log("inside loaddocs with tags action creator", token);

	return async (dispatch) => {
		try {
			console.log(
				"+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++"
			);
			console.log("Reaching flask get_uploadds");
			const docsResp = await fetch(
				"http://127.0.0.1:5000/for_tag_get_uploads",
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
			console.log(err, err.message);
			throw err;
		}
	};
};
export const deleteDocument = (documentId, token) => {
	console.log("token from delete", token, documentId);
	return async (dispatch) => {
		try {
			const response = await fetch("http://127.0.0.1:5000/delete", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
				body: JSON.stringify({
					documentId: documentId,
				}),
			});
			const resData = await response.json();
			console.log(resData);
			if (!response.ok) {
				throw new Error("Please check your credentials");
			} else {
				console.log("succes");
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
	console.log(doc, "tags", tags);
	let data = new FormData();
	type = "*";
	const fileEnding = doc.name.split(".").pop();
	data.append("file", {
		uri: doc.uri, // this is the path to your file. see Expo ImagePicker or React Native ImagePicker
		type: `${type}/${fileEnding}`, // example: image/jpg
		name: doc.name, // example: upload.jpg
	});

	let tags_str = tags.reduce((s, value) => s + "," + value, "").slice(1);
	console.log("here are my tags i one string", tags_str);
	data.append("tags", tags_str);
	console.log(typeof tags_str);

	return async (dispatch) => {
		try {
			const resp = await fetch("http://127.0.0.1:5000/upload", {
				method: "POST",
				headers: {
					Accept: "application/json",
					"Content-Type": "multipart/form-data",

					Authorization: `Bearer ${token}`,
				},
				body: data,
			});
			const respData = await resp.json();
			console.log(
				respData["upload_id"],
				typeof respData["upload_id"],
				userId,
				typeof userId
			);

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
	console.log("token from updatedoc", token);
	return async (dispatch) => {
		try {
			const response = await fetch("http://127.0.0.1:5000/modify_tags", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
				body: JSON.stringify({
					documentId: documentId,
					tags: tags,
				}),
			});
			const resData = await response.json();
			console.log(resData);
			if (!response.ok) {
				throw new Error("Please check your credentials");
			} else {
				console.log("succes");
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
	console.log("inside loaddocs action creator", token);

	return async (dispatch) => {
		try {
			console.log(
				"+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++"
			);
			console.log("Reaching flask get_uploadds");
			const docsResp = await fetch("http://127.0.0.1:5000/get_uploads", {
				method: "GET",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
			});
			const docsData = await docsResp.json();
			const tagsResp = await fetch("http://127.0.0.1:5000/get_tags", {
				method: "GET",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
			});
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
			console.log(err, err.message);
			throw err;
		}
	};
};
