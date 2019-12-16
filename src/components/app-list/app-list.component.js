import React from 'react';
import styled from 'styled-components';
import AppListItem from '../app-list-item/app-list-item.component';
import { Store } from '../../store/app.store';
const AppList = () => {

    return (
        <ul>
            <AppListItem/>
        </ul>
    )
}

export default AppList;