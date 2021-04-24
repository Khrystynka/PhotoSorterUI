import { AUTHENTICATE, LOGOUT } from "../actions/auth";

const initialState = {
	id: null,
	token: null,
	refreshToken: null,
	expiryDate: null,
};
export default (state = initialState, action) => {
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
