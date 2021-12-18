import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { Provider } from 'react-redux'
import { configureStore, createSlice, nanoid, createAsyncThunk } from "@reduxjs/toolkit";

export const bugAdded = description => ({
  type: 'bugAdded',
  payload: {
      description
  }
})

export const bugRemoved = id => ({
  type: 'bugRemoved',
  payload: {
      id
  }
})

export const bugResolved = id => ({
  type: 'bugResolved',
  payload: {
      id
  }
})

export const fetchApi = data => ({
  type: 'fetchApi',
  payload: {
      data
  }
})

let lastId = 0

function bugReducer(state = [], action){
  switch(action.type){
      case 'bugAdded':
          return [
              ...state,
              {
                  id: ++lastId,
                  description: action.payload.description,
                  resolved: false
              }
          ];
      case 'bugRemoved':
          return state.filter(bug => bug.id !== action.payload.id);
      case 'bugResolved':
          //update the bug with the id with updated resolved to true
          return state.map(bug => bug.id === action.payload.id ? {...bug, resolved: true} : bug);
      default:
          return state;
  }
}

function getApiPost(state = {}, action) {
  if (action.type === 'fetchApi') {
    return {
      ...state,
      data: action.payload.data
    }  
  }
  return state
}

const store = configureStore(
  {
    reducer: {
      bugs: bugReducer,
      posts: getApiPost
    },
  }
);


function MyApp({ Component, pageProps }: AppProps) {

  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  )
}

export default MyApp
