import React from 'react';
import styled from 'styled-components';
import { Store } from '../../store/app.store';
import listItemDataService from '../../services/app-list-item-data/app-list-item-data.service';

const AppItemDetail = () => {
	const { state, dispatch } = React.useContext(Store);
	React.useEffect(() => {
		console.log('detail effect');
		if (!state.listItemDetail.data && state.listItemDetail.id) {
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
	const data = state.listItemDetail.data;
	return (
		<article>
			{data ?
				<>
					<img src={data.image}/>
					<h3>{data.title}</h3>
					<h4>{data.author}</h4>
				</>
				:
				<div>No details selected</div>
			}

		</article>
	)
}

export default AppItemDetail;