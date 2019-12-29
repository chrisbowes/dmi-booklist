import React from 'react';
import { Redirect } from 'react-router-dom';
import AppList from '../app-list/app-list.component';
import AppItemDetail from '../app-item-detail/app-item-detail.component';
import AppError from '../app-error/app-error.component';
import AppListAdd from '../app-list-add/app-list-add.component';
import AppLoading from '../app-loading/app-loading.component';
import AppHeader from '../app-header/app-header.component';
import listDataService from '../../services/app-list-data/app-list-data.service';
import styled from 'styled-components';
import { Store } from '../../store/app.store';

const AppLayout = styled.div`
	display: flex;
	justify-content: space-evenly;
	margin: 0 auto;
	max-width: 1200px;
`;

const AppMain = () => {
	const { dispatch, state } = React.useContext(Store);
	React.useEffect(() => {
		if (!state.listData.length && state.userLogin.loggedIn) {
			dispatch({
				type: 'FETCH_LIST_DATA_REQUEST',
				payload: 'listData'
			});
			async function getListData() {
				const listData = await listDataService(state.userLogin.auth);
				if (listData.success) {
					dispatch({
						type: 'FETCH_LIST_DATA_SUCCESS',
						payload: {
							listData: listData.data,
							loading: null,
							userLogin: { ...state.userLogin, loggedIn: true }
						}
					});
				} else {
					dispatch({
						type: 'FETCH_ERROR',
						payload: listData.error
					});
				}
			}
			getListData();

		}
	}, [dispatch, state.listData.length]);
	React.useEffect(() => {
		localStorage.setItem('dmiBooklist', JSON.stringify(state));
	}, [state.listData]);
	const redirectToLogin = !state.userLogin.loggedIn;
	return (
		<>
			<AppHeader />
			{state.showAddForm && <AppListAdd />}
			{state.error && <AppError />}
			{redirectToLogin && <Redirect to='/login' />}
			{state.loading && state.loading === 'listData' ?
				<AppLoading cssHeight="100vh" />
				:
				<AppLayout>
					<AppList data={state.listData} />
					<AppItemDetail />
				</AppLayout>
			}
		</>
	)
};

export default AppMain;