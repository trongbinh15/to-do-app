export const localApi = {
	getAllUsers: '/db_users',
	getUserById: '/db_users/{id}',
	addUser: '/db_users',
	updateUser: '/db_users/{id}',
	deleteUser: '/db_users/{id}',

	getAllTasks: '/db_tasks',
	getTaskById: '/db_tasks/{id}',
	addTask: '/db_tasks',
	updateTask: '/db_tasks/{id}',
	deleteTask: '/db_tasks/{id}',

	login: '/auth?username={username}',
	signUp: '/auth',
};
