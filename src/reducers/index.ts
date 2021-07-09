import { combineReducers } from 'redux';
import users from './user.reducer';
import tasks from './task.reducer';
import base from './base.reducer';
import auth from './auth.reducer';

export default combineReducers({
	users,
	tasks,
	auth,
	base
});