import React from 'react';
import { Redirect } from 'react-router-dom';
import AppList from '../app-list/app-list.component';
import AppItemDetail from '../app-item-detail/app-item-detail.component';
import AppError from '../app-error/app-error.component';
import listDataService from '../../services/app-list-data/app-list-data.service';
import { Store } from '../../store/app.store';

const AppMain = () => {
	const { dispatch, state } = React.useContext(Store);
	React.useEffect(() => {
		if (!state.userLogin.loggedIn) {
			console.log("not logged in");
		}
	}, [state.userLogin.loggedIn])
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
							userLogin: {...state.userLogin, loggedIn: true}
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
	const redirectToLogin = !state.userLogin.loggedIn;
	return (
		<>
			{state.error && <AppError/>}
			{redirectToLogin && <Redirect to='/login'/>}
			{state.loading && state.loading === 'listData' ?
				<div>loading</div>
				:
				<>
					<AppList data={state.listData} />
					<AppItemDetail />
				</>
			}
		</>
	)
};

export default AppMain;