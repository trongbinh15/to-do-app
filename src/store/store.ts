import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';
import reducer from '../reducers';
import saga from '../saga';

export const sagaMiddleware = createSagaMiddleware();

export const store = createStore(
	reducer,
	composeWithDevTools(
		applyMiddleware(sagaMiddleware)
	)
);
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

export default store;

sagaMiddleware.run(saga);