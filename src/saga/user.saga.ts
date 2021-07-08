import { call, put, SagaReturnType, takeEvery } from 'redux-saga/effects';
import { ACTIONS } from '../actions';
import { addUserAPI, deleteUserAPI, fetchUsersAPI, updateUserAPI } from '../services/user.service';

function* fetchUsers(): any {
	yield put({ type: ACTIONS.BASE_API_START });
	try {
		const res: SagaReturnType<typeof fetchUsersAPI> = yield call(fetchUsersAPI);
		yield put({ type: ACTIONS.USERS_FETCH_SUCCESS, payload: res.data });
		yield put({ type: ACTIONS.BASE_API_SUCCESS });
	} catch (error) {
		yield put({ type: ACTIONS.USERS_FETCH_FAILED, message: error.message });
		yield put({ type: ACTIONS.BASE_API_FAILED, payload: error.message });
	}
}

function* deleteUser(action: any): any {
	yield put({ type: ACTIONS.BASE_API_START });
	try {
		yield call(deleteUserAPI, action.payload);
		yield put({ type: ACTIONS.USER_DELETE_SUCCESS, payload: action.payload });
		yield put({ type: ACTIONS.BASE_API_SUCCESS });
	} catch (error) {
		yield put({ type: ACTIONS.BASE_API_FAILED, payload: error.message });
	}
}

function* addUser(action: any): any {
	yield put({ type: ACTIONS.BASE_API_START });
	try {
		const res: SagaReturnType<typeof addUserAPI> = yield call(addUserAPI, action.payload);
		yield put({ type: ACTIONS.USER_ADD_SUCCESS, payload: res.data });
		yield put({ type: ACTIONS.BASE_API_SUCCESS });
	} catch (error) {
		yield put({ type: ACTIONS.BASE_API_FAILED, payload: error.message });
	}
}

function* updateUser(action: any): any {
	yield put({ type: ACTIONS.BASE_API_START });
	try {
		const res: SagaReturnType<typeof updateUserAPI> = yield call(updateUserAPI, action.payload);
		yield put({ type: ACTIONS.USER_UPDATE_SUCCESS, payload: res.data });
		yield put({ type: ACTIONS.BASE_API_SUCCESS });
	} catch (error) {
		yield put({ type: ACTIONS.BASE_API_FAILED, payload: error.message });
	}
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
