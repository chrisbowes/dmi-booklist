import React from 'react';
import { FormButton } from '../app-forms-ui';
import styled from 'styled-components';
import { Store } from '../../store/app.store';

const AppHeaderDiv = styled.div`
	background-color: #000000;
`;

const AppHeaderInnerDiv = styled.div`
	padding: 1rem 1.6rem;
	box-sizing: border-box;
	display: flex;
	justify-content: space-between;
	align-items: center;
`;

const AppTitle = styled.h1`
	color: #fff;
	text-transform: uppercase;
	margin: 0;
	padding: 0.3rem 0.5rem;
	font-size: 1rem;
  border: 1px solid #e1e1e1;
`;

const BoldTitle = styled.span`
	font-weight: bold;
`;

const AppHeaderActions = styled.div`
	display: flex;
	* {
		flex: 1 1 0;
		white-space: nowrap;
		&:first-child {
			margin-right: 0.5rem;
		}
		&:last-child {
			margin-left: 0.5rem;
		}
	}
`;

const AppHeader = () => {
	const { state, dispatch } = React.useContext(Store);
	const showAddForm = () => dispatch({ type: 'SHOW_ADD_FORM' });
	const logout = () => {
		localStorage.removeItem('dmiBooklist');
		dispatch({ type: 'LOGOUT' })
	}
	const showActions = state.userLogin.loggedIn && state.listData.length;
	return (
		<AppHeaderDiv>
			<AppHeaderInnerDiv>
				<AppTitle>
					<BoldTitle>DMI</BoldTitle>&nbsp;Booklist
      	</AppTitle>
				{showActions &&
					<AppHeaderActions>
						<FormButton buttonClickAction={showAddForm} buttonText="Add New Book" buttonType="button" mode="slim" />
						<FormButton buttonClickAction={logout} buttonText="Logout" buttonType="button" mode="slim" />
					</AppHeaderActions>
				}
			</AppHeaderInnerDiv>
		</AppHeaderDiv>
	)
}

export default AppHeader;