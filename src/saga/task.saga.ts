import { call, put, SagaReturnType, takeEvery } from 'redux-saga/effects';
import { ACTIONS } from '../actions';
import { addTaskAPI, deleteTaskAPI, fetchTaskAPI, updateTaskAPI } from '../services/task.service';

function* fetchTasks(): any {
	yield put({ type: ACTIONS.BASE_API_START });
	try {
		const res: SagaReturnType<typeof fetchTaskAPI> = yield call(fetchTaskAPI);
		yield put({ type: ACTIONS.TASKS_FETCH_SUCCESS, payload: res.data });
		yield put({ type: ACTIONS.BASE_API_SUCCESS });
	} catch (error) {
		yield put({ type: ACTIONS.TASKS_FETCH_FAILED, message: error.message });
		yield put({ type: ACTIONS.BASE_API_FAILED, payload: error.message });
	}
}

function* deleteTask(action: any): any {
	yield put({ type: ACTIONS.BASE_API_START });
	try {
		yield call(deleteTaskAPI, action.payload);
		yield put({ type: ACTIONS.TASK_DELETE_SUCCESS, payload: action.payload });
		yield put({ type: ACTIONS.BASE_API_SUCCESS });
	} catch (error) {
		yield put({ type: ACTIONS.BASE_API_FAILED, payload: error.message });
	}
}

function* addTask(action: any): any {
	yield put({ type: ACTIONS.BASE_API_START });
	try {
		const res: SagaReturnType<typeof addTaskAPI> = yield call(addTaskAPI, action.payload);
		yield put({ type: ACTIONS.TASK_ADD_SUCCESS, payload: res.data });
		yield put({ type: ACTIONS.BASE_API_SUCCESS });
	} catch (error) {
		yield put({ type: ACTIONS.BASE_API_FAILED, payload: error.message });
	}
}

function* updateTask(action: any): any {
	yield put({ type: ACTIONS.BASE_API_START });
	try {
		const res: SagaReturnType<typeof updateTaskAPI> = yield call(updateTaskAPI, action.payload);
		yield put({ type: ACTIONS.TASK_UPDATE_SUCCESS, payload: res.data });
		yield put({ type: ACTIONS.BASE_API_SUCCESS });
	} catch (error) {
		yield put({ type: ACTIONS.TASK_UPDATE_FAILED, message: error.message });
		yield put({ type: ACTIONS.BASE_API_FAILED, payload: error.message });
	}
}


export function* watchFetchTasks() {
	yield takeEvery(ACTIONS.TASKS_FETCH, fetchTasks);
}

export function* watchDeleteTask() {
	yield takeEvery(ACTIONS.TASK_DELETE, deleteTask);
}

export function* watchAddTask() {
	yield takeEvery(ACTIONS.TASK_ADD, addTask);
}

export function* watchUpdateTask() {
	yield takeEvery(ACTIONS.TASK_UPDATE, updateTask);
}
