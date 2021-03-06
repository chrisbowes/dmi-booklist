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
	@media screen and (max-width:600px){
		height: calc(100vh - 62px);
		overflow: scroll;
	}
`;

const AppMain = () => {
	const { dispatch, state } = React.useContext(Store);
	const [ mobileView, setMobileView ] = React.useState();

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
	}, [dispatch, state.listData.length, state.userLogin]);

	React.useEffect(() => {
		localStorage.setItem('dmiBooklist', JSON.stringify(state));
	}, [state]);

	React.useLayoutEffect(() => {
    function updateSize() {
			const matchMobileScreen = window.matchMedia('(max-width: 600px)').matches;
      setMobileView(matchMobileScreen);
    }
    window.addEventListener('resize', updateSize);
    updateSize();
	}, []);
	
	const redirectToLogin = !state.userLogin.loggedIn;
	const showDetailPanel = !mobileView || (mobileView && state.listItemDetail.id);
	const showListPanel = !mobileView || (mobileView && !state.listItemDetail.id);
	return (
		<>
			<AppHeader />
			{state.showAddForm && <AppListAdd />}
			{state.error && <AppError />}
			{redirectToLogin && <Redirect to='/login' />}
			{state.loading && state.loading === 'listData' ?
				<AppLoading cssHeight="calc(100vh - 62px)" />
				:
				<AppLayout>
					{ showListPanel && <AppList mobileView={mobileView} />}
					{ showDetailPanel && <AppItemDetail mobileView={mobileView} /> }
				</AppLayout>
			}
		</>
	)
};

export default AppMain;