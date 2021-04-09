import { AUTHENTICATE } from "../actions/auth";

const initialState = {
	id: null,
	token: null,
	refreshToken: null,
	expiryDate: null,
};
export default (state = initialState, action) => {
	console.log("auth reducer actiontype", action.type);

	console.log("in auth reducer", action.token, action.userId);
	switch (action.type) {
		case AUTHENTICATE:
			return {
				token: action.token,
				id: action.userId,
				refreshToken: action.refreshToken,
				expiryDate: action.expiryDate,
			};
		default:
			return state;
	}
};
