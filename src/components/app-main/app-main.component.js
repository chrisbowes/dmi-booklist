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
                type: 'FETCH_LIST_DATA_REQUEST',
                payload: 'listData'
            });           
        }
        async function getListData(){
            const listData = await listDataService(state.userLogin.auth);
            if (listData.success){
                dispatch({ 
                    type: 'FETCH_LIST_DATA_SUCCESS',
                    payload: listData.data
                });
            } else {
                dispatch({ 
                    type: 'FETCH_ERROR',
                    payload: listData.error
                });
            }
            
        }
        getListData();
    },[dispatch, state.listData.length]);
    return (
        <>  
        { state.loading && state.loading === 'listData' ?
            <div>loading</div>
            :
            <>
                <AppList data={state.listData} />
                <AppItemDetail/>
            </>
        }           
        </>
    )
};

export default AppMain;