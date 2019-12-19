import React from 'react';
import { Store } from '../../store/app.store';
import { Redirect } from 'react-router-dom';
import base64 from 'base-64';
import AppError from '../app-error/app-error.component';
import loginService from '../../services/app-login/app-login.service';

const Login = () => {
	const [ loginUser, setLoginUser ] = React.useState();
	const [ loginPassword, setLoginPassword ] = React.useState();
	const { state, dispatch } = React.useContext(Store);
	const handleSubmit = (e) => {
		e.preventDefault();
		dispatch({ 
			type: 'LOGIN_REQUEST', 
			payload: { 
				loading: 'userlogin'
			}
		});
		const auth = base64.encode(`${loginUser}:${loginPassword}`);
		async function login() {
			const login = await loginService(auth);
			if (login.success) {
				dispatch({
					type: 'LOGIN_SUCCESS',
					payload: {
						loading: null,
						error: null,
						userLogin: {
							loggedIn: true,
							username: loginUser,
							auth
						}
					}
				});
			} else {
				dispatch({
					type: 'FETCH_ERROR',
					payload: login.error
				});
			}
		}
		login();
	}
	return (
		<div>
			{ state.userLogin.loggedIn && <Redirect to='/'/>}
			{ state.error && <AppError/>}
			{ state.loading ? 
				<div>loading</div>
				:
				<form onSubmit={handleSubmit}>
					<div>
						<label htmlFor="loginUser">User name</label>
						<input name="loginUser" type='text' onChange={(e) => setLoginUser(e.target.value)} />
					</div>
					<div>
						<label htmlFor="loginPassword">Password</label>
						<input type='password' name="loginPassword" onChange={(e) => setLoginPassword(e.target.value)} />
					</div>
					<button type="submit">Login</button>
				</form>
			}
		</div>
	)
}
export default Login;