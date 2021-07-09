import axios from 'axios'
import { localApi } from '../config/api';
import { IAuthModel } from '../models/auth.model';
import jwt from 'jsonwebtoken';

export const loginAPI = (username: string, password: string) => {
	return axios.get<IAuthModel>(localApi.login.replace('{username}', username)).then(u => {
		if (u.data) {
			if (u.data.password === password) {
				let token = jwt.sign({ username: u.data.username }, process.env.REACT_APP_SECRET_CODE + '', { expiresIn: '1h' });
				localStorage.setItem('token', token);
				return u.data.username;
			} else {
				localStorage.removeItem('token');
				return '';
			}
		}
	})
}

export const signUpAPI = (username: string, password: string) => {
	return axios.post<IAuthModel>(localApi.signUp, { username, password })
}

export const logoutAPI = () => {
	localStorage.removeItem('token');
}
