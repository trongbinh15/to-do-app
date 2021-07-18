import './login.style.css';
import React, { Component, createRef } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { RootState } from '../../store/store';
import { Redirect } from 'react-router-dom';
import { ACTIONS } from '../../actions';

export class Login extends Component<PropsFromRedux> {
	usernameRef: React.RefObject<HTMLInputElement>;
	passwordRef: React.RefObject<HTMLInputElement>;

	constructor(props: PropsFromRedux) {
		super(props);
		this.usernameRef = createRef();
		this.passwordRef = createRef();
	}

	handleSubmit = (event: any) => {
		event.preventDefault();
		if (this.usernameRef.current?.value && this.passwordRef.current?.value) {
			this.props.login(
				this.usernameRef.current.value,
				this.passwordRef.current.value,
			);
		}
	};

	render() {
		if (this.props.isAuthenticated) {
			return <Redirect to="/" />;
		} else {
			return (
				<>
					<h1>Login</h1>
					<div className="login-form">
						<form onSubmit={this.handleSubmit}>
							<div className="input-group">
								<label htmlFor="name">Username:</label>
								<input type="text" name="name" ref={this.usernameRef} />
							</div>

							<div className="input-group">
								<label htmlFor="phone">Password:</label>
								<input type="text" name="phone" ref={this.passwordRef} />
							</div>

							<div className="sign-actions">
								<input type="submit" value="Login" />
							</div>
						</form>
					</div>
				</>
			);
		}
	}
}

const mapState = (state: RootState) => {
	const isAuthenticated = state.auth.isAuthenticated;
	return { isAuthenticated };
};

const mapDispatch = {
	login: (username: string, password: string) => ({
		type: ACTIONS.AUTH_LOGIN,
		payload: { username, password },
	}),
};

const connector = connect(mapState, mapDispatch);

type PropsFromRedux = ConnectedProps<typeof connector>;
export default connector(Login);
