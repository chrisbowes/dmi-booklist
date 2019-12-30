import React from 'react';
import { Store } from '../../store/app.store';
import config from '../../config/app.config';
import { FormButton } from '../app-forms-ui';
import styled from 'styled-components';

const ListPagingWrapper = styled.div`
	display: flex;
	justify-content: space-between;
	margin: 1rem 0;
`;

const AppListPaging = () => {
  const { state, dispatch } = React.useContext(Store);
  const pageBack = () => dispatch({ type: 'SET_LIST_RANGE', payload: { from: state.listDataRange.from - config.PAGING_RANGE, to: state.listDataRange.to - config.PAGING_RANGE } });
	const pageForward = () => dispatch({ type: 'SET_LIST_RANGE', payload: { from: state.listDataRange.from + config.PAGING_RANGE, to: state.listDataRange.to + config.PAGING_RANGE } });
  const disableBack = state.listDataRange.from === 0;
  const disableForward = state.listData.length <= state.listDataRange.to;
  return (
    <ListPagingWrapper>
      <FormButton buttonClickAction={pageBack} buttonDisabled={disableBack} mode="slim" tone="light" inline={true}>&laquo;</FormButton>
      <FormButton buttonClickAction={pageForward} buttonDisabled={disableForward} mode="slim" tone="light" inline={true}>&raquo;</FormButton>
    </ListPagingWrapper>
  )
}

export default AppListPaging;