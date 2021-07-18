import axios from 'axios';
import { localApi } from '../config/api';
import { IAuthModel } from '../models/auth.model';
import jwt from 'jsonwebtoken';

export const loginAPI = async (username: string, password: string) => {
	const u = await axios.get<IAuthModel>(
		localApi.login.replace('{username}', username),
	);
	if (u.data) {
		if (u.data.password === password) {
			const token = jwt.sign(
				{ username: u.data.username },
				process.env.REACT_APP_SECRET_CODE + '',
				{ expiresIn: '1h' },
			);
			localStorage.setItem('token', token);
			return token;
		} else {
			localStorage.removeItem('token');
			return '';
		}
	}
	return '';
};

export const signUpAPI = (username: string, password: string) => {
	return axios.post<IAuthModel>(localApi.signUp, { username, password });
};

export const logoutAPI = () => {
	localStorage.removeItem('token');
};
