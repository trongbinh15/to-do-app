
import { all, call } from 'redux-saga/effects'
import { watchLogin, watchLogout, watchSignUp } from './auth.saga';
import { watchAddTask, watchDeleteTask, watchFetchTasks, watchUpdateTask } from './task.saga';
import { watchAddUser, watchDeleteUser, watchFetchUsers, watchUpdateUser } from './user.saga';

export default function* rootSaga() {
	yield all([
		call(watchFetchUsers),
		call(watchDeleteUser),
		call(watchAddUser),
		call(watchUpdateUser),
		call(watchFetchTasks),
		call(watchAddTask),
		call(watchDeleteTask),
		call(watchUpdateTask),
		call(watchLogin),
		call(watchSignUp),
		call(watchLogout),
	]);
}