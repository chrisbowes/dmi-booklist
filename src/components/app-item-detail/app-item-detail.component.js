import React from 'react';
import styled from 'styled-components';
import AppLoading from '../app-loading/app-loading.component';
import AppFormattedPrice from '../app-formatted-price/app-formatted-price.component';
import { Store } from '../../store/app.store';
import listItemDataService from '../../services/app-list-item-data/app-list-item-data.service';


const SelectMessage = styled.div`
	display: flex;
	justify-content: space-around;
	flex-direction: column;
	align-content: center;
	text-align: center;
	margin: 1.6rem;
	flex: 2;
	border: 1px solid #e1e1e1;
`;

const DetailArticle = styled.article`
	margin: 1.6rem;
	flex: 2;
`;

const DetailTitleRow = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
`;

const DetailTitle = styled.h3`
	color: #333;
	font-weight: 300;
`;

const DetailAuthor = styled.h4`
	margin: 0;
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
				<AppLoading cssHeight="100%" />
				:
				<>
					<DetailImage src={data.image} />
					<DetailTitleRow>
						<DetailTitle>{data.title}</DetailTitle>
						<AppFormattedPrice value={data.price} />
					</DetailTitleRow>
					<DetailAuthor>{data.author}</DetailAuthor>
				</>
			}
		</DetailArticle>
	)
}

export default AppItemDetail;