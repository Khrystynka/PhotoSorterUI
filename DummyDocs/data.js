import Document from "../models/Document";
const DummyUrl =
	"https://media.istockphoto.com/photos/mountain-landscape-picture-id517188688?k=6&m=517188688&s=612x612&w=0&h=jQKl_eDUwg4hCXjl4X5i6FPuTw-V-NfEOtLkvsrgC3Y=";
const DOCUMENTS = [
	new Document(
		"doc1",
		"u1",
		"Document1",
		["mama", "tato", "tina", "melanka"],
		DummyUrl
	),

	new Document(
		"doc2",
		"u1",
		"Document2",
		["mama", "tato", "melanka"],
		DummyUrl
	),

	new Document(
		"doc3",
		"u1",
		"Document3",
		["mama", "tina", "melanka"],
		DummyUrl
	),

	new Document("doc4", "u1", "Document4", ["tina", "melanka"], DummyUrl),

	new Document("doc5", "u2", "Document5", ["melanka"], DummyUrl),
];
export default DOCUMENTS;
