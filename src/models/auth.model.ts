export interface IAuthModel {
	username: string;
	password: string;
}

export interface AuthState {
	isAuthenticated: boolean;
	username: string;
}