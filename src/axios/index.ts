import axios from 'axios';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { ACTIONS } from '../actions';
import store from '../store/store';

axios.interceptors.request.use(
	function (config) {
		// Do something before request is sent
		verifyAuth();
		triggerApiStart();
		return config;
	},
	function (error) {
		// Do something with request error
		triggerApiError(error);
		return Promise.reject(error);
	},
);

// Add a response interceptor
axios.interceptors.response.use(
	function (response) {
		// Any status code that lie within the range of 2xx cause this function to trigger
		// Do something with response data
		triggerApiEnd();
		return response;
	},
	function (error) {
		// Any status codes that falls outside the range of 2xx cause this function to trigger
		// Do something with response error
		triggerApiError(error);
		return Promise.reject(error);
	},
);

const verifyAuth = () => {
	const token = localStorage.getItem('token');
	if (token) {
		try {
			jwt.verify(token, process.env.REACT_APP_SECRET_CODE + '') as JwtPayload;
		} catch (error) {
			localStorage.removeItem('token');
		}
	}
};

function triggerApiStart() {
	store.dispatch({ type: ACTIONS.BASE_API_START });
}

function triggerApiEnd() {
	store.dispatch({ type: ACTIONS.BASE_API_END });
}

function triggerApiError(error: any) {
	store.dispatch({ type: ACTIONS.BASE_API_ERROR, payload: error.message });
}

export default function setupInterceptorAxios() {}
