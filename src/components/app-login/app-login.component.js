import React from 'react';
import { Store } from '../../store/app.store';
import { Redirect } from 'react-router-dom';
import base64 from 'base-64';
import AppError from '../app-error/app-error.component';
import AppLoading from '../app-loading/app-loading.component';
import AppHeader from '../app-header/app-header.component';
import { FormButton, FormInput, FormLabel } from '../app-forms-ui/';
import loginService from '../../services/app-login/app-login.service';
import styled from 'styled-components';

const FormTitle = styled.h1`
	text-align: center;
	color: #b6b0b0;
	font-weight: 100;
	font-size: 3rem;
	height: 20vh;
	align-content: center;
	display: flex;
	justify-content: space-around;
	align-items: center;
`;
const LoginScreen = styled.div`
	display: flex;
	justify-items: stretch;
	flex-direction: column;
`;
const LoginForm = styled.form`
	background-color: #f1f1f1;
	height: 80vh;
`;
const LoginFormInner = styled.div`
	margin: 0 auto;
	max-width: 500px;
	padding: 2rem;
`;
const LoginFormActions = styled.div`
	margin: 1rem 0;
`;
const Login = () => {
	const [loginUser, setLoginUser] = React.useState();
	const [loginPassword, setLoginPassword] = React.useState();
	const { state, dispatch } = React.useContext(Store);
	React.useEffect(() => {
		if (state.userLogin.loggedIn) {
			localStorage.setItem('dmiBooklist', JSON.stringify(state));
		}
	}, [state.userLogin.loggedIn]);
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
		<>
			<AppHeader />
			{state.userLogin.loggedIn && <Redirect to='/' />}
			{state.loading ?
				<AppLoading cssHeight="calc(100vh - 62px)" />
				:
				<>
					<LoginScreen>
						<FormTitle>Login</FormTitle>
						<LoginForm onSubmit={handleSubmit}>
							{state.error && <AppError />}
							<LoginFormInner>
								<div>
									<FormLabel labelHtmlFor="loginUser">User name</FormLabel>
									<FormInput name="loginUser" inputType='text' inputChangeAction={(e) => setLoginUser(e.target.value)} />
								</div>
								<div>
									<FormLabel labelHtmlFor="loginPassword">Password</FormLabel>
									<FormInput inputType='password' name="loginPassword" inputChangeAction={(e) => setLoginPassword(e.target.value)} />
								</div>
								<LoginFormActions>
									<FormButton buttonType="submit" buttonText="Login" />
								</LoginFormActions>
							</LoginFormInner>
						</LoginForm>
					</LoginScreen>
				</>
			}
		</>
	)
}
export default Login;