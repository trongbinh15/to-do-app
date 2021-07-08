import { ACTIONS } from '../actions';
import { IUser } from '../models/user.model'

export default function users(state: IUser[] = [], action: any) {
	switch (action.type) {
		case ACTIONS.USERS_FETCH_SUCCESS:
			return action.payload;
		case ACTIONS.USERS_FETCH_FAILED:
			return [];
		case ACTIONS.USER_DELETE_SUCCESS:
			return state.filter(u => u.id !== action.payload);
		case ACTIONS.USER_UPDATE_SUCCESS:
			return state.map(u => u.id === action.payload.id ? action.payload : u);
		case ACTIONS.USER_ADD_SUCCESS:
			return [...state, action.payload];
		default:
			return state
	}
}
