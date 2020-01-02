import React from 'react'

export const Store = React.createContext();

const emptyState = {
  listData: [],
  listDataRange: {
    from: 0,
    to: 5
  },
  listItemDetail: {
    id: null,
    data: null
  },
  userLogin: {
    loggedIn: false,
    userName: null,
    auth: null
  },
  loading: null,
  error: null,
  showAddForm: false
};

const localStoreState = JSON.parse(localStorage.getItem('dmiBooklist'));

const initialState = localStorage.getItem('dmiBooklist') ? localStoreState : emptyState;

function reducer(state, action) {
  switch (action.type) {
    case 'UPDATE_FROM_LOCALSTORE':
      return { ...action.payload }
    case 'FETCH_ERROR':
      return { ...state, error: action.payload, loading: null }
    case 'FETCH_LIST_DATA_REQUEST':
      return { ...state, loading: 'listData' };
    case 'FETCH_LIST_DATA_SUCCESS':
      return { ...state, ...action.payload };
    case 'FETCH_LIST_ITEM_DATA_REQUEST':
      return { ...state, listItemDetail: action.payload, loading: 'listItemData', error: null };
    case 'FETCH_LIST_ITEM_DATA_SUCCESS':
      return { ...state, listItemDetail: action.payload, loading: null };
    case 'LOGIN_REQUEST':
      return { ...state, ...action.payload }
    case 'LOGIN_SUCCESS':
      return { ...state, ...action.payload }
    case 'LOGIN_FAIL':
      return { ...state, error: action.payload }
    case 'LOGOUT':
      return { ...emptyState, userLogin: { loggedIn: false, userName: null, auth: null }}
    case 'ADD_NEW_BOOK':
      return { ...state, ...action.payload, showAddForm: false}
    case 'SHOW_ADD_FORM':
      return { ...state, showAddForm: true}
    case 'HIDE_ADD_FORM':
      return { ...state, showAddForm: false }
    case 'CLEAR_DETAILS':
      return { ...state, listItemDetail: { id: null, data: null }}
    case 'SET_LIST_RANGE': 
      return { ...state, listDataRange: action.payload }
    default:
      throw new Error();
  }
}

export function StoreProvider(props) {
  const [state, dispatch] = React.useReducer(reducer, initialState);
  const value = { state, dispatch };
  return <Store.Provider value={value}>{props.children}</Store.Provider>
}