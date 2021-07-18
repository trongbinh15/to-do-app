import { ACTIONS } from '../actions';
import { IBase } from '../models/base.model';

export default function base(
	state: IBase = { isLoading: false, error: '' },
	action: any,
): any {
	switch (action.type) {
		case ACTIONS.BASE_API_START:
			return { ...state, isLoading: true };
		case ACTIONS.BASE_API_END:
			return { ...state, isLoading: false, error: '' };
		case ACTIONS.BASE_API_ERROR:
			return { ...state, isLoading: false, error: action.payload };
		default:
			return state;
	}
}
