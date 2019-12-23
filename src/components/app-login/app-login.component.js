import React from 'react';
import { Store } from '../../store/app.store';
import { Redirect } from 'react-router-dom';
import base64 from 'base-64';
import AppError from '../app-error/app-error.component';
import AppLoading from '../app-loading/app-loading.component';
import loginService from '../../services/app-login/app-login.service';
import styled from 'styled-components';

const FormLabel = styled.label`
	display: block;
	font-size: 0.8rem;
	margin: 0.4rem 0;
	color: #666666;
`;
const FormInput = styled.input`
	padding: 0.5rem;
	border: 1px solid #e1e1e1;
	border-radius: 0.2rem;
	box-sizing: border-box;
	width: 100%;
	color: #666;
	font-size: 1.2rem;
`;
const FormButton = styled.button`
	width: 100%;
	padding: 1rem;
	border: none;
	border-radius: 0.1rem;
	box-sizing: border-box;
	text-transform: uppercase;
	background-color: #000000;
	color: #ffffff;
	margin-top: 1rem;
`;
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
const Login = () => {
	const [loginUser, setLoginUser] = React.useState();
	const [loginPassword, setLoginPassword] = React.useState();
	const { state, dispatch } = React.useContext(Store);
	React.useEffect(() => {
		if (state.userLogin.loggedIn) {
			localStorage.setItem('dmiBooklist', JSON.stringify(state));
		}
	}, [ state.userLogin.loggedIn]);
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
			{state.userLogin.loggedIn && <Redirect to='/' />}
			{state.loading ?
				<AppLoading cssHeight="100vh" />
				:
				<LoginScreen>
					<FormTitle>Login</FormTitle>
					<LoginForm onSubmit={handleSubmit}>
						{state.error && <AppError />}
						<LoginFormInner>
							<div>
								<FormLabel htmlFor="loginUser">User name</FormLabel>
								<FormInput name="loginUser" type='text' onChange={(e) => setLoginUser(e.target.value)} />
							</div>
							<div>
								<FormLabel htmlFor="loginPassword">Password</FormLabel>
								<FormInput type='password' name="loginPassword" onChange={(e) => setLoginPassword(e.target.value)} />
							</div>
							<FormButton type="submit">Login</FormButton>
						</LoginFormInner>
					</LoginForm>
				</LoginScreen>
			}
		</>
	)
}
export default Login;