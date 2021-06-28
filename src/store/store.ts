import { combineReducers, configureStore } from '@reduxjs/toolkit';
import usersReducer from './slices/usersSlice';
import tasksReducer from './slices/taskSlice';
import baseSlice from './slices/baseSlice';

const rootReducer = combineReducers({
	users: usersReducer,
	tasks: tasksReducer,
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
