import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
export interface CounterState {
	value: number;
	status: 'idle' | 'loading' | 'failed';
}

const initialState: CounterState = {
	value: 0,
	status: 'idle',
};

export function fetchCount(amount = 1) {
	return new Promise<{ data: number }>((resolve, reject) =>
		setTimeout(() => resolve({ data: amount }), 500)
	);
}

export const incrementAsync = createAsyncThunk<number, number, {
	rejectValue: any
}>(
	'counter/fetchCount',
	async (amount: number, thunkApi) => {
		try {
			const response = await fetchCount(amount);
			return response.data;
		} catch (error) {
			console.log('error:', error)
			return thunkApi.rejectWithValue(JSON.stringify(error))
		}
	}
);

export const counterSlice = createSlice({
	name: 'counter',
	initialState,
	// The `reducers` field lets us define reducers and generate associated actions
	reducers: {
		increment: (state) => {
			// Redux Toolkit allows us to write "mutating" logic in reducers. It
			// doesn't actually mutate the state because it uses the Immer library,
			// which detects changes to a "draft state" and produces a brand new
			// immutable state based off those changes
			state.value += 1;
		},
		decrement: (state) => {
			state.value -= 1;
		},
		// Use the PayloadAction type to declare the contents of `action.payload`
		incrementByAmount: (state, action: PayloadAction<number>) => {
			state.value += action.payload;
		},
	},
	// The `extraReducers` field lets the slice handle actions defined elsewhere,
	// including actions generated by createAsyncThunk or in other slices.
	extraReducers: (builder) => {
		builder
			.addCase(incrementAsync.pending, (state) => {
				state.status = 'loading';
			})
			.addCase(incrementAsync.fulfilled, (state, action) => {
				state.status = 'idle';
				state.value += action.payload;
			})
			.addCase(incrementAsync.rejected, (state, action) => {
				console.log('action:', action);
				state.status = 'failed';
			});
	},
})

export default counterSlice.reducer;

export const { increment, decrement, incrementByAmount } = counterSlice.actions;