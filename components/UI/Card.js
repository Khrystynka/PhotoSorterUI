import React from "react";
import { View, StyleSheet } from "react-native";

const Card = (props) => {
	return (
		<View style={{ ...styles.card, ...props.style }}>{props.children}</View>
	);
};

const styles = StyleSheet.create({
	card: {
		shadowColor: "black",
		shadowOpacity: 0.3,
		shadowOffset: { width: 0, height: 2 },
		shadowRadius: 8,
		elevation: 5,
		borderRadius: 10,
		backgroundColor: "white",
		width: "90%",
		height: "100%",
		// justifyContent: "space-between",
	},
});
export default Card;
