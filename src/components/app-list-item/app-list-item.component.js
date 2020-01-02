import React from 'react';
import styled from 'styled-components';
import { Store } from '../../store/app.store';
import AppFormattedPrice from '../app-formatted-price/app-formatted-price.component';

const ListLi = styled.li`
    color: #666;
    border-bottom: 1px solid #e1e1e1;
    padding: 0.4rem 0.2rem;
		cursor: pointer;
    div {
			line-height: 1.5;
    }
    :hover {
			background-color: #f1f1f1;
    }
`;

const AppListItem = (props) => {
	const { dispatch } = React.useContext(Store);
	const loadDetail = () => {
		if (props.data.id) {
			dispatch({
				type: 'FETCH_LIST_ITEM_DATA_REQUEST',
				payload: {
					id: props.data.id,
				}
			});
		} else {
			dispatch({
				type: 'FETCH_LIST_ITEM_DATA_SUCCESS',
				payload: props.data
			})
		}

	}
	return (
		<ListLi onClick={loadDetail}>
			<div>{props.data.title}</div>
			<div>
				<AppFormattedPrice value={props.data.price}/>
			</div>
		</ListLi>
	)
}

export default AppListItem;