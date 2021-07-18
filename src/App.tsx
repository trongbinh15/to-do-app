import './App.css';
import { Component } from 'react';
import { Switch, Route, Link, Redirect } from 'react-router-dom';
import UserList from './components/UserList/user-list';
import UserDetail from './components/UserDetail/user-detail';
import Spinner from './components/Spinner/spinner';
import { RootState } from './store/store';
import { connect, ConnectedProps } from 'react-redux';
import ProtectedRoute from './route/protected.route';
import Login from './components/Login/login';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { ACTIONS } from './actions';

class App extends Component<PropsFromRedux> {
	verifyAuth = () => {
		const token = localStorage.getItem('token');
		if (token) {
			try {
				const decoded = jwt.verify(
					token,
					process.env.REACT_APP_SECRET_CODE + '',
				) as JwtPayload;
				this.props.loginSuccess(decoded.username);
			} catch (error) {
				this.props.loginFailed();
			}
		}
	};

	componentDidMount() {
		this.verifyAuth();
	}

	render() {
		return (
			<div className="container">
				{this.props.isAuthenticated ? (
					<nav>
						<ul>
							<li>
								<Link to="/">Home</Link>
							</li>
							<li>
								<Link to="/users">Users</Link>
							</li>
							<li>
								<span>Hi, {this.props.username}</span>
								<button
									className="logout-btn"
									onClick={() => this.props.logout()}
								>
									Logout
								</button>
							</li>
						</ul>
					</nav>
				) : (
					''
				)}
				<Switch>
					<ProtectedRoute exact path="/users" component={UserList} />
					<ProtectedRoute path="/users/:id" component={UserDetail} />
					<Route exact path="/">
						<Redirect to="/users" />
					</Route>
					<Route path="/login" component={Login} />
					<Route path="*">
						<h1>Page not found!</h1>
					</Route>
				</Switch>
				{this.props.isLoading ? <Spinner /> : ''}
			</div>
		);
	}
}

const mapState = (state: RootState) => {
	const isLoading = state.base.isLoading;
	const isAuthenticated = state.auth.isAuthenticated;
	const username = state.auth.username;
	return { isLoading, isAuthenticated, username };
};

const mapDispatch = {
	loginSuccess: (username: string) => ({
		type: ACTIONS.AUTH_LOGIN_SUCCESS,
		payload: username,
	}),
	loginFailed: () => ({ type: ACTIONS.AUTH_LOGIN_FAILED }),
	logout: () => ({ type: ACTIONS.AUTH_LOGOUT }),
};

const connector = connect(mapState, mapDispatch);

type PropsFromRedux = ConnectedProps<typeof connector>;
export default connector(App);
