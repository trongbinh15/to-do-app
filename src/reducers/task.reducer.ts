import { ACTIONS } from '../actions';

export default function tasks(state: any[] = [], action: any) {
	switch (action.type) {
		case ACTIONS.TASKS_FETCH_SUCCESS:
			return action.payload;
		case ACTIONS.TASKS_FETCH_FAILED:
			return [];
		case ACTIONS.TASK_DELETE_SUCCESS:
			return state.filter((task) => task.id !== action.payload);
		case ACTIONS.TASK_UPDATE_SUCCESS:
			return state.map((task) =>
				task.id === action.payload.id ? action.payload : task,
			);
		case ACTIONS.TASK_ADD_SUCCESS:
			return [...state, action.payload];
		default:
			return state;
	}
}
