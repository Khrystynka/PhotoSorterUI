import { AUTHENTICATE,LOGOUT } from "../actions/auth";

const initialState = {
	id: null,
	token: null,
	refreshToken: null,
	expiryDate: null,
};
export default (state = initialState, action) => {
	console.log("auth reducer actiontype", action.type);

	switch (action.type) {
		case AUTHENTICATE:
			return {
				token: action.token,
				id: action.userId,
				refreshToken: action.refreshToken,
				expiryDate: action.expiryDate,
			};
		case LOGOUT:
			return {
				token: null,
				id: null,
				refreshToken: null,
				expiryDate: null,
			};
		default:
			return state;
	}
};
