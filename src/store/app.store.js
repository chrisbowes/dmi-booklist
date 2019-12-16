import React from 'react'

export const Store = React.createContext();

const initialState = {
    listData: [],
    listItemDetail: null,
    userLogin: {},
    loading: null,
    error: null
};

function reducer(state, action) {
  switch (action.type) {
    case 'FETCH_ERROR':
        return { ...state, error: action.payload}
    case 'FETCH_DATA_REQUEST':
      return { ...state, loading: action.payload};
    case 'FETCH_LIST_DATA_SUCCESS':
      return {...state, listData: action.payload, loading: null};
    case 'FETCH_LIST_ITEM_DETAIL_SUCCESS':
            return {...state, listItemDetail: action.payload, loading: null};
    case 'LOGIN_REQUEST':
        return {...state, loading: action.payload}
    case 'LOGIN_SUCCESS':
        return {...state, userLogin: action.payload}
    case 'LOGIN_FAIL':
        return {...state, error: action.payload}
    default:
      throw new Error();
  }
}

export function StoreProvider(props) {
    const [state, dispatch] = React.useReducer(reducer, initialState);
    const value = { state, dispatch };
    return <Store.Provider value={value}>{props.children}</Store.Provider>
}