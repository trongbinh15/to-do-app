import axios, { AxiosRequestConfig } from 'axios';


export class BaseService {
	get(url: string, config?: AxiosRequestConfig) {
		return axios.get(url, config);
	}

	post(url: string, data?: any, config?: AxiosRequestConfig) {
		return axios.post(url, data, config);
	}

	put(url: string, data: any, config?: AxiosRequestConfig) {
		return axios.put(url, data, config);
	}

	delete(url: string, config?: AxiosRequestConfig) {
		return axios.delete(url, config);
	}
}