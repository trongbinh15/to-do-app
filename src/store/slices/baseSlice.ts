import { createSlice, isFulfilled, isPending, isRejected } from '@reduxjs/toolkit';
import { addUserAsync, deleteUserAsync, fetchUsersAsync, updateUserAsync } from './usersSlice';

type BaseState = {
	loading: boolean;
	error: string;
}

const initialState: BaseState = {
	loading: false,
	error: ''
};

const baseSlice = createSlice({
	name: 'base',
	initialState,
	reducers: {

	},
	extraReducers: (builder) => {
		builder
			.addMatcher(
				isPending(fetchUsersAsync, deleteUserAsync, addUserAsync, updateUserAsync),
				(state) => {
					state.loading = true;
					state.error = '';
				}
			)

			.addMatcher(
				isFulfilled(fetchUsersAsync, deleteUserAsync, addUserAsync, updateUserAsync),
				(state) => {
					state.loading = false;
					state.error = '';
				}
			)

			.addMatcher(
				isRejected(fetchUsersAsync, deleteUserAsync, addUserAsync, updateUserAsync),
				(state, action) => {
					state.loading = false;
					state.error = '' + action.payload;
				}
			)
	}
});

export default baseSlice.reducer;
