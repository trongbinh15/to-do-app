import { ACTIONS } from '../actions';
import { AuthState } from '../models/auth.model';

export default function auth(
	state: AuthState = { isAuthenticated: false, token: '' },
	action: any,
): any {
	switch (action.type) {
		case ACTIONS.AUTH_LOGIN_SUCCESS:
			return { ...state, isAuthenticated: true, token: action.payload };
		case ACTIONS.AUTH_LOGIN_FAILED:
		case ACTIONS.AUTH_LOGOUT_SUCCESS:
			return { ...state, isAuthenticated: false, token: '' };
		default:
			return state;
	}
}
