import React from 'react';
import styled from 'styled-components';
import AppLoading from '../app-loading/app-loading.component';
import { Store } from '../../store/app.store';
import listItemDataService from '../../services/app-list-item-data/app-list-item-data.service';


const SelectMessage = styled.div`
	display: flex;
	justify-content: space-around;
	flex-direction: column;
	align-content: center;
	text-align: center;
	margin: 1.6rem;
`;

const DetailArticle = styled.article`
	margin: 1.6rem;
	padding: 1rem;
`;

const DetailImage = styled.img`
	width: 100%;
`;

const AppItemDetail = () => {
	const { state, dispatch } = React.useContext(Store);
	React.useEffect(() => {
		if (state.loading === 'listItemData') {
			const selectedItem = state.listData.filter((item) => item.id === state.listItemDetail.id);
			if (selectedItem.localStore) {
				dispatch({
					type: 'FETCH_LIST_ITEM_DATA_SUCCESS',
					payload: selectedItem
				});
			} else {
				async function getListItemData() {
					const listItemData = await listItemDataService(state.listItemDetail.id, state.userLogin.auth);
					if (listItemData.success) {
						dispatch({
							type: 'FETCH_LIST_ITEM_DATA_SUCCESS',
							payload: listItemData.data
						});
					} else {
						dispatch({
							type: 'FETCH_ERROR',
							payload: listItemData.error
						});
					}

				}
				getListItemData();
			}
		}
	}, [state.listItemDetail]);
	const data = state.listItemDetail;
	if (!data.id) {
		return (<SelectMessage>No Details Selected</SelectMessage>)
	}
	return (
		<DetailArticle>
			{state.loading === 'listItemData' ?
				<AppLoading cssHeight="100%"/>
				:
				<>
					<DetailImage src={data.image} />
					<h3>{data.title}</h3>
					<h4>{data.author}</h4>
				</>
			}
		</DetailArticle>
	)
}

export default AppItemDetail;