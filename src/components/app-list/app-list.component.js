import React from 'react';
import styled from 'styled-components';
import AppListItem from '../app-list-item/app-list-item.component';
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
	return (
		<ListWrapper>
			<ListHeader>Product List</ListHeader>
			<List>
				{props.data && props.data.map((item, index) => {
					return <AppListItem key={index} data={item} />
				})}
			</List>
		</ListWrapper>
	)
}

export default AppList;