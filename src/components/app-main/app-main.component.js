import React from 'react';
import AppList from '../app-list/app-list.component';
import AppItemDetail from '../app-item-detail/app-item-detail.component';
import listDataService from '../../services/app-list-data/app-list-data.service';
import { Store } from '../../store/app.store';

const AppMain = () => {
    const { dispatch, state } = React.useContext(Store);
    React.useEffect(() => {
        if(!state.listData.length){
            dispatch({ 
                type: 'FETCH_DATA_REQUEST',
                loading: 'listData'
            });
            listDataService();
        }
    },[]);
    return (
        <>
            <AppList/>
            <AppItemDetail/>
        </>
    )
};

export default AppMain;