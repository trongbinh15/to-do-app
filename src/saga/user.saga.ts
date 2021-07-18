import { call, put, SagaReturnType, takeEvery } from 'redux-saga/effects';
import { ACTIONS } from '../actions';
import {
	addUserAPI,
	deleteUserAPI,
	fetchUsersAPI,
	updateUserAPI,
} from '../services/user.service';

function* fetchUsers(): any {
	try {
		const res: SagaReturnType<typeof fetchUsersAPI> = yield call(fetchUsersAPI);
		yield put({ type: ACTIONS.USERS_FETCH_SUCCESS, payload: res.data });
	} catch (error) {
		yield put({ type: ACTIONS.USERS_FETCH_FAILED, message: error.message });
	}
}

function* deleteUser(action: any): any {
	try {
		yield call(deleteUserAPI, action.payload);
		yield put({ type: ACTIONS.USER_DELETE_SUCCESS, payload: action.payload });
	} catch (error) {}
}

function* addUser(action: any): any {
	try {
		const res: SagaReturnType<typeof addUserAPI> = yield call(
			addUserAPI,
			action.payload,
		);
		yield put({ type: ACTIONS.USER_ADD_SUCCESS, payload: res.data });
	} catch (error) {}
}

function* updateUser(action: any): any {
	try {
		const res: SagaReturnType<typeof updateUserAPI> = yield call(
			updateUserAPI,
			action.payload,
		);
		yield put({ type: ACTIONS.USER_UPDATE_SUCCESS, payload: res.data });
	} catch (error) {}
}

export function* watchFetchUsers() {
	yield takeEvery(ACTIONS.USERS_FETCH, fetchUsers);
}

export function* watchDeleteUser() {
	yield takeEvery(ACTIONS.USER_DELETE, deleteUser);
}

export function* watchAddUser() {
	yield takeEvery(ACTIONS.USER_ADD, addUser);
}

export function* watchUpdateUser() {
	yield takeEvery(ACTIONS.USER_UPDATE, updateUser);
}
