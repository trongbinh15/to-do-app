import { call, put, SagaReturnType, takeEvery } from 'redux-saga/effects';
import { ACTIONS } from '../actions';
import { loginAPI, logoutAPI, signUpAPI } from '../services/auth.service';


function* login(action: any): any {
	yield put({ type: ACTIONS.BASE_API_START });
	try {
		const res: SagaReturnType<typeof loginAPI> = yield call(loginAPI, action.payload.username, action.payload.password);
		if (res) {
			yield put({ type: ACTIONS.AUTH_LOGIN_SUCCESS, payload: res });
		}
		else {
			yield put({ type: ACTIONS.AUTH_LOGIN_FAILED });
		}

		yield put({ type: ACTIONS.BASE_API_SUCCESS });
	} catch (error) {
		yield put({ type: ACTIONS.AUTH_LOGIN_FAILED });
		yield put({ type: ACTIONS.BASE_API_FAILED, payload: error.message });
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
	yield put({ type: ACTIONS.BASE_API_START });
	try {
		yield call(signUpAPI, action.payload.username, action.payload.password);
		yield put({ type: ACTIONS.BASE_API_SUCCESS });
	} catch (error) {
		yield put({ type: ACTIONS.BASE_API_FAILED, payload: error.message });
	}
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