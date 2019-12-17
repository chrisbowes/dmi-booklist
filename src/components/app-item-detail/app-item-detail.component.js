import React from 'react';
import styled from 'styled-components';
import { Store } from '../../store/app.store';
import listItemDataService from '../../services/app-list-item-data/app-list-item-data.service';

const AppItemDetail = () => {
	const { state, dispatch } = React.useContext(Store);
	React.useEffect(() => {
		if (state.loading === 'listItemData' && state.listItemDetail.id) {
			async function getListItemData() {
				const listItemData = await listItemDataService(state.listItemDetail.id);
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
	}, [ state.listItemDetail ]);
	const data = state.listItemDetail;
	if (state.loading === 'listItemData'){
		return (<div>loading</div>)
	} else if (!data.id) {
		return (<div>No Details Selected</div>)
	}
	return (
		<article>
			<img src={data.image}/>
			<h3>{data.title}</h3>
			<h4>{data.author}</h4>
		</article>
	)
}

export default AppItemDetail;