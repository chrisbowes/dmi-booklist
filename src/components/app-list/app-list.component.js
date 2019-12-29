import React from 'react';
import styled from 'styled-components';
import AppListItem from '../app-list-item/app-list-item.component';
import { Store } from '../../store/app.store';
const ListWrapper = styled.div`
	flex: 1 0 0;
	padding: 1.6rem;
`;
const List = styled.ul`   
  margin: 0;
	padding: 0;
  list-style-type: none;
`;
const ListHeader = styled.h2`
	font-weight: 200;
	padding: 0;
	margin: 0 0 1rem 0;
`;
const AppList = (props) => {
	const { state, dispatch } = React.useContext(Store);
	const data = props.mobileView ? state.listData : state.listData.filter((item, index) => index >= state.listDataRange.from && index < state.listDataRange.to);
	const pageBack = () => dispatch({ type: 'SET_LIST_RANGE', payload: { from: state.listDataRange.from - 5, to: state.listDataRange.to - 5 } });
	const pageForward = () => dispatch({ type: 'SET_LIST_RANGE', payload: { from: state.listDataRange.from + 5, to: state.listDataRange.to + 5 } });
	return (
		<ListWrapper>
			<ListHeader>Product List</ListHeader>
			<List>
				{data && data.map((item, index) => {
					return <AppListItem key={index} data={item} />
				})}
			</List>
			{!props.mobileView &&
				<div>
					<button onClick={pageBack}>&laquo;</button>
					<button onClick={pageForward}>&raquo;</button>
				</div>
			}
		</ListWrapper>
	)
}

export default AppList;