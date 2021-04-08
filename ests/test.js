import React from "react";
import renderer from "react-test-renderer";
import Card from "../components/UI/Card";
import AllDocs from "../screens/uploads/AllDocumentsScreen";

test("renders correctly", () => {
	const tree = renderer
		.create(<Card style={{ borderColor: "red" }} />)
		.toJSON();
	expect(tree).toMatchSnapshot();
});

test("renders correctly", () => {
	const tree = renderer.create(<AllDocs />).toJSON();
	expect(tree).toMatchSnapshot();
});
