import axios from 'axios';
import { localApi } from '../config/api';
import { ITask } from '../models/task.model';

export const fetchTaskAPI = () => {
	return axios.get<ITask[]>(localApi.getAllTasks);
};

export const deleteTaskAPI = (id: string) => {
	return axios.delete(localApi.deleteTask.replace('{id}', id));
};

export const updateTaskAPI = (task: ITask) => {
	return axios.put(localApi.updateTask.replace('{id}', task.id), task);
};

export const addTaskAPI = (task: ITask) => {
	return axios.post(localApi.addTask, task);
};
