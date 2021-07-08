import { combineReducers } from 'redux';
import users from './user.reducer';
import tasks from './task.reducer';
import base from './base.reducer';

export default combineReducers({
	users,
	tasks,
	base
});