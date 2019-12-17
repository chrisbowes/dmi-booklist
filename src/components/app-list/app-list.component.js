import React from 'react';
import styled from 'styled-components';
import AppListItem from '../app-list-item/app-list-item.component';
const AppList = (props) => {
    return (
        <ul>
            { props.data && props.data.map((item, index) => {
                return <AppListItem key={index} data={item}/>
            })}            
        </ul>
    )
}

export default AppList;