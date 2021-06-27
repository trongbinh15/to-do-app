import { combineReducers, configureStore } from '@reduxjs/toolkit';
import usersReducer from './slices/usersSlice';
import counterReducer from './slices/counterSlice';
import baseSlice from './slices/baseSlice';

const rootReducer = combineReducers({
	users: usersReducer,
	counter: counterReducer,
	base: baseSlice
});

const store = configureStore({
	reducer: rootReducer
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

export default store;
