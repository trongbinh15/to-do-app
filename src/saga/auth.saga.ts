import { call, put, SagaReturnType, takeEvery } from 'redux-saga/effects';
import { ACTIONS } from '../actions';
import { loginAPI, logoutAPI, signUpAPI } from '../services/auth.service';

function* login(action: any): any {
	try {
		const token: SagaReturnType<typeof loginAPI> = yield call(
			loginAPI,
			action.payload.username,
			action.payload.password,
		);

		if (token) {
			yield put({ type: ACTIONS.AUTH_LOGIN_SUCCESS, payload: token });
		} else {
			yield put({ type: ACTIONS.AUTH_LOGIN_FAILED });
		}

		return token;
	} catch (error) {
		yield put({ type: ACTIONS.AUTH_LOGIN_FAILED });
	}
}

function* logout(): any {
	try {
		yield call(logoutAPI);
		yield put({ type: ACTIONS.AUTH_LOGOUT_SUCCESS });
	} catch (error) {
		yield put({ type: ACTIONS.AUTH_LOGOUT_FAILED });
	}
}

function* signUp(action: any): any {
	try {
		yield call(signUpAPI, action.payload.username, action.payload.password);
	} catch (error) {}
}

export function* watchLogin(): any {
	yield takeEvery(ACTIONS.AUTH_LOGIN, login);
}

export function* watchSignUp(): any {
	yield takeEvery(ACTIONS.AUTH_SIGN_UP, signUp);
}

export function* watchLogout(): any {
	yield takeEvery(ACTIONS.AUTH_LOGOUT, logout);
}
