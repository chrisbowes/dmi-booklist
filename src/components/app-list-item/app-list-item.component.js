import React from 'react';
import styled from 'styled-components';
import { Store } from '../../store/app.store';

const AppListItem = (props) => {
    const { state, dispatch } = React.useContext(Store);
    const loadDetail = () => {
        dispatch({
            type: 'FETCH_LIST_ITEM_DATA_REQUEST',
            payload: {
                id: props.data.id,
                data: null
            }
        });
    }
    return (
        <li onClick={loadDetail}>
            <div>{props.data.title}</div>
            <div>{props.data.price}</div>
        </li>
    )
}

export default AppListItem;