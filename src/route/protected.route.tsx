import { Redirect, Route, RouteProps } from 'react-router-dom'

function ProtectedRoute(props: RouteProps) {
	const isAuthenticated = localStorage.getItem('token') !== null;
	if (isAuthenticated)
		return (
			<Route {...props} />
		);
	else
		return (
			<Redirect to={{ pathname: '/login' }} />
		);
}
export default ProtectedRoute;

