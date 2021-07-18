import axios from 'axios';
import { localApi } from '../config/api';
import { IUser } from '../models/user.model';

export const fetchUsersAPI = () => {
	return axios.get<IUser[]>(localApi.getAllUsers);
};

export const deleteUserAPI = (userId: string) => {
	return axios.delete(localApi.deleteUser.replace('{id}', userId));
};

export const updateUserAPI = (user: IUser) => {
	return axios.put(localApi.updateUser.replace('{id}', user.id), user);
};

export const addUserAPI = (user: IUser) => {
	return axios.post(localApi.addUser, user);
};
